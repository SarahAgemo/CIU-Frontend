import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "./Leclogin.css";

const LecLogin = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Replace this with your actual login logic
      // Example:
      // const response = await api.login({ identifier, password });
      // if (response.success) {
      //   setSuccessMessage('Login successful!');
      //   // Redirect or perform other actions
      // } else {
      //   setErrorMessage('Invalid credentials.');
      // }

      // Mocking a successful login for demonstration
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccessMessage('Login successful!');
    } catch (error) {
      setErrorMessage('An error occurred during login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overall">
      <div className="wrapper">
        <div className='top-section'>
          <img src="./src/assets/images/ciu-logo-login.png" alt="Logo" />
          <h1>ONLINE EXAMINATION SYSTEM</h1>

          <h6>LECTURER LOGIN</h6>
        </div>
        <div className='form-box'>
          <form onSubmit={handleSubmit}>
            <div className='input-box'>
              <input
                type="text"
                placeholder="Email"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
              <FaUser className="icon" />
            </div>
            <div className='input-box'>
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className="icon" />
            </div>
            <div className='remember-forgot'>
              <label>
                <input type="checkbox" />
                Remember Me
              </label>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="login-submit-button"
              style={{ width: '100%', height: '45px' }}
            >
              {isSubmitting ? 'Logging in...' : 'LOGIN'}
            </button>
            {errorMessage && (
              <p className='error-message'>{errorMessage}</p>
            )}
            {successMessage && (
              <p className='success-message'>{successMessage}</p>
            )}
            <div className='forgot-password'>
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
