export default function Footer() {
  return (
    <div
      className="d-none d-md-block" // Hide on small screens, show on medium and larger screens
      style={{
        padding: "20px",
        backgroundColor: "rgb(232, 227, 227)",
        textAlign: "center",
        width: "100%",
        height: "auto",
        position: "relative",
        zIndex: "999",
      }}
    >
      <div className="text-center">
        <h5>My Dressing Organizer</h5>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          Your go-to wardrobe management solution
        </p>
        <div style={{ marginTop: "10px", fontSize: "14px" }}>
          <p>
            Email:{" "}
            <a
              href="mailto:support@dressingorganizer.com"
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              support@dressingorganizer.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a
              href="tel:+1234567890"
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              +1 234 567 890
            </a>
          </p>
          <p>Address: Fast Islamabad, Pakistan</p>
        </div>
      </div>
    </div>
  );
}
