import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const ResetAdminForm = () => {
  const [studentNumber, setStudentNumber] = useState('');
  const [isHovered, setIsHovered] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(''); // To handle any error messages
  const [successMessage, setSuccessMessage] = useState(''); // To display success message
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages
    setSuccessMessage(''); // Clear previous success messages

    try {
      // Make POST request to backend API
      const response = await axios.post('http://localhost:3000/adminauth/forgot-password', {
        email: studentNumber,
      });
      
      // Handle successful response
      console.log('Token requested successfully:', response.data);
      setSuccessMessage('Token sent to your Admin email.');

      // Redirect to '/request-token' after successful response
      setTimeout(() => {
        navigate('/RequestAdminToken'); // Redirects after 2 seconds
      }, 2000); // Delay to show success message before redirecting

    } catch (error) {
      console.error('Error requesting token:', error);
      setErrorMessage('Failed to request token. Please check your Admin email and try again.');
    }
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
      fontFamily: 'Exo',
      fontSize: '1.8rem',
      marginBottom: '15px',
      marginTop: '15px',
      color: '#106053',
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
      fontFamily: "'Roboto', sans-serif",
      fontSize: '13px',
      marginBottom: '20px',
      textAlign: 'center',
      color: '#106053',
    },
    input: {
      width: '80%',
      padding: '12px',
      borderRadius: '5px',
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
      fontFamily: "'Roboto', sans-serif",
      fontSize: '1rem',
      marginBottom: '8px',
      color: ' #8dc642',
      fontWeight: 'bold',
      marginLeft: '10px',
    },
    errorMessage: {
      color: 'red',
      textAlign: 'center',
      marginBottom: '10px',
    },
    successMessage: {
      color: 'green',
      textAlign: 'center',
      marginBottom: '10px',
    }
  };

  return (
    <div style={styles.container}>
      {/* <img src='/ciu-logo-2.png' alt="Logo" style={styles.logo} /> */}
      <h1 style={styles.title}> RESET PASSWORD</h1> 

      <div style={styles.formContainer}>
        <h2 style={styles.heading}>ENTER THE REGISTERED EMAIL AND A RESET TOKEN WILL BE SENT TO YOUR EMAIL TO RESET YOUR PASSWORD</h2>
        
        {/* Display error message if it exists */}
        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
        
        {/* Display success message if it exists */}
        {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
        
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend style={styles.legend}>Email</legend>
            <input
              type="text"
              placeholder="Eg. example@gmail.com"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
              required
              style={styles.input}
            />
          </fieldset>
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
        Request Token
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetAdminForm;

