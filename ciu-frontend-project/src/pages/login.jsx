import React, { useState } from "react";
import axios from "axios"; // Import axios
import "./login.css";
import { BiSolidUserRectangle } from "react-icons/bi";
import { FaLock, FaUser } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("Select User");
  const [identifier, setIdentifier] = useState(""); // Changed from email to identifier
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [successMessage, setSuccessMessage] = useState(""); // State for success messages

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setIsOpen(false);
  };

  const placeholderText =
    selectedUser === "Student" ? "Registration Number" : "Email";

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Determine the endpoint based on selected user
    let endpoint = "";
    let userPayload = {};

    if (selectedUser === "Lecturer") {
      endpoint = "http://localhost:3000/auth/login"; // Lecturer login endpoint
      userPayload = { email: identifier, password }; // Email for lecturer
    } else if (selectedUser === "Administrator") {
      endpoint = "http://localhost:3000/auth/admin/login"; // Admin login endpoint
      userPayload = { email: identifier, password }; // Email for admin
    } else if (selectedUser === "Student") {
      endpoint = "http://localhost:3000/students/login"; // Correct student login endpoint
      userPayload = { registrationNo: identifier, password }; // Registration number for student
    } else {
      alert("Please select a valid user role.");
      return;
    }

    try {
      const response = await axios.post(endpoint, userPayload);
      console.log(response.data); // Log the response data for debugging

      // Handle success response
      if (response.status === 200) {
        console.log("Login successful:", response.data);
        setSuccessMessage("Login successful!"); // Set success message
        setErrorMessage(""); // Clear any previous error messages
      }
    } catch (error) {
      const errorResponse = error.response ? error.response.data : error.message;
      console.error("Login failed:", errorResponse);
      setErrorMessage("Login failed. Please check your credentials."); // Set error message state
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  return (
    <div className="wrapper">
      <div className="top-section">
        <img src="./src/assets/images/ciu-logo-login.png" alt="" />
        <h1>ONLINE EXAMINATION SYSTEM</h1>
      </div>
      <div className="form-box login">
        <form onSubmit={handleSubmit}>
          <div className="personel-dropdown">
            <div className="icon-div">
              <BiSolidUserRectangle className="icon" size={40} />
            </div>

            <div className="select" onClick={toggleDropdown}>
              <div className="select-field">
                <p>{selectedUser}</p>
                <RiArrowDropDownLine size={40} />
              </div>
              {isOpen && (
                <ul className="option-list">
                  <li onClick={() => handleUserSelection("Student")}>
                    Student
                  </li>
                  <li onClick={() => handleUserSelection("Administrator")}>
                    Administrator
                  </li>
                  <li onClick={() => handleUserSelection("Lecturer")}>
                    Lecturer
                  </li>
                </ul>
              )}
            </div>
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder={placeholderText}
              required
              value={identifier} // Changed from email to identifier
              onChange={(e) => setIdentifier(e.target.value)} // Adjusted for identifier
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
          </div>
          <button type="submit">LOGIN</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error messages */}
          {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success messages */}
          <div className="forgot-password">
            <a href="">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
