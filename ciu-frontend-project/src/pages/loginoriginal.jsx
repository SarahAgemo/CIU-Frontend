import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import log from "./login.module.css";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setIsOpen(false);
  };

  const placeholderText =
    selectedUser === "Student" ? "Registration Number" : "Email";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    let endpoint = "";
    let userPayload = {};

    if (selectedUser === "Lecturer") {
      endpoint = "https://c-i-u-backend.onrender.com/lecturer_auth/login";
      userPayload = { email: identifier, password };
    } else if (selectedUser === "Administrator") {
      endpoint = "https://c-i-u-backend.onrender.com/adminauth/login";
      userPayload = { email: identifier, password };
    } else if (selectedUser === "Student") {
      endpoint = "https://c-i-u-backend.onrender.com/students/login";
      userPayload = { registrationNo: identifier, password };
    } else {
      alert("Please select a valid user role.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(endpoint, userPayload);
      const accessToken =
        response.data.access_token || response.data.token?.access_token;

      // Store access token and user data in localStorage
      localStorage.setItem("token", accessToken);
      console.log(response.data);
      // Add this block to save 'CourseId' and other user data for students
      if (selectedUser === "Student") {
        const studentData = {
          courseId: response.data.user.courseId, // Adjust if the field is named differently
          ...response.data.user // Store any other needed user data
        };
        localStorage.setItem("user", JSON.stringify(studentData));
      } else {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      setSuccessMessage("Login successful!");

      // Redirect to appropriate page based on user role
      if (selectedUser === "Student") {
        navigate("/student");
      } else if (selectedUser === "Administrator") {
        navigate("/dashboard");
      } else if (selectedUser === "Lecturer") {
        navigate("/lecturerdashboard");
      }


    } catch (error) {
      console.log(error);
      setErrorMessage("Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={log["overall"]}>
      <div className={log["wrapper"]}>
        <div className={log["top-section"]}>
          <img src="./public/ciu-logo-login.png" alt="Logo" />
          <h1>ONLINE EXAMINATION SYSTEM</h1>
        </div>
        <div className={log["form-box"]}>
          <form onSubmit={handleSubmit}>
            <div className={log["personel-dropdown"]}>
              <div className={log["icon-div"]}>
                <BiSolidUserRectangle className={log["icon"]} size={40} />
              </div>
              <div className={log["select"]} onClick={toggleDropdown}>
                <div className={log["select-field"]}>
                  <p>{selectedUser}</p>
                  <RiArrowDropDownLine size={40} />
                </div>
                {isOpen && (
                  <ul className={log["option-list"]}>
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

            <div className={log["input-box"]}>
              <input
                type="text"
                placeholder={placeholderText}
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
              <FaUser className={log["icon"]} />
            </div>
            <div className={log["input-box"]}>
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className={log["icon"]} />
            </div>
            <div className={log["remember-forgot"]}>
              <label>
                <input type="checkbox" />
                Remember Me
              </label>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="login-submit-button"
              style={{ width: "100%", height: "45px" }}
            >
              LOGIN
            </button>
            {errorMessage && (
              <p className={log["error-message"]}>{errorMessage}</p>
            )}
            {successMessage && (
              <p className={log["success-message"]}>{successMessage}</p>
            )}
            <div className={log["forgot-password"]}>
              <Link
                to={
                  selectedUser === "Student"
                    ? "/reset-password"
                    : selectedUser === "Administrator"
                      ? "/adminPassword"
                      : selectedUser === "Lecturer"
                        ? "/lecturerPassword"
                        : "#"
                }
                onClick={
                  selectedUser !== "Student" &&
                    selectedUser !== "Administrator" &&
                    selectedUser !== "Lecturer"
                    ? () =>
                      alert(
                        "Please contact support for password reset instructions."
                      )
                    : undefined
                }
              >
                Forgot Password?
              </Link>
              <span> or </span>
              <Link to="/token-password-reset" className={log.signInLink}>
                Set password using token
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
