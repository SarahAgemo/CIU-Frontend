import React, { useState } from "react";
import axios from "axios"; // Import axios
import "./login.css";
import { BiSolidUserRectangle } from "react-icons/bi";
import { FaLock, FaUser } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("Select User");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setIsOpen(false);
  };

  const placeholderText =
    selectedUser === "Student" ? "Student Number" : "Email";

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Determine the endpoint based on selected user
    let endpoint = "";
    if (selectedUser === "Lecturer") {
      endpoint = "http://localhost:3000/auth/login"; // Lecturer login
    } else if (selectedUser === "Administrator") {
      endpoint = "http://localhost:3000/auth/admin/login"; // Admin login endpoint
    } else if (selectedUser === "Student") {
      endpoint = "http://localhost:3000/auth/student/login"; // Student login endpoint
    } else {
      alert("Please select a valid user role.");
      return;
    }

    try {
      const response = await axios.post(endpoint, {
        email,
        password,
      });

      // Handle success response
      if (response.status === 200) {
        console.log("Login successful:", response.data);
        alert("Login successful!");
        // You can redirect or perform further actions here
      }
    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data : error.message);
      alert("Login failed. Please check your credentials.");
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="forgot-password">
            <a href="">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
