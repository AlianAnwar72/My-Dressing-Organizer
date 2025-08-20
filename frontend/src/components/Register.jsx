import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from "./Header.jsx";

const Register = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('http://localhost:3001/register', { name, email, password })
            .then(result => {
                if (result.data === "Already registered") {
                    setAlertMessage("E-mail already registered! Please Login to proceed.");
                } else {
                    setAlertMessage("Registered successfully! Please Login to proceed.");
                }
                setShowAlert(true);
            })
            .catch(err => console.log(err));
    };

    const handleAlertClose = () => {
        setShowAlert(false);
        if (alertMessage.includes("successfully")) {
            navigate('/login');
        } else if (alertMessage.includes("already registered")) {
            navigate('/login');
        }
    };

    return (
        <div>
            <Header />
            <div 
                className="d-flex justify-content-center align-items-center text-center vh-100" 
                style={{
                    backgroundImage: `
                    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                    url('/assets/your-image-placeholder-1.jpg')`, 
                    backgroundSize: "cover", 
                    backgroundPosition: "center", 
                    marginTop: "60px"
                }}
            >
                <div 
                    className="bg-white p-3 rounded" 
                    style={{
                        width: "40%", 
                        backgroundColor: "rgba(255, 255, 255, 0.4)", 
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
                    }}
                >
                    <h2 className='mb-3 text-primary'>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputname" className="form-label">
                                <strong>Name</strong>
                            </label>
                            <input 
                                type="text"
                                placeholder="Enter Name"
                                className="form-control" 
                                id="exampleInputname" 
                                onChange={(event) => setName(event.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong>Email Id</strong>
                            </label>
                            <input 
                                type="email" 
                                placeholder="Enter Email"
                                className="form-control" 
                                id="exampleInputEmail1" 
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                <strong>Password</strong>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Enter Password"
                                className="form-control" 
                                id="exampleInputPassword1" 
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>

                    <p className='container my-2'>Already have an account?</p>
                    <Link to='/login' className="btn btn-secondary">Login</Link>
                </div>
            </div>

            {/* Custom Alert Modal */}
            {showAlert && (
                <div 
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" 
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)", 
                        zIndex: 1050
                    }}
                >
                    <div 
                        className="bg-white p-4 rounded text-center"
                        style={{ minWidth: "300px" }}
                    >
                        <h5>{alertMessage}</h5>
                        <button 
                            className="btn btn-primary mt-3" 
                            onClick={handleAlertClose}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;
