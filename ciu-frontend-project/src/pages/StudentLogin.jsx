// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import log from "./login.module.css";
// import { BiSolidUserRectangle } from "react-icons/bi";
// import { FaLock, FaUser } from "react-icons/fa";
// import { RiArrowDropDownLine } from "react-icons/ri";

// const Login = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState("Student");
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (isSubmitting) return;
//     setIsSubmitting(true);
//     setErrorMessage("");
//     setSuccessMessage("");

//     const endpoint = "https://c-i-u-backend.onrender.com/students/login";
//     const userPayload = { registrationNo: identifier, password };

//     try {
//       const response = await axios.post(endpoint, userPayload);
//       const accessToken =
//         response.data.access_token || response.data.token?.access_token;
//       console.log(accessToken);

//       localStorage.setItem("token", accessToken);
//       localStorage.setItem("user", JSON.stringify(response.data.user));
//       setSuccessMessage("Login successful!");

//       navigate("/student");
//     } catch (error) {
//       console.log(error);
//       setErrorMessage("Login failed. Please check your credentials.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className={log["overall"]}>
//       <div className={log["wrapper"]}>
//         <div className={log["top-section"]}>
//           <img src="./ciu-logo-login.png" alt="Logo" />
//           <h1>ONLINE EXAMINATION SYSTEM</h1>
//         </div>
//         <div className={log["form-box"]}>
//           <form onSubmit={handleSubmit}>
//             <div className={log["personel-dropdown"]}>
//               <div className={log["icon-div"]}>
//                 <BiSolidUserRectangle className={log["icon"]} size={40} />
//               </div>
//               <div className={log["select"]}>
//                 <div className={log["select-field"]}>
//                   <p>{selectedUser}</p>
//                 </div>
//               </div>
//             </div>

//             <div className={log["input-box"]}>
//               <input
//                 type="text"
//                 placeholder="Registration Number"
//                 required
//                 value={identifier}
//                 onChange={(e) => setIdentifier(e.target.value)}
//               />
//               <FaUser className={log["icon"]} />
//             </div>
//             <div className={log["input-box"]}>
//               <input
//                 type="password"
//                 placeholder="Password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <FaLock className={log["icon"]} />
//             </div>
//             <div className={log["remember-forgot"]}>
//               <label>
//                 <input type="checkbox" />
//                 Remember Me
//               </label>
//             </div>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="login-submit-button "
//               style={{ width: "100%", height: "45px" }}
//             >
//               LOGIN
//             </button>
//             {errorMessage && (
//               <p className={log["error-message"]}>{errorMessage}</p>
//             )}
//             {successMessage && (
//               <p className={log["success-message"]}>{successMessage}</p>
//             )}
//             <div className={log["forgot-password"]}>
//               <Link to="/reset-password">
//                 Forgot Password?
//               </Link>
//               <span> or </span>
//               <Link to="/studenttoken-password-reset" className={log.signInLink}>
//                 Set password using token
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { BiSolidUserRectangle } from "react-icons/bi";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from "./login.module.css";
import ResetPasswordForm from "../components/admin/ResetPassword";
import StudenttokenPassword from "../components/admin/StudenttokenPassword";

const StudentLogin = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [isSetPasswordModalOpen, setIsSetPasswordModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const endpoint = "https://c-i-u-backend.onrender.com/students/login";
    const userPayload = { registrationNo: identifier, password };

    try {
      const response = await axios.post(endpoint, userPayload);
      const accessToken =
        response.data.access_token || response.data.token?.access_token;
      console.log(accessToken);

      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setSuccessMessage("Login successful!");

      navigate("/student");
    } catch (error) {
      console.log(error);
      setErrorMessage("Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.overall}>
      <div className={styles.wrapper}>
        <div className={styles["top-section"]}>
          <img src="./ciu-logo-login.png" alt="Logo" />
          <h1>ONLINE EXAMINATION SYSTEM</h1>
        </div>
        <div className={styles["form-box"]}>
          <h6>STUDENT LOGIN</h6>
          <form onSubmit={handleSubmit}>
            <div className={styles["input-box"]}>
              <input
                type="text"
                placeholder="Registration Number"
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
              {isSubmitting ? "Logging in..." : "LOGIN"}
            </button>
            {errorMessage && (
              <p className={styles["error-message"]}>{errorMessage}</p>
            )}
            {successMessage && (
              <p className={styles["success-message"]}>{successMessage}</p>
            )}
            <div className={styles["forgot-password"]}>
              <Link to="/reset-password" className={styles["forgot-password-link"]}>
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
          <ResetPasswordForm onClose={() => setIsResetPasswordModalOpen(false)} />
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
          <StudenttokenPassword onClose={() => setIsSetPasswordModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentLogin;

