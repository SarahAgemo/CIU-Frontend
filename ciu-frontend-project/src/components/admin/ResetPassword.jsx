import React, { useState } from 'react';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset email sent to:', email);

  };

  const styles = {
    container: {
      backgroundImage: 'url("/exam.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    formContainer: {
      padding: '20px',
      borderRadius: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    input: {
      width: '90%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      marginBottom: '10px',
    },
    button: {
      width: '70%',
      padding: '10px',
      backgroundColor: '#065c4c',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginLeft: '35px',
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Email Address</legend>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </fieldset>
          <button type="submit" style={styles.button}>
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
