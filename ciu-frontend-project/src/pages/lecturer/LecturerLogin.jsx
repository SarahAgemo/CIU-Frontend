import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import "./LecturerLogin.css";

const LecLogin = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (isSubmitting) return;

  setIsSubmitting(true);
  setErrorMessage("");
  setSuccessMessage("");

  const endpoint = "http://localhost:3000/lecturer_auth/login";
  const userPayload = { email: identifier, password };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userPayload),
    });

    if (response.ok) {
      const data = await response.json();
      setSuccessMessage("Login successful!");

      // Store access token and lecturer data in localStorage
      const accessToken = data.access_token || data.token?.access_token;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to lecturer dashboard
      navigate("/lecturerdashboard");
    } else {
      const data = await response.json();
      setErrorMessage(data.message || "Invalid credentials.");
    }
  } catch (error) {
    setErrorMessage("An error occurred during login. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="overall">
      <div className="wrapper">
        <div className="top-section">
          <img src="./src/assets/images/ciu-logo-login.png" alt="Logo" />
          <h1>ONLINE EXAMINATION SYSTEM</h1>
        </div>
        <div className="form-box">
        <h6>LECTURER LOGIN</h6>
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                type="text"
                placeholder="Email"
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
                <input type="checkbox" /> Remember Me
              </label>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="login-submit-button"
              style={{ width: "100%", height: "45px" }}
            >
              {isSubmitting ? "Logging in..." : "LOGIN"}
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <div className="forgot-password">
              <Link to="/reset-password">Forgot Password?</Link>
              <span> or </span>
              <Link to="/token-password-reset" className="signInLink">
                Set password using token
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LecLogin;
