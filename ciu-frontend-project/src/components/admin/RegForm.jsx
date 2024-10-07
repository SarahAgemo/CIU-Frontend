import React, { useState } from 'react';

const UserForm = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    program: '',
    registrationNo: '',
    password: '',
    role: '',
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
        backgroundImage: 'url("/exam.jpg")', // Light teal background
      }}
    >
      <div
        style={{
          padding: '30px',
          borderRadius: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)', // Semi-transparent white
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', // Deeper shadow
          width: '80%', // Set a max width for the form
          maxWidth: '600px', // Adjust this as needed
        }}
      >
        <h2 style={{ textAlign: 'center', color: '#065c4c' }}>User Registration</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
            <div style={{ flex: '1', marginRight: '35px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Name:</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '16px',
                }}
              />
            </div>
            <div style={{ flex: '1', marginRight: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Email:</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '16px',
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
            <div style={{ flex: '1', marginRight: '35px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Program:</label>
              <input
                type="text"
                name="program"
                value={user.program}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '16px',
                }}
              />
            </div>
            <div style={{ flex: '1', marginRight: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Registration No:</label>
              <input
                type="text"
                name="registrationNo"
                value={user.registrationNo}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '16px',
                }}
              />
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Password:</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              style={{
                width: '97%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '16px',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Role:</label>
            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '16px',
              }}
            >
              <option value="student">Student</option>
              
            </select>
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#065c4c',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#048f87')} // Lighten on hover
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
