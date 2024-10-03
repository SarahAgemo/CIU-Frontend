import React, { useState } from "react";
import "./Login.css";
import { BiSolidUserRectangle } from "react-icons/bi";
import { FaLock, FaUser } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("Select User");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setIsOpen(false);
  };

  // Determine placeholder based on selected user
  const placeholderText =
    selectedUser === "Student" ? "Student Number" : "Email";

  return (
    <div className="wrapper">
      <div className="top-section">
        <img src="./src/assets/images/ciu-logo-login.png" alt="" />
        <h1>ONLINE EXAMINATION SYSTEM</h1>
      </div>
      <div className="form-box login">
        <form action="">
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
            <input type="" placeholder={placeholderText} required />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
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
