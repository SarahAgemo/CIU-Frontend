import React, { useState } from 'react';
import './Registration.css';
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
    <div className={Register['container']}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <div className={Register["button-group"]}>
          <button type="button" className={selectedUser === Register["Administrator"] ? Register["active"] : Register[""]} onClick={() => handleUserSelection("Administrator")}>Administrator</button>
          <button type="button" className={selectedUser === Register["Lecturer"] ? Register["active"] : Register[""]} onClick={() => handleUserSelection("Lecturer")}>Lecturer</button>
        </div>

        <label htmlFor='firstName'>First Name</label>
        <input
          type="text"
          placeholder='Enter First Name'
          name='firstName'
          value={formData.firstName}
          onChange={handleInputChange}
        />
        {errors.firstName && <span className={Register['error']}>{errors.firstName}</span>}

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
        {errors.emailOrStudentNumber && <span className={Register['error']}>{errors.emailOrStudentNumber}</span>}

        <label htmlFor='password'>Password</label>
        <input
          type="password"
          placeholder='Enter Password'
          name='password'
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && <span className={Register['error']}>{errors.password}</span>}

        <button type='submit'>Register</button>
        {successMessage && <p className='success'>{successMessage}</p>} {/* Success message display */}
        {errors.server && <span className='error'>{errors.server}</span>} {/* Server error display */}
      </form>
    </div>
  );
};

export default Registration;
