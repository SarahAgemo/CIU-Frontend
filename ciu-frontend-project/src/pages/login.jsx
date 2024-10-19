import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
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

  const placeholderText = selectedUser === "Student" ? "Registration Number" : "Email";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    let endpoint = "";
    let userPayload = {};

    // Set the endpoint and payload based on selected user
    if (selectedUser === "Lecturer") {
      endpoint = "http://localhost:3000/auth/login";
      userPayload = { email: identifier, password };
    } else if (selectedUser === "Administrator") {
      endpoint = "http://localhost:3000/adminauth/login";
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

      // Check for token in response (adjust according to your backend response structure)
      const accessToken = response.data.access_token || response.data.token?.access_token;

      if (accessToken) {
        console.log("Login successful:", response.data);
        localStorage.setItem('token', accessToken); // Save the token to local storage
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Save user details to local storage
        setSuccessMessage("Login successful!");

        // Redirect the user based on their role
        if (selectedUser === "Student") {
          navigate("/student");
        } else if (selectedUser === "Administrator") {
          navigate("/dashboard");
        } else if (selectedUser === "Lecturer") {
          navigate("/lecturer");
        }
      } else {
        setErrorMessage("Login failed. No token received.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false); // Reset submitting state after request
    }
  };

  return (
    <div className={log["overall"]}>
    <div className={log["wrapper"]}>
      <div className={log["top-section"]}>
        <img src="./src/assets/images/ciu-logo-login.png" alt="Logo" />
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
                  <li onClick={() => handleUserSelection("Student")}>Student</li>
                  <li onClick={() => handleUserSelection("Administrator")}>Administrator</li>
                  <li onClick={() => handleUserSelection("Lecturer")}>Lecturer</li>
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
          <button type="submit" disabled={isSubmitting}>LOGIN</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <div className="forgot-password">

            <Link 
              to={selectedUser === "Student" ? "/reset-password" : "#"}
              onClick={selectedUser !== "Student" ? () => alert("Please contact support for password reset instructions.") : undefined}
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};



{/* export default Login;

 import React, { useState } from "react"; import axios from "axios";
 import { Link, useNavigate } from "react-router-dom";
 import { BiSolidUserRectangle } from "react-icons/bi";
 import { FaLock, FaUser } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
 import styles from './Login.module.css'; // Importing the CSS module */}


{/* //   const [isOpen, setIsOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState("Select User");
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen); */}



{/* //     setSelectedUser(user);
//     setIsOpen(false); */}
//   };
{/* 
//   const placeholderText = selectedUser === "Student" ? "Registration Number" : "Email";

//   const handleSubmit = async (e) => { */}
{/* //     e.preventDefault();
//     if (isSubmitting) return;
//     setIsSubmitting(true);
//     setErrorMessage("");
//     setSuccessMessage("");

//     let endpoint = "";
//     let userPayload = {};

//     if (selectedUser === "Lecturer") { */}
{/* //       endpoint = "http://localhost:3000/auth/login";
//       userPayload = { email: identifier, password };
//     } else if (selectedUser === "Administrator") {
//       endpoint = "http://localhost:3000/adminauth/login";
//       userPayload = { email: identifier, password };
//     } else if (selectedUser === "Student") {
//       endpoint = "http://localhost:3000/students/login";
//       userPayload = { registrationNo: identifier, password };
//     } else {
//       alert("Please select a valid user role.");
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const response = await axios.post(endpoint, userPayload);
//       console.log("Response Data:", response.data);
//       const accessToken = response.data.access_token || (response.data.token && response.data.token.access_token);

//       if (accessToken) {
//         console.log("Login successful:", response.data);
//         setSuccessMessage("Login successful!");
//         setErrorMessage("");
//         // Optionally navigate to a different page on success
//         navigate("/home"); // Redirect to a home page or dashboard
//       } else {
//         setErrorMessage("Login failed. No token received.");
//         setSuccessMessage("");
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       const errorResponse = error.response ? error.response.data : error.message;
//       setErrorMessage("Login failed. Please check your credentials.");
//       setSuccessMessage("");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.topSection}>
//         <img src="./src/assets/images/ciu-logo-login.png" alt="Logo" />
//         <h1>ONLINE EXAMINATION SYSTEM</h1>
//       </div>
//       <div className={`${styles.formBox} ${styles.login}`}>
//         <form onSubmit={handleSubmit}>
//           <div className={styles.personelDropdown}>
//             <div className={styles.iconDiv}>
//               <BiSolidUserRectangle className={styles.icon} size={40} />
//             </div>
//             <div className={styles.select} onClick={toggleDropdown}>
//               <div className={styles.selectField}>
//                 <p>{selectedUser}</p>
//                 <RiArrowDropDownLine size={40} />
//               </div>
//               {isOpen && (
//                 <ul className={styles.optionList}>
//                   <li onClick={() => handleUserSelection("Student")}>Student</li>
//                   <li onClick={() => handleUserSelection("Administrator")}>Administrator</li>
//                   <li onClick={() => handleUserSelection("Lecturer")}>Lecturer</li>
//                 </ul>
//               )}
//             </div>
//           </div>

//           <div className={styles.inputBox}>
//             <input
//               type="text"
//               placeholder={placeholderText}
//               required
//               value={identifier}
//               onChange={(e) => setIdentifier(e.target.value)}
//             />
//             <FaUser className={styles.icon} />
//           </div>
//           <div className={styles.inputBox}>
//             <input
//               type="password"
//               placeholder="Password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <FaLock className={styles.icon} />
//           </div>
//           <div className={styles.rememberForgot}>
//             <div><label>Remember Me</label></div>
//             <div><input type="checkbox" /></div>
//           </div>
//           <button type="submit" disabled={isSubmitting}>LOGIN</button>
//           {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
//           {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
//           <div className={styles.forgotPassword}>
//             <Link
//               to={selectedUser === "Student" ? "/reset-password" : "#"}
//               onClick={selectedUser !== "Student" ? () => alert("Please contact support for password reset instructions.") : undefined}
//             >
//               Forgot Password?
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login; */}
