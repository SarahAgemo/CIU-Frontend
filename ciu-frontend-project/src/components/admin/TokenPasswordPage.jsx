import React, { useState } from 'react';
import './TokenPasswordPage.css';

export default function TokenPasswordPage() {
    const [setupToken, setSetupToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSave = async () => {
        // Validate that passwords match
        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            setSuccessMessage('');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/lecturerReg/set-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    setupToken,
                    newPassword,
                    confirmPassword,
                }),
            });

            if (response.ok) {
                setSuccessMessage("Token and password saved successfully!");
                setErrorMessage('');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Failed to save password");
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage("An error occurred while saving the password.");
            setSuccessMessage('');
        }
    };

    return (
        <div className="page-container">
            <h2>Reset Your Password</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form className="form-container" onSubmit={(e) => e.preventDefault()}>
                <label>
                    Setup Token:
                    <input
                        type="text"
                        value={setupToken}
                        onChange={(e) => setSetupToken(e.target.value)}
                        placeholder="Enter your setup token"
                    />
                </label>
                
                <label>
                    New Password:
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                    />
                </label>
                
                <label>
                    Confirm Password:
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                    />
                </label>
                
                <button type="button" onClick={handleSave} className="save-button">
                    Save
                </button>
            </form>
        </div>
    );
}
