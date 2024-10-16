import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ResetPasswordForm = () => {
    const [studentNumber, setStudentNumber] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [successMessage, setSuccessMessage] = useState(''); // New state for success message
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate studentNumber
        if (!studentNumber || typeof studentNumber !== 'string') {
            console.error("Invalid registration number");
            return; // Prevent submission if invalid
        }

        console.log('Student Number:', studentNumber); // Debugging line

        try {
            const response = await fetch('http://localhost:3000/students/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ registrationNo: studentNumber }), // Correct field name
            });

            if (response.ok) {
                console.log('Token requested successfully!');
                setSuccessMessage('Token has been sent to your email!'); // Set success message
                setTimeout(() => {
                    navigate('/request-token'); // Redirect to the request token page after a delay
                }, 2000); // Redirect after 2 seconds
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Network error:', error);
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
            color: '#8dc642',
            fontWeight: 'bold',
            marginLeft: '10px',
        },
        successMessage: {
            marginBottom: '20px', // Adjusted for spacing
            color: '#8dc642',
            fontWeight: 'bold',
            textAlign: 'center',
        },
    };

    return (
        <div style={styles.container}>
            {/* Logo */}
            <img src='/ciu-logo-2.png' alt="Logo" style={styles.logo} />
            <h1 style={styles.title}>CLERK INTERNATIONAL UNIVERSITY</h1>

            <div style={styles.formContainer}>
                <h2 style={styles.heading}>
                    ENTER YOUR STUDENT NUMBER AND A PASSWORD RESET TOKEN WILL BE SENT TO YOUR STUDENT'S EMAIL TO RESET YOUR PASSWORD
                </h2>
                
                {/* Display success message above the form */}
                {successMessage && <div style={styles.successMessage}>{successMessage}</div>}

                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend style={styles.legend}>Student Number</legend>
                        <input
                            type="text"
                            placeholder="Eg. 0123456789"
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

export default ResetPasswordForm;
