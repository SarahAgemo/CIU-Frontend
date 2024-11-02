import React, { useState } from 'react';
import './TokenPasswordPage.css';

export default function TokenPasswordPage() {
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSave = () => {
        // Logic to handle save action
        alert("Token and Password saved successfully!");
    };

    return (
        <div className="page-container">
            <h2>Reset Your Password</h2>
            <form className="form-container">
                <label>
                    Token:
                    <input
                        type="text"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="Enter your token"
                    />
                </label>
                
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
