import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import styles from "./Admin-LecturerRegistration.module.css";

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
        let endpoint = isLecturer ? "http://localhost:3000/lecturerReg" : "http://localhost:3000/adminReg";
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

