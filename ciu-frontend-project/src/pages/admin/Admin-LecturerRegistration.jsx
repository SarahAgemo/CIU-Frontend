// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import Header from "../../components/admin/Headerpop";
// import Sidebar from "../../components/admin/SideBarpop";
// import MobileMenu from "../../components/admin/MobileMenu";
// import AdminDash from "./AdminDashboard.module.css";

// const Registration = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 991);
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };
//   const navigate = useNavigate();
//   const [selectedUser, setSelectedUser] = useState("Select User");
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     emailOrStudentNumber: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleUserSelection = (user) => {
//     setSelectedUser(user);
//     setFormData({
//       ...formData,
//       emailOrStudentNumber: "",
//       password: "",
//     });
//     setErrors({});
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const validate = () => {
//     let errors = {};

//     if (!formData.firstName.trim()) {
//       errors.firstName = "First Name is required";
//     }

//     if (!formData.lastName.trim()) {
//       errors.lastName = "Last Name is required";
//     }

//     if (!formData.emailOrStudentNumber.trim()) {
//       errors.emailOrStudentNumber = "Email is required";
//     } else if (!/^[a-zA-Z]+@ciu\.ac\.ug$/.test(formData.emailOrStudentNumber)) {
//       errors.emailOrStudentNumber =
//         "Email must be in the format: firstname@ciu.ac.ug";
//     }

//     // if (selectedUser === "Administrator" && !formData.password.trim()) {
//     //   errors.password = "Password is required";
//     // }

//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length === 0) {
//       try {
//         let endpoint = "";
//         let payload;

//         if (selectedUser === "Lecturer") {
//           endpoint = "https://c-i-u-backend.onrender.com/lecturerReg";
//           payload = {
//             first_name: formData.firstName,
//             last_name: formData.lastName,
//             email: formData.emailOrStudentNumber,
//             role: "lecturer",
//           };
//         } else if (selectedUser === "Administrator") {
//           endpoint = "https://c-i-u-backend.onrender.com/adminReg";
//           payload = {
//             first_name: formData.firstName,
//             last_name: formData.lastName,
//             email: formData.emailOrStudentNumber,
//             role: "administrator",
//             // password: formData.password,
//           };
//         }

//         const response = await fetch(endpoint, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         });

//         const responseData = await response.json();

//         if (response.ok) {
//           setSuccessMessage(`${selectedUser} successfully registered!`);
//           setFormData({
//             firstName: "",
//             lastName: "",
//             emailOrStudentNumber: "",
//             password: "",
//           });
//           setErrors({});

//           if (selectedUser === "Administrator") {
//             navigate("/adminuser");
//           } else if (selectedUser === "Lecturer") {
//             navigate("/dashboard");
//           }
//         } else {
//           setErrors({
//             server:
//               responseData.message || "Registration failed. Please try again.",
//           });
//         }
//       } catch (error) {
//         console.error("Error registering user:", error);
//         setErrors({ server: "An error occurred. Please try again later." });
//       }
//     } else {
//       setErrors(validationErrors);
//     }
//   };

//   return (
//     <div>
//       <style>
//         {`
//            body {
//               background: #ebebeb;
//               text-align: center;
//               font-family: 'Roboto Slab';
//             }

//             h2 {
//               font-size: x-large;
//               color: #106053;
//               margin-top: 10px;
//             }

//             .form {
//               display: flex;
//               flex-direction: column;
//               align-items: center;
//               width: 600px;
//               margin: 0 auto;
//               margin-top: 40px;
//               margin-left: 130px;
//               padding: 20px;
//               background-color: #ffffff;
//               box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
//               font-family: 'Roboto Slab';
//             }

//             .label {
//               font-size: 15px;
//               color: #106053;
//               font-weight: bold;
//               text-align: left;
//               margin-bottom: 5px;
//               width: 100%;
//               display: block;
//             }

//             .input {
//               width: 100%;
//               padding: 10px;
//               font-size: 14px;
//               margin-bottom: 15px;
//               border: 1px solid #ddd;
//               border-radius: 5px;
//               box-sizing: border-box;
//               transition: border-color 0.3s ease;
//             }

//             .input:focus {
//               border-color: #106053;
//               outline: none;
//             }

//             .error {
//               color: #dc3545;
//               font-size: 12px;
//               text-align: left;
//               margin-top: 2px;
//             }

//             .register-button {
//               padding: 10px 15px;
//                 margin: 15px;
//                 box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
//                 border: none;
//                 color: #fff;
//                 cursor: pointer;
//                 background-color: #106053;
//                 width: 40%;
//                 font-size: 16px;
//             }

//             .register-button:hover {
//               background-color: #0b3f37;
//             }

//             .button-group {
//               display: flex;
//               justify-content: space-around;
//               gap: 60px;
//               margin-bottom: 10px;
//             }

//             .button-group button {
//               padding: 10px 15px;
//               border: none;
//               background-color: #106053;
//               color: #fff;
//               width: 100px;
//               height: 40px;
//               cursor: pointer;
//               font-size: 12px;
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               transition: background-color 0.3s ease;
//             }

//             .button-group button:hover {
//               background-color: #0b3f37; /* Darker shade on hover */
//             }

//             .button-group button.active-button {
//               background-color: #0b3f37;
//               color: #fff;
//             }

//             input:focus {
//               border-color: #106053;
//               outline: none;
//             }

//             .overlay {
//               position: fixed;
//               top: 0;
//               left: 0;
//               right: 0;
//               bottom: 0;
//               background-color: rgba(0, 0, 0, 0.5);
//               display: none;
//               z-index: 998;
//             }

//             .overlay.active {
//               display: block;
//             }

//             .menu-open .main-content {
//               pointer-events: none;
//             }

//             .dimmed {
//               opacity: 0.5;
//               transition: opacity 0.3s ease;
//             }

//             /* NEW: Styles for toggle switch */
//             .toggle-switch {
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               margin-bottom: 20px; /* Added space below the switch */
//             }

//             .toggle-label {
//               position: relative;
//               display: inline-block;
//               width: 60px; /* Width of the toggle */
//               height: 30px; /* Height of the toggle */
//             }

//             .toggle-input {
//               opacity: 0; /* Hide the checkbox */
//               width: 0;
//               height: 0;
//             }

//             .toggle-slider {
//               position: absolute;
//               cursor: pointer;
//               top: 0;
//               left: 0;
//               right: 0;
//               bottom: 0;
//               background-color: #106053;; /* Default background */
//               border-radius: 30px;
//               transition: background-color 0.4s ease; /* Smooth background transition */
//             }

//             .toggle-slider::before {
//               position: absolute;
//               content: "";
//               height: 24px;
//               width: 24px;
//               left: 3px;
//               bottom: 3px;
//               background-color: white;
//               border-radius: 50%; /* Round the knob */
//               transition: transform 0.4s ease; /* Smooth movement of the knob */
//             }

//             .toggle-input:checked + .toggle-slider {
//               background-color: #106053; /* Active background color */
//             }

//             .toggle-input:checked + .toggle-slider::before {
//               transform: translateX(30px); /* Move knob to the right */
//             }

//             .toggle-text {
//               margin-left: 15px;
//               font-weight: bold;
//               color: #106053;
//             }

// }
//              `}
//       </style>

//       <div className={AdminDash["overall"]}>
//         <div className={AdminDash["dashboard"]}>
//           <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
//           <div className={AdminDash["dashboard-content"]}>
//             {!isMobile && <Sidebar />}
//             {isMobile && (
//               <>
//                 <div
//                   className={`${AdminDash["overlay"]} ${
//                     isMobileMenuOpen ? AdminDash["active"] : ""
//                   }`}
//                   onClick={toggleMobileMenu}
//                 ></div>
//                 <MobileMenu
//                   isOpen={isMobileMenuOpen}
//                   toggleMenu={toggleMobileMenu}
//                 />
//               </>
//             )}

//             <div className="container">
//               <form onSubmit={handleSubmit} className="form">
//                 <h2>Register</h2>

//                 {/* Toggle Switch */}
//                 <div className="toggle-switch">
//                   <label className="toggle-label">
//                     <input
//                       type="checkbox"
//                       checked={selectedUser === "Administrator"}
//                       onChange={(e) =>
//                         handleUserSelection(
//                           e.target.checked ? "Administrator" : "Lecturer"
//                         )
//                       }
//                       className="toggle-input"
//                     />
//                     <span className="toggle-slider"></span>
//                   </label>
//                   <span className="toggle-text">
//                     {selectedUser === "Administrator"
//                       ? "Administrator"
//                       : "Lecturer"}
//                   </span>
//                 </div>

//                 {/* Form Fields */}
//                 <label className="label">First Name</label>
//                 <input
//                   type="text"
//                   placeholder="Enter First Name"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleInputChange}
//                   className="input"
//                 />
//                 {errors.firstName && (
//                   <span className="error">{errors.firstName}</span>
//                 )}

//                 <label className="label">Last Name</label>
//                 <input
//                   type="text"
//                   placeholder="Enter Last Name"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleInputChange}
//                   className="input"
//                 />
//                 {errors.lastName && (
//                   <span className="error">{errors.lastName}</span>
//                 )}

//                 <label className="label">Email (@ciu.ac.ug)</label>
//                 <input
//                   type="email"
//                   placeholder="Enter Email (firstname@ciu.ac.ug)"
//                   name="emailOrStudentNumber"
//                   value={formData.emailOrStudentNumber}
//                   onChange={handleInputChange}
//                   className="input"
//                 />
//                 {errors.emailOrStudentNumber && (
//                   <span className="error">{errors.emailOrStudentNumber}</span>
//                 )}



//                 <button type="submit" className="register-button">
//                   Register as {selectedUser}
//                 </button>

//                 {successMessage && <p className="success">{successMessage}</p>}
//                 {errors.server && (
//                   <span className="error">{errors.server}</span>
//                 )}
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Registration;

import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import styles from "./Admin-lecturerRegistration.module.css";

const AdminLecturerRegistration = ({ onClose, onRegister, initialRole }) => {
  const [isLecturer, setIsLecturer] = useState(initialRole === 'lecturer');
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailOrStudentNumber: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setIsLecturer(initialRole === 'lecturer');
  }, [initialRole]);

  const handleToggle = () => {
    if (initialRole === 'both') {
      setIsLecturer(!isLecturer);
      setFormData({
        ...formData,
        emailOrStudentNumber: "",
      });
      setErrors({});
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }

    if (!formData.emailOrStudentNumber.trim()) {
      errors.emailOrStudentNumber = "Email is required";
    } else if (!/^[a-zA-Z]+@ciu\.ac\.ug$/.test(formData.emailOrStudentNumber)) {
      errors.emailOrStudentNumber =
        "Email must be in the format: firstname@ciu.ac.ug";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        let endpoint = isLecturer ? "https://c-i-u-backend.onrender.com/lecturerReg" : "https://c-i-u-backend.onrender.com/adminReg";
        let payload = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.emailOrStudentNumber,
          role: isLecturer ? "lecturer" : "administrator",
        };

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const newUser = await response.json();
          onRegister(newUser);
          onClose();
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Registration failed. Please try again.");
        }
      } catch (error) {
        console.error("Error registering user:", error);
        setErrors({ server: error.message || "An error occurred. Please try again later." });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className={styles.registrationFormContainer}>
      <div className={styles.registrationFormHeader}>
        <h2>Register New {isLecturer ? "Lecturer" : "Administrator"}</h2>
        <button onClick={onClose} className={styles.closeButton}>
          <FaTimes />
        </button>
      </div>
      <form onSubmit={handleSubmit} className={styles.registrationForm}>
        {initialRole === 'both' && (
          <div className={styles.toggleContainer}>
            <span className={isLecturer ? styles.activeText : ""}>Lecturer</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={!isLecturer}
                onChange={handleToggle}
              />
              <span className={styles.slider}></span>
            </label>
            <span className={!isLecturer ? styles.activeText : ""}>Administrator</span>
          </div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter First Name"
          />
          {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter Last Name"
          />
          {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="emailOrStudentNumber">Email (@ciu.ac.ug)</label>
          <input
            type="email"
            id="emailOrStudentNumber"
            name="emailOrStudentNumber"
            value={formData.emailOrStudentNumber}
            onChange={handleInputChange}
            placeholder="Enter Email (firstname@ciu.ac.ug)"
          />
          {errors.emailOrStudentNumber && <span className={styles.error}>{errors.emailOrStudentNumber}</span>}
        </div>

        <button type="submit" className={styles.registerButton}>
          Register
        </button>

        {errors.server && <span className={`${styles.error} ${styles.serverError}`}>{errors.server}</span>}
      </form>
    </div>
  );
};

export default AdminLecturerRegistration;

