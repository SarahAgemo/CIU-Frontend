// import React, { useState } from 'react';
// import { FaUser, FaLock } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import "./AdminLogin.css";

// const AdminLogin = () => {
//   const [identifier, setIdentifier] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isSubmitting) return;

//     setIsSubmitting(true);
//     setErrorMessage('');
//     setSuccessMessage('');

//     const endpoint = "https://c-i-u-backend.onrender.com/adminauth/login";
//     const userPayload = { email: identifier, password };

//     try {
//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userPayload),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setSuccessMessage('Admin login successful!');

//         // Store access token and admin data in localStorage
//         const accessToken = data.access_token || data.token?.access_token;
//         localStorage.setItem("token", accessToken);
//         localStorage.setItem("user", JSON.stringify(data.user));

//         // Redirect to admin dashboard
//         navigate("/dashboard");
//       } else {
//         const data = await response.json();
//         setErrorMessage(data.message || 'Invalid credentials.');
//       }
//     } catch (error) {
//       setErrorMessage('An error occurred during login. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="admin-overall">
//       <div className="wrapper">
//         <div className="top-section">
//           <img src="./src/assets/images/ciu-logo-login.png" alt="Logo" />
//           <h1>ONLINE EXAMINATION SYSTEM</h1>
//         </div>
//         <div className="form-box">
//            <h6>ADMIN LOGIN</h6>
//           <form onSubmit={handleSubmit}>
//             <div className="input-box">
//               <input
//                 type="text"
//                 placeholder="Email"
//                 required
//                 value={identifier}
//                 onChange={(e) => setIdentifier(e.target.value)}
//               />
//               <FaUser className="icon" />
//             </div>
//             <div className="input-box">
//               <input
//                 type="password"
//                 placeholder="Password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <FaLock className="icon" />
//             </div>
//             <div className="remember-forgot">
//               <label>
//                 <input type="checkbox" />
//                 Remember Me
//               </label>
//             </div>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="login-submit-button"
//               style={{ width: '100%', height: '45px' }}
//             >
//               {isSubmitting ? 'Logging in...' : 'LOGIN'}
//             </button>
//             {errorMessage && (
//               <p className="error-message">{errorMessage}</p>
//             )}
//             {successMessage && (
//               <p className="success-message">{successMessage}</p>
//             )}
//             <div className="forgot-password">
//               <Link to="/adminPassword">Forgot Password?</Link>
//               <span> or </span>
//               <Link to="/admintoken-password-reset" className="signInLink">
//                 Set password using token
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;


import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from "./AdminLogin.module.css";
import ResetAdminPassword from '../../components/admin/ResetAdminPassword';
import AdminTokenPassword from '../../components/admin/AdmintokenPassword';

const ResetAdminPasswordForm = () => {
  return <ResetAdminPassword />;
};

const AdminLogin = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [isSetPasswordModalOpen, setIsSetPasswordModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    const endpoint = "https://c-i-u-backend.onrender.com/adminauth/login";
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
        setSuccessMessage('Admin login successful!');

        // Store access token and admin data in localStorage
        const accessToken = data.access_token || data.token?.access_token;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect to admin dashboard
        navigate("/dashboard");
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Invalid credentials.');
      }
    } catch (error) {
      setErrorMessage('An error occurred during login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles["admin-overall"]}>
      <div className={styles["wrapper"]}>
        <div className={styles["top-section"]}>
          <img src="./src/assets/images/ciu-logo-login.png" alt="Logo" />
          <h1>ONLINE EXAMINATION SYSTEM</h1>
        </div>
        <div className={styles["form-box"]}>
          <h6>ADMIN LOGIN</h6>
          <form onSubmit={handleSubmit}>
            <div className={styles["input-box"]}>
              <input
                type="email"
                placeholder="Email"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
              <FaUser className={styles["icon"]} />
            </div>
            <div className={styles["input-box"]}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className={styles["toggle-icon"]}
                onClick={() => setShowPassword((prev) => !prev)}
                style={{ position: "absolute", right: "20px", cursor: "pointer" }}
              >
                {showPassword ? <FaEye className={styles["eye-icon"]} /> : <FaEyeSlash className={styles["eye-icon"]} />}
              </div>
            </div>
            <div className={styles["remember-forgot"]}>
              <input type="checkbox" />
              <label>
                Remember Me
              </label>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles["login-submit-button"]}
            >
              {isSubmitting ? 'Logging in...' : 'LOGIN'}
            </button>
            {errorMessage && (
              <p className={styles["error-message"]}>{errorMessage}</p>
            )}
            {successMessage && (
              <p className={styles["success-message"]}>{successMessage}</p>
            )}
            <div className={styles["forgot-password"]}>
              <Link onClick={() => setIsResetPasswordModalOpen(true)} className={styles["forgot-password-link"]}>
                Forgot Password?
              </Link>
              <span> or </span>
              <Link onClick={() => setIsSetPasswordModalOpen(true)} className={styles["set-password-link"]}>
                Set password using token
              </Link>
            </div>
          </form>
        </div>
      </div>

      <Dialog
        open={isResetPasswordModalOpen}
        onClose={() => setIsResetPasswordModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setIsResetPasswordModalOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <ResetAdminPasswordForm />
        </DialogContent>
      </Dialog>

      <Dialog
        open={isSetPasswordModalOpen}
        onClose={() => setIsSetPasswordModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setIsSetPasswordModalOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <AdminTokenPassword onClose={() => setIsSetPasswordModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminLogin;

