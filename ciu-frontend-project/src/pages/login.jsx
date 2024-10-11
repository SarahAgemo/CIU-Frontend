import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { BiSolidUserRectangle } from "react-icons/bi";
import { FaLock, FaUser } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("Select User");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setIsOpen(false);
  };

  const placeholderText = selectedUser === "Student" ? "Registration Number" : "Email";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent further submissions if already submitting
    if (isSubmitting) return;
    setIsSubmitting(true);

    let endpoint = "";
    let userPayload = {};

    // Set the endpoint and payload based on selected user
    if (selectedUser === "Lecturer") {
      endpoint = "http://localhost:3000/auth/login";
      userPayload = { email: identifier, password };
    } else if (selectedUser === "Administrator") {
      endpoint = "http://localhost:3000/auth/admin/login";
      userPayload = { email: identifier, password };
    } else if (selectedUser === "Student") {
      endpoint = "http://localhost:3000/students/login";
      userPayload = { registrationNo: identifier, password };
    } else {
      alert("Please select a valid user role.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(endpoint, userPayload);
      console.log("Response Data:", response.data);

      // Check for token in different response formats
      const accessToken = response.data.access_token || (response.data.token && response.data.token.access_token);

      // Handle successful response
      if (accessToken) {
        console.log("Login successful:", response.data);
        setSuccessMessage("Login successful!"); // Set success message
        setErrorMessage(""); // Clear any previous error messages
      } else {
        setErrorMessage("Login failed. No token received."); // Handle missing token error
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error during login:", error);
      const errorResponse = error.response ? error.response.data : error.message;
      setErrorMessage("Login failed. Please check your credentials."); // Set error message state
      setSuccessMessage(""); // Clear any previous success messages
    } finally {
      setIsSubmitting(false); // Reset submitting state after request
    }
  };

  return (
    <div className="wrapper">
      <div className="top-section">
        <img src="./src/assets/images/ciu-logo-login.png" alt="Logo" />
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
                  <li onClick={() => handleUserSelection("Student")}>Student</li>
                  <li onClick={() => handleUserSelection("Administrator")}>Administrator</li>
                  <li onClick={() => handleUserSelection("Lecturer")}>Lecturer</li>
                </ul>
              )}
            </div>
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder={placeholderText}
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
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
          <button type="submit" disabled={isSubmitting}>LOGIN</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
