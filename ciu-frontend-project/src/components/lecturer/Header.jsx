import React from 'react';
import { Settings, Bell, User } from 'lucide-react';

export default function Header() {
    return (
        <header className="header">
            <div className="logo-container">
                <img src="/CIU exam system logo.png" alt="Clarke University Logo" className="logo" />
            </div>
            <div className="user-controls">
                <button className="icon-button">
                    <Settings size={24} />
                </button>
                <button className="icon-button">
                    <Bell size={24} />
                </button>
                <div className="user-info">
                    <User size={24} />
                    <div className="user-details">
                        <span className="user-name">Jackson S</span>
                        <span className="user-role">Lecturer</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
