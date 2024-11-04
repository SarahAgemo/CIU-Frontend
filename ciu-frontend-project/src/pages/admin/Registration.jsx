import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState("Select User");
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailOrStudentNumber: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Styles object
  const styles = {
    // container: {
    //   maxWidth: '700px',
    //   margin: '40px auto',
    //   padding: '20px',
    //   backgroundColor: '#ffffff',
    //   borderRadius: '10px',
    //   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    //   fontFamily: 'Arial, sans-serif',
    // },
    heading: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '20px',
      fontSize: '24px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
       marginLeft: '450px',
       width: '30%'
    },
    buttonGroup: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
    },
    button: {
      flex: 1,
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      backgroundColor: '#106053',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.3s ease',
    },
    activeButton: {
      backgroundColor: 'whitesmoke',
      color: '#106053',
      border: '1px solid #106053',
    },
    label: {
      fontSize: '14px',
      color: '#333',
      marginBottom: '5px',
    },
    input: {
      width: '100%',
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '14px',
      boxSizing: 'border-box',
    },
    error: {
      color: '#dc3545',
      fontSize: '12px',
      marginTop: '5px',
    },
    success: {
      color: '#28a745',
      textAlign: 'center',
      padding: '10px',
      backgroundColor: '#d4edda',
      borderRadius: '5px',
      marginTop: '10px',
    },
    registerButton: {
      backgroundColor: '#106053',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      marginTop: '10px',
      
    },
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setFormData({
      ...formData,
      emailOrStudentNumber: '',
      password: ''
    });
    setErrors({});
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
      errors.emailOrStudentNumber = 'Email is required';
    } else if (!/^[a-zA-Z]+@ciu\.ac\.ug$/.test(formData.emailOrStudentNumber)) {
      errors.emailOrStudentNumber = 'Email must be in the format: firstname@ciu.ac.ug';
    }

    if (selectedUser === "Administrator" && !formData.password.trim()) {
      errors.password = 'Password is required';
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

        if (selectedUser === "Lecturer") {
          endpoint = 'http://localhost:3000/lecturerReg';
          payload = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.emailOrStudentNumber,
            role: "lecturer"
          };
        } else if (selectedUser === "Administrator") {
          endpoint = 'http://localhost:3000/adminReg';
          payload = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.emailOrStudentNumber,
            role: "administrator",
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
        
        const responseData = await response.json();

        if (response.ok) {
          setSuccessMessage(`${selectedUser} successfully registered!`);
          setFormData({ firstName: '', lastName: '', emailOrStudentNumber: '', password: '' });
          setErrors({});

          if (selectedUser === "Administrator") {
            navigate('/adminuser');
          } else if (selectedUser === "Lecturer") {
            navigate('/token-password-reset');
          }
        } else {
          setErrors({ 
            server: responseData.message || 'Registration failed. Please try again.' 
          });
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
    <div style={styles.container}>
      

      <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Register</h2>
        <div style={styles.buttonGroup}>
          <button 
            type="button" 
            style={{
              ...styles.button,
              ...(selectedUser === "Administrator" ? styles.activeButton : {})
            }}
            onClick={() => handleUserSelection("Administrator")}
          >
            Administrator
          </button>
          <button 
            type="button" 
            style={{
              ...styles.button,
              ...(selectedUser === "Lecturer" ? styles.activeButton : {})
            }}
            onClick={() => handleUserSelection("Lecturer")}
          >
            Lecturer
          </button>
        </div>

        <label style={styles.label}>First Name</label>
        <input
          type="text"
          placeholder='Enter First Name'
          name='firstName'
          value={formData.firstName}
          onChange={handleInputChange}
          style={styles.input}
        />
        {errors.firstName && <span style={styles.error}>{errors.firstName}</span>}

        <label style={styles.label}>Last Name</label>
        <input
          type="text"
          placeholder='Enter Last Name'
          name='lastName'
          value={formData.lastName}
          onChange={handleInputChange}
          style={styles.input}
        />
        {errors.lastName && <span style={styles.error}>{errors.lastName}</span>}

        <label style={styles.label}>Email (@ciu.ac.ug)</label>
        <input
          type="email"
          placeholder='Enter Email (firstname@ciu.ac.ug)'
          name='emailOrStudentNumber'
          value={formData.emailOrStudentNumber}
          onChange={handleInputChange}
          style={styles.input}
        />
        {errors.emailOrStudentNumber && <span style={styles.error}>{errors.emailOrStudentNumber}</span>}

        {selectedUser === "Administrator" && (
          <>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder='Enter Password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              style={styles.input}
            />
            {errors.password && <span style={styles.error}>{errors.password}</span>}
          </>
        )}

        <button 
          type="submit" 
          style={styles.registerButton}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#08362f'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#08362f'}
        >
          Register
        </button>
        
        {successMessage && <p style={styles.success}>{successMessage}</p>}
        {errors.server && <span style={styles.error}>{errors.server}</span>}
      </form>
    </div>
  );
};

export default Registration;