import React, { useState } from 'react';

const RequestTokenForm = () => {
  const [formData, setFormData] = useState({
    token: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset data:', formData);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      position: 'relative',
      fontFamily: 'Exo',
    },
    logo: {
      width: '130px',
      marginBottom: '10px',
    },
    title: {
      fontSize: '1.8rem',
      marginBottom: '15px',
      marginTop: '15px',
      color: '#106053',
      fontFamily: "'Roboto', sans-serif",
      transition: 'color 0.3s ease',
    },
    formContainer: {
      padding: '30px 40px',
      borderRadius: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      width: '100%',
    },
    heading: {
      fontSize: '13px',
      marginBottom: '20px',
      textAlign: 'center',
      color: '#106053',
    },
    input: {
      width: '80%',
      padding: '12px',
      border: '2px solid #065c4c',
      marginBottom: '20px',
      marginLeft: '25px',
      fontSize: '1rem',
      boxSizing: 'border-box',
      textAlign: 'center',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#106053',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.2rem',
      transition: 'background-color 0.3s ease, color 0.3s ease', 
      marginTop: '20px',
    },
    buttonHover: {
      backgroundColor: '#b7d1c8',
      color: '#106053',
    },
    legend: {
      fontSize: '1rem',
      marginBottom: '8px',
      color: ' #8dc642',
      fontWeight: 'bold',
      marginLeft: '10px',
    },
  };

  return (
    <div style={styles.container}>
      {/* Logo */}
      <img src='/ciu-logo-2.png' alt="Logo" style={styles.logo} />
      <h1 style={styles.title}>CLERK INTERNATIONAL UNIVERSITY</h1>

      <div style={styles.formContainer}>
        <h2 style={styles.heading}>RESET YOUR PASSWORD USING THE TOKEN SENT TO YOUR EMAIL</h2>
        <form onSubmit={handleSubmit}>
          {/* Enter Token */}
          <fieldset>
            <legend style={styles.legend}>Enter Token</legend>
            <input
              type="text"
              name="token"
              placeholder="Enter your token"
              value={formData.token}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </fieldset>

          {/* Enter New Password */}
          <fieldset>
            <legend style={styles.legend}>Enter New Password</legend>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </fieldset>

          {/* Confirm Password */}
          <fieldset>
            <legend style={styles.legend}>Confirm Password</legend>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </fieldset>

          {/* Reset Password Button */}
          <button
            type="submit"
            style={{
              ...styles.button,
              backgroundColor: isHovered ? styles.buttonHover.backgroundColor : styles.button.backgroundColor,
              color: isHovered ? styles.buttonHover.color : styles.button.color,
            }}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestTokenForm;
