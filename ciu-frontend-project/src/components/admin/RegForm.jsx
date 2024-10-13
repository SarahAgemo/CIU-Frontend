import React, { useState } from 'react';

const UserForm = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User data submitted:', user);
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

export default UserForm;
