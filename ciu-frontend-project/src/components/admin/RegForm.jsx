import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from './Header';
import Sidebar1 from './SideBar1';

const RegForm = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    program: '',
    registrationNo: '',
    password: '',
    role: '',
    dateTime: ''
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('User data submitted:', user);

    const userData = {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      program: user.program,
      registrationNo: user.registrationNo,
      password: user.password,
      role: user.role,
      dateTime: user.dateTime
    };

    try {
      const response = await fetch('http://localhost:3000/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const result = await response.json();
      console.log('User created successfully:', result);

      alert('User registered successfully!');

      // Navigate to the table page after successful registration
      navigate('/table');

      setUser({
        firstName: '',
        lastName: '',
        email: '',
        program: '',
        registrationNo: '',
        password: '',
        role: '',
        dateTime: ''
      });

    } catch (error) {
      console.error('Error creating user:', error);
      alert(`Error creating user: ${error.message}`);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          padding: '30px',
          borderRadius: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          width: '80%',
          maxWidth: '600px',
        }}
      >
        <h2 style={{ textAlign: 'center', color: '#065c4c' }}>User Registration</h2>
        <form onSubmit={handleSubmit}>
          {/* First Name and Last Name */}
          <div style={{ display: 'flex', marginBottom: '20px' }}>
            <div style={{ flex: '1', marginRight: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#106053', textTransform: 'uppercase' }}>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #106053',
                  fontSize: '16px',
                }}
              />
            </div>
            <div style={{ flex: '1' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#106053', textTransform: 'uppercase' }}>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #106053',
                  fontSize: '16px',
                }}
              />
            </div>
          </div>

          {/* Email and Program */}
          <div style={{ display: 'flex', marginBottom: '20px' }}>
            <div style={{ flex: '1', marginRight: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#106053', textTransform: 'uppercase' }}>Email:</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #106053',
                  fontSize: '16px',
                }}
              />
            </div>
            <div style={{ flex: '1' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#106053', textTransform: 'uppercase' }}>Program:</label>
              <input
                type="text"
                name="program"
                value={user.program}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #106053',
                  fontSize: '16px',
                }}
              />
            </div>
          </div>

          {/* Registration No and Password */}
          <div style={{ display: 'flex', marginBottom: '20px' }}>
            <div style={{ flex: '1', marginRight: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#106053', textTransform: 'uppercase' }}>Registration No:</label>
              <input
                type="text"
                name="registrationNo"
                value={user.registrationNo}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #106053',
                  fontSize: '16px',
                }}
              />
            </div>
            <div style={{ flex: '1' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#106053', textTransform: 'uppercase' }}>Password:</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #106053',
                  fontSize: '16px',
                }}
              />
            </div>
          </div>

          {/* Role and DateTime */}
          <div style={{ display: 'flex', marginBottom: '20px' }}>
            <div style={{ flex: '1', marginRight: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#106053', textTransform: 'uppercase' }}>Role:</label>
              <input
                type="text"
                name="role"
                value={user.role}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #106053',
                  fontSize: '16px',
                }}
              />
            </div>
            <div style={{ flex: '1' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#106053', textTransform: 'uppercase' }}>DateTime:</label>
              <input
                type="datetime-local"
                name="dateTime"
                value={user.dateTime}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #106053',
                  fontSize: '16px',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#065c4c',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#b7d1c8')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#065c4c')}
          >
            Register User
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegForm;
