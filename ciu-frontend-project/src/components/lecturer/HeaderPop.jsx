import React, { useEffect, useState } from 'react';
import { Bell, Menu } from "lucide-react";
import UserDetailsPopup from "./UserDetailsPopup";
import { Link } from 'react-router-dom';
import Head from './HeaderPop.module.css';

export default function Header({ toggleMobileMenu, isMobile }) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        console.log('Header component mounted');
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
            console.log('Timer cleared');
        };
    }, []);

    console.log('Current Time:', currentTime);

    return (
        <header className={Head["header"]}>
            <div className={Head["logo-container"]}>
                {isMobile && (
                    <button className={Head["hamburger-button"]} onClick={toggleMobileMenu} aria-label="Toggle menu">
                        <Menu className={Head["hamburger-icon"]} />
                    </button>
                )}
                <img src="/CIU-exam-system-logo.png" alt="System Logo" className={Head["logo"]} />
            </div>
            
            <div className={Head["header-icons"]}>
                <div className={Head["timedate"]}>
                <span className={Head["date"]}>
                    {currentTime.toLocaleString('default', { month: 'long' })}{' '}
                    {currentTime.getDate()},{' '}
                    {currentTime.getFullYear()}
                </span>
                <span className={Head["time"]}>
                    {((currentTime.getHours() % 12) || 12).toString().padStart(2, '0')}:
                    {currentTime.getMinutes().toString().padStart(2, '0')}:
                    {currentTime.getSeconds().toString().padStart(2, '0')}{' '}
                    {currentTime.getHours() >= 12 ? 'PM' : 'AM'}
                </span>
                </div>

                <div className={Head["header-icons"]}>
                    <Link to="/admin/notifications">
                        <button className={`${Head["icon-button"]} ${Head["notification-button"]}`} aria-label="Notifications">
                            <Bell className={Head["notification-icon"]} />
                            <span className={Head["notification-indicator"]} />
                        </button>
                    </Link>
                    <UserDetailsPopup>
                        <button className={Head["profile-button"]} aria-label="User profile">
                            <img
                                src="/IMG_9472.jpg"
                                alt="User profile"
                                className={Head["profile-image"]}
                            />
                        </button>
                    </UserDetailsPopup>
                </div>
            </div>
        </header>
    );
}