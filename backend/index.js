const cors = require("cors");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const FormDataModel = require("./models/FormData");
const ClothingItemModel = require("./models/ClothingItem");
const OutfitModel = require("./models/Outfit");
const CustomOutfit = require("./models/CustomOutfit");
const moment = require('moment');

const multer = require("multer");

const app = express();
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

mongoose.connect("mongodb://127.0.0.1:27017/MyDressingOrganizer", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/register", (req, res) => {
  // To post / insert data into database

  const { email, password } = req.body;
  FormDataModel.findOne({ email: email }).then((user) => {
    if (user) {
      res.json("Already registered");
    } else {
      FormDataModel.create(req.body)
        .then((log_reg_form) => res.json(log_reg_form))
        .catch((err) => res.json(err));
    }
  });
});

app.post("/login", (req, res) => {
  // To find record from the database
  const { email, password } = req.body;
  FormDataModel.findOne({ email: email }).then((user) => {
    if (user) {
      // If user found then these 2 cases
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Wrong password");
      }
    }
    // If user not found then
    else {
      res.json("No records found! ");
    }
  });
});

app.post("/wardrobe/add", upload.single("image"), (req, res) => {
  const { type, color, category } = req.body;
  // Get only the filename, not the full path
  const imageUrl = req.file ? req.file.filename : null;

  ClothingItemModel.create({ type, color, category, imageUrl })
    .then((item) => {
      console.log("Item Saved to DB");
      res.json(item);
    })
    .catch((err) => {
      console.error("Error Saving to DB:", err);
      res.status(500).json(err);
    });
});


