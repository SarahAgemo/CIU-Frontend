import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Registration = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("Select User");
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailOrStudentNumber: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  

  const toggleDropdown = () => { 
    setIsOpen(!isOpen);
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setIsOpen(false);
    setFormData({
      ...formData,
      emailOrStudentNumber: '', // Reset the input field when user type changes
    });
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
      errors.emailOrStudentNumber = 'Email is required'; // Only require email for lecturers and administrators
    } else if (!/\S+@\S+\.\S+/.test(formData.emailOrStudentNumber)) {
      errors.emailOrStudentNumber = 'Email is invalid';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        let endpoint = '';
        let payload;

        // Set the endpoint and payload based on the selected user type
        if (selectedUser === "Lecturer") {
          endpoint = 'http://localhost:3000/lecturerReg';
          payload = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            student_number: null, // No student number for lecturer
            email: formData.emailOrStudentNumber, // Email for lecturer
            role: selectedUser,
            password: formData.password,
          };
        } else if (selectedUser === "Administrator") {
          endpoint = 'http://localhost:3000/adminReg';
          payload = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            student_number: null, // No student number for administrator
            email: formData.emailOrStudentNumber, // Email for administrator
            role: selectedUser,
            password: formData.password,
          };
        }

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          setSuccessMessage(`${selectedUser} successfully registered!`);
          setFormData({ firstName: '', lastName: '', emailOrStudentNumber: '', password: '' }); // Clear the form
          setErrors({});

          // Redirect based on the user type
          if (selectedUser === "Administrator") {
            navigate('/adminuser'); // Redirect to the admin user page
          } else if (selectedUser === "Lecturer") {
            navigate('/users'); // Redirect to the lecturer user page
          }
        } else {
          const errorData = await response.json();
          setErrors(errorData.errors || {});
        }
      } catch (error) {
        console.error('Error registering user:', error);
        setErrors({ server: 'An error occurred. Please try again later.' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div>
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

          body{
              background: #ebebeb;
              text-align: center;
              font-family: 'Roboto', sans-serif;
          }

          .container{
              background-color: #fff;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
              padding: 10px 20px;
              transition: transform 0.2s;
              width: 500px;
              text-align: center;
              margin: 20px auto;
          }

          h2{
              font-size: x-large;
              text-align: center;
              color: #106010;
          }

          label{
              font-size: 15px;
              display: block;
              width: 100%;
              margin-top: 8px;
              margin-bottom: 5px;
              text-align: left;
              color: #106010;
              font-weight: bold;
          }

          input, select, textarea{
              display: block;
              width: 100%;
              padding: 8px;
              box-sizing: border-box;
              border: 1px solid #ddd;
              font-size: 12px;
              margin-bottom: 5px;
              transition: border-color 0.3s ease;
          }


          .error {
              color: #938d8d;
              font-size: 12px;
              text-align: left;
              margin-top: 2px;
          }


          input.error-input, select.error-input {
              border-color: red;
          }


          button{
              padding: 10px 15px;
              margin: 15px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
              border: none;
              color: #fff;
              cursor: pointer;
              background-color: #106010;
              width: 40%;
              font-size: 16px;
          }

          button:hover{
              background-color: #0c890c;
          }

          .button-group {
              display: flex;
              justify-content: space-around;
              margin-bottom: 15px;
              gap: 10px;
          }

          .button-group button {
              padding: 10px 15px;
              border: none;
              background-color: #f0f0f0;
              color: #333;
              cursor: pointer;
              font-size: 12px;
              transition: background-color 0.3s ease;
          }

          .button-group button.active {
              background-color: #106010;
              color: #fff;
          }

          .button-group button:hover {
              background-color: #0c890c;
              color: #fff;
          }


          input.success-input, select.success-input {
              border-color: green;
          }


          input:focus {
              border-color: #106010;
              outline: none;
          } 
          
        `}
      </style>
      <div className='container'>
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="button-group">
            <button type="button" className={selectedUser === "Administrator" ? "active": ""} onClick={() => handleUserSelection("Administrator")}>Administrator</button>
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

          <label htmlFor='emailOrStudentNumber'>Email</label>
          <input
            type="email"
            placeholder='Enter Email'
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
          {successMessage && <p className='success'>{successMessage}</p>} {/* Success message display */}
          {errors.server && <span className='error'>{errors.server}</span>} {/* Server error display */}
        </form>
      </div>
    </div>
  );
};

export default Registration;
