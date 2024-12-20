import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TokenPasswordPage.css'; // Import your CSS file
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function TokenPasswordPage() {
    const navigate = useNavigate();
    const [setupToken, setSetupToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSave = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            setSuccessMessage('');
            return;
        }

        try {
            const response = await fetch('https://c-i-u-backend.onrender.com/adminReg/set-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: setupToken,         // Match backend field
                    password: newPassword,     // Match backend field
                    confirmPassword,           // Match backend field
                }),
            });

            if (response.ok) {
                setSuccessMessage("Password has been set successfully!");
                setErrorMessage('');
                setTimeout(() => {
                    navigate('/Adminlogin'); // Redirect to login page
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
            <h2 className="token-password-heading">Set Your Password</h2>

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
                    <div className="token-password-input-wrapper">
                        <input
                            className="token-password-input"
                            type={showNewPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                        />
                        <button
                            type="button"
                            className="token-password-eye-icon"
                            onClick={() => setShowNewPassword((prev) => !prev)}
                        >
                            {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>
                </div>

                <div className="token-password-form-group">
                    <label className="token-password-label">Confirm Password:</label>
                    <div className="token-password-input-wrapper">
                        <input
                            className="token-password-input"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            required
                        />
                        <button
                            type="button"
                            className="token-password-eye-icon"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                        >
                            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>
                </div>

                <button type="submit" className="token-password-save-button">Save</button>
            </form>
        </div>
    );
}