// DELETE request to remove a clothing item by type (name) and color
app.delete("/wardrobe/delete", (req, res) => {
  const { type, color } = req.body; // Retrieve the item name and color from the request body

  // Find the item by type and color
  ClothingItemModel.findOneAndDelete({ type, color })
    .then((deletedItem) => {
      if (deletedItem) {
        res.json({ message: "Item deleted successfully" });
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    })
    .catch((err) => {
      console.error("Error deleting item:", err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

app.patch("/wardrobe/update", (req, res) => {
  const { type, color, lastWorn } = req.body;

  // Find the item by type and color, then update its lastWorn time
  ClothingItemModel.findOneAndUpdate(
    { type, color }, // Find item by type and color
    { lastWorn: new Date(lastWorn) }, // Update the lastWorn date
    { new: true } // Return the updated item
  )
    .then((updatedItem) => {
      if (updatedItem) {
        res.json({ message: "Item updated successfully", updatedItem });
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    })
    .catch((err) => {
      console.error("Error updating item:", err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.get("/api/wardrobe", async (req, res) => {
  try {
    const { type, color, lastWorn } = req.query;
    let query = {};

    if (type) query.type = type;
    if (color) query.color = color;
    if (lastWorn) query.lastWorn = { $gte: new Date(lastWorn) };

    const items = await ClothingItemModel.find(query);
    res.json(items);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error fetching wardrobe items" });
  }
});


// Route to fetch outfit suggestions and save them to the database
app.get("/api/outfit-suggestions", async (req, res) => {
  try {
    // Get all clothing items
    const clothingItems = await ClothingItemModel.find();

    // Generate outfit combinations with a limit of 20
    const outfits = generateOutfitCombinations(clothingItems).slice(0, 20);

    let count = 1;
    for (const outfit of outfits) {
      // Check if the outfit already exists in the database by comparing the exact outfit fields
      const existingOutfit = await OutfitModel.findOne({
        "shirts.color": outfit.shirt.color,
        "shirts.type": outfit.shirt.type,
        "pants.color": outfit.pants.color,
        "pants.type": outfit.pants.type,
        "blazers.color": outfit.blazer.color,
        "blazers.type": outfit.blazer.type,
      });

      // If the outfit doesn't exist, save it to the database
      if (!existingOutfit) {
        const newOutfit = new OutfitModel({
          outfitNumber: `Outfit ${count}`,
          shirts: outfit.shirt,
          pants: outfit.pants,
          blazers: outfit.blazer,
        });
        await newOutfit.save();
        count++;
      }
    }

    res.json(outfits);
  } catch (error) {
    console.error("Error fetching or saving outfit suggestions:", error);
    res
      .status(500)
      .json({ message: "Error fetching or saving outfit suggestions" });
  }
});

// Function to generate unique outfit combinations with color matching
function generateOutfitCombinations(items) {
  const outfits = [];

  // Filter items by type
  const shirts = items.filter((item) => item.type === "shirts");
  const pants = items.filter((item) => item.type === "pants");
  const blazers = items.filter((item) => item.type === "blazers");

  // Predefined color matching scheme (can be adjusted)
  const colorMatchingScheme = {
    black: ["black", "white", "gray"],
    white: ["black", "white", "gray"],
    gray: ["black", "white", "gray"],
  };

  // Generate outfit combinations based on color matching
  shirts.forEach((shirt) => {
    pants.forEach((pant) => {
      blazers.forEach((blazer) => {
        if (
          pant.color === blazer.color &&
          colorMatchingScheme[pant.color]?.includes(shirt.color)
        ) {
          outfits.push({ shirt, pants: pant, blazer });
        }
      });
    });
  });

  return outfits;
}

// Delete a custom outfit
app.delete("/api/outfits/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOutfit = await CustomOutfit.findByIdAndDelete(id);

    if (deletedOutfit) {
      res.json({ message: "Outfit deleted successfully" });
    } else {
      res.status(404).json({ message: "Outfit not found" });
    }
  } catch (error) {
    console.error("Error deleting outfit:", error);
    res.status(500).json({ message: "Error deleting outfit" });
  }
});

// Get all outfits
app.get("/api/outfits", async (req, res) => {
  try {
    const outfits = await CustomOutfit.find();
    res.json(outfits);
  } catch (error) {
    console.error("Error fetching outfits:", error);
    res.status(500).json({ message: "Error fetching outfits" });
  }
});

// Add a new outfit
app.post("/api/outfits", async (req, res) => {
  try {
    const { shirts, pants, blazers } = req.body;

    // Find if the outfit with the same shirt, pants, and blazer colors already exists
    const existingOutfit = await CustomOutfit.findOne({
      shirts,
      pants,
      blazers,
    });

    if (existingOutfit) {
      return res.status(400).json({ message: "Outfit already exists" });
    }

    // Find the current highest outfit number
    const lastOutfit = await CustomOutfit.findOne().sort({ outfitNumber: -1 });
    const nextOutfitNumber = lastOutfit ? lastOutfit.outfitNumber + 1 : 1;

    // Default rating to null when not provided
    const newOutfit = new CustomOutfit({
      outfitNumber: nextOutfitNumber,
      shirts,
      pants,
      blazers,
      favorite: false,
      rating: null, // Make sure rating is not set to 0 by default
    });

    await newOutfit.save();
    res.status(201).json(newOutfit);
  } catch (error) {
    console.error("Error saving outfit:", error);
    res.status(500).json({ message: "Error saving outfit" });
  }
});

// Endpoint to update the rating and feedback for a specific outfit
app.put("/api/outfits/:id/rating", async (req, res) => {
  try {
    const { rating, feedback } = req.body;
    const outfitId = req.params.id;

    // Validate the rating
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    // Find the outfit by ID and update its rating and feedback
    const updatedOutfit = await CustomOutfit.findByIdAndUpdate(
      outfitId,
      { rating, feedback },
      { new: true }
    );

    if (!updatedOutfit) {
      return res.status(404).json({ message: "Outfit not found" });
    }

    res.status(200).json(updatedOutfit);
  } catch (error) {
    console.error("Error updating outfit rating:", error);
    res.status(500).json({ message: "Error updating outfit rating" });
  }
});

// Toggle favorite status for a custom outfit
app.put("/api/outfits/:id/favorite", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the outfit by ID and toggle its favorite status
    const updatedOutfit = await CustomOutfit.findByIdAndUpdate(
      id,
      { $set: { favorite: true } },  // Toggle the favorite status to true
      { new: true }
    );

    if (!updatedOutfit) {
      return res.status(404).json({ message: "Outfit not found" });
    }

    res.status(200).json(updatedOutfit);
  } catch (error) {
    console.error("Error updating favorite status:", error);
    res.status(500).json({ message: "Error updating favorite status" });
  }
});

app.get("/api/unused-clothing-alerts", async (req, res) => {
  try {
    // Logic to get alerts for unused clothing (you can adjust this based on your database structure)
    const alerts = await ClothingItemModel.find({ /* Your logic here */ });

    const alertMessages = alerts.map((item) => {
      // Check if lastWorn is a valid date
      const daysSinceLastWorn = moment().diff(item.lastWorn, "days");

      // If lastWorn is NaN (invalid date), display a different message
      if ((daysSinceLastWorn)>10) {
        return `Reminder: Your ${item.color} ${item.type} hasn't been worn.`;
      } else {
        return `Reminder: Your ${item.color} ${item.type} hasn't been worn for ${daysSinceLastWorn} days!`;
      }
    });

    res.json(alertMessages);
  } catch (error) {
    console.error("Error fetching unused clothing alerts:", error);
    res.status(500).json({ message: "Error fetching unused clothing alerts" });
  }
});


app.get("/api/event-based-suggestions", async (req, res) => {
  const { eventType } = req.query; // Get event type from query parameters

  try {
    // Define event-specific query
    let query = {};
    switch (eventType) {
      case "party":
        query = { category: "formal"} || {category: "semi-formal" };
        break;
      case "wedding":
        query = { category: "formal" };
        break;
      case "casual":
        query = { category: "casual" };
        break;
      default:
        return res.status(400).json({ error: "Invalid event type" });
    }

    // Fetch clothing items by query
    const clothingItems = await ClothingItemModel.find(query);

    // Separate items by type
    const pants = clothingItems.filter(item => item.type === "pants");
    const blazers = clothingItems.filter(item => item.type === "blazers");
    const shirts = clothingItems.filter(item => item.type === "shirts");

    // Group pants and blazers by matching color
    const colorMatchedOutfits = [];
    pants.forEach(pant => {
      blazers.forEach(blazer => {
        if (pant.color === blazer.color) {
          shirts.forEach(shirt => {
            colorMatchedOutfits.push({
              outfit: {
                pants: pant,
                blazer: blazer,
                shirt: shirt,
              },
            });
          });
        }
      });
    });

    // Respond with the generated outfits
    if (colorMatchedOutfits.length === 0) {
      res.json({ message: "No matching outfits available for this event." });
    } else {
      res.json(colorMatchedOutfits);
    }
  } catch (error) {
    console.error("Error fetching event-based outfit suggestions:", error);
    res.status(500).json({ error: "Server error" });
  }
});



const dailyTrends = [
  { id: 1, trend: "Wear pastel colors for a fresh look." },
  {
    id: 2,
    trend: "Try layering your outfits for a stylish winter appearance.",
  },
  { id: 3, trend: "Blazers are perfect for casual and formal settings." },
  {
    id: 4,
    trend: "Bold prints are in this season—don't be afraid to experiment.",
  },
  {
    id: 5,
    trend: "Denim on denim: the perfect combination of casual and cool.",
  },
  {
    id: 6,
    trend: "Sustainable fashion is trending—opt for eco-friendly materials.",
  },
  { id: 7, trend: "Monochrome outfits create a clean, polished look." },
  { id: 8, trend: "Athleisure continues to dominate both comfort and style." },
  {
    id: 9,
    trend:
      "Streetwear is evolving—incorporate oversized pieces into your wardrobe.",
  },
  {
    id: 10,
    trend: "Floral prints for the warmer months add a light, fresh vibe.",
  },
];

// Route to fetch daily dressing trends
app.get("/api/daily-trends", (req, res) => {
  res.json(dailyTrends); // Send the trends data as JSON
});

const seasonalRecommendations = {
  summer: {
    male: {
      casual: [
        "Light cotton shirts and khakis for a breezy look.",
        "Pastel t-shirts with denim shorts are perfect for casual outings.",
        "Pair your sandals with shorts and a tank top for beach vibes.",
      ],
      formal: [
        "Linen suits for formal wear—lightweight and breathable.",
        "Opt for breathable sneakers for all-day comfort.",
        "Maxi dresses and flowy skirts for a chic, comfortable look.",
      ],
      party: [
        "Bright t-shirts with denim shorts and sneakers for a casual party.",
        "Sunglasses and wide-brimmed hats for outdoor events.",
        "Stylish short-sleeve shirts for evening beach parties.",
      ],
    },
    female: {
      casual: [
        "Floral summer dresses for a light and fresh look.",
        "Tank tops with denim shorts for casual beach outings.",
        "Bright colors like yellow, coral, and pink to embrace the sunshine.",
      ],
      formal: [
        "Light, breathable cotton dresses for comfort and style.",
        "Pair skirts with simple blouses for a versatile summer look.",
        "Romantic, airy fabrics like chiffon are perfect for the season.",
      ],
      party: [
        "Tank tops paired with trendy skirts for a chic party look.",
        "Bohemian dresses perfect for summer evening parties.",
        "Colorful sandals and accessories for a fun, stylish vibe.",
      ],
    },
  },
  winter: {
    male: {
      casual: [
        "Wool coats and scarves for ultimate warmth and style.",
        "Boots and thermal wear for cold weather—stay cozy and stylish.",
        "Chunky knit scarves and hats are both practical and fashionable.",
      ],
      formal: [
        "Puffer jackets are not just warm, but also trendy.",
        "Tailored coats over a hoodie provide a mix of style and comfort.",
        "Cashmere sweaters for extra comfort and luxury.",
      ],
      party: [
        "Dark, earthy tones such as browns, greens, and blacks are great for winter parties.",
        "Plaid shirts under a thick winter coat for a stylish look.",
        "Chunky knit scarves and hats to keep you warm while partying.",
      ],
    },
    female: {
      casual: [
        "Wool coats with fur collars for a chic and cozy winter look.",
        "Knee-high boots for ultimate warmth and style during the cold months.",
        "Chunky knitted sweaters paired with leggings for a casual yet stylish outfit.",
      ],
      formal: [
        "Layering turtlenecks under dresses for warmth and style.",
        "Tailored woolen coats and dresses for formal events.",
        "Thermal leggings under skirts or dresses for comfort and style.",
      ],
      party: [
        "Bold winter prints such as plaid, houndstooth, and checks.",
        "Layered sweaters with skirts for an elegant party look.",
        "Stylish cocktail dresses paired with a winter coat.",
      ],
    },
  },
};

// Endpoint to get seasonal recommendations based on selected season and gender
app.get("/api/seasonal-recommendations", (req, res) => {
  const season = req.query.season;
  const gender = req.query.gender;

  if (
    season &&
    gender &&
    seasonalRecommendations[season] &&
    seasonalRecommendations[season][gender]
  ) {
    res.json({ recommendations: seasonalRecommendations[season][gender] });
  } else {
    res.status(400).json({
      error: "Invalid input. Please select a valid season and gender.",
    });
  }
});

app.listen(3001, () => {
  console.log("Server listining on http://127.0.0.1:3001");
});
