import React, { useState } from 'react';
import './Registration.css';
import { RiArrowDropDownLine } from "react-icons/ri";

const Registration = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("Select User");
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailOrStudentNumber: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setIsOpen(false);
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
      errors.firstName = 'First Name is required';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last Name is required';
    }

    if (!formData.emailOrStudentNumber.trim()) {
      errors.emailOrStudentNumber = selectedUser === "Student" ? 'Student Number is required' : 'Email is required';
    } else if (selectedUser !== "Student" && !/\S+@\S+\.\S+/.test(formData.emailOrStudentNumber)) {
      errors.emailOrStudentNumber = 'Email is invalid';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted successfully:', formData);
      // Process form data (e.g., send to API)
    } else {
      setErrors(validationErrors);
    }
  };

  const placeholderText =
    selectedUser === "Student" ? "Student Number" : "Email";

  return (
    <div className='container'>
      <h2>Register</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="button-group">
          <button type="button" className={selectedUser === "Student" ? "active" : ""} onClick={() => handleUserSelection("Student")}>Student</button>
          <button type="button" className={selectedUser === "Administrator" ? "active" : ""} onClick={() => handleUserSelection("Administrator")}>Administrator</button>
          <button type="button" className={selectedUser === "Lecturer" ? "active" : ""} onClick={() => handleUserSelection("Lecturer")}>Lecturer</button>
        </div>
         
        <label htmlFor='firstName'>First Name</label>
        <input 
          type="text" 
          placeholder='Enter First Name' 
          name='firstName' 
          value={formData.firstName}
          onChange={handleInputChange}
        />
        {errors.firstName && <span className='error'>{errors.firstName}</span>}

        <label htmlFor='lastName'>Last Name</label>
        <input 
          type="text" 
          placeholder='Enter Last Name' 
          name='lastName' 
          value={formData.lastName}
          onChange={handleInputChange}
        />
        {errors.lastName && <span className='error'>{errors.lastName}</span>}

        <label htmlFor='emailOrStudentNumber'>{placeholderText}</label>
        <input 
          type={selectedUser === "Student" ? "text" : "email"} 
          placeholder={`Enter ${placeholderText}`} 
          name='emailOrStudentNumber' 
          value={formData.emailOrStudentNumber}
          onChange={handleInputChange}
        />
        {errors.emailOrStudentNumber && <span className='error'>{errors.emailOrStudentNumber}</span>}

        <label htmlFor='password'>Password</label>
        <input 
          type="password" 
          placeholder='Enter Password' 
          name='password' 
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && <span className='error'>{errors.password}</span>}

        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default Registration;

