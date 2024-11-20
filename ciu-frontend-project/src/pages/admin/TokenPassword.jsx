import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './TokenPasswordPage.css';

export default function TokenPasswordPage() {
    const navigate = useNavigate();
    const [setupToken, setSetupToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSave = async (e) => {
        e.preventDefault();
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
                setTimeout(() => {
                    navigate('/lecturerlogin');
                }, 1000);
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
        <div className="token-password-container">
            <h2 className="token-password-heading">Reset Your Password</h2>
            
            {errorMessage && <div className="token-password-error-message">{errorMessage}</div>}
            {successMessage && <div className="token-password-success-message">{successMessage}</div>}
            
            <form className="token-password-form" onSubmit={handleSave}>
                <div className="token-password-form-group">
                    <label className="token-password-label">Setup Token:</label>
                    <input
                        className="token-password-input"
                        type="text"
                        value={setupToken}
                        onChange={(e) => setSetupToken(e.target.value)}
                        placeholder="Enter your setup token"
                        required
                    />
                </div>

                <div className="token-password-form-group">
                    <label className="token-password-label">New Password:</label>
                    <input
                        className="token-password-input"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        required
                    />
                </div>

                <div className="token-password-form-group">
                    <label className="token-password-label">Confirm Password:</label>
                    <input
                        className="token-password-input"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        required
                    />
                </div>

                <button type="submit" className="token-password-save-button">Save</button>
            </form>
        </div>
    );
}