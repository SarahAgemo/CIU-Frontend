import React, { useEffect, useState } from 'react';
import { Bell, Menu } from "lucide-react";
import UserDetailsPopup from "./UserDetailsPop";
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
            
            <div id="timedate" style={{
        marginRight: '0%',
        marginLeft: 'auto' // Adjust this value as needed
    }}>
                <a id="month">{currentTime.toLocaleString('default', { month: 'long' })}</a>{' '}
    <a id="day">{currentTime.getDate()}</a>,{' '}
    <a id="year">{currentTime.getFullYear()}</a>
    <br />
    <a id="hour">
        {((currentTime.getHours() % 12) || 12).toString().padStart(2, '0')}
    </a> :
    <a id="min">{currentTime.getMinutes().toString().padStart(2, '0')}</a> :
    <a id="s">{currentTime.getSeconds().toString().padStart(2, '0')}</a>{' '}
    <a id="ampm">{currentTime.getHours() >= 12 ? 'PM' : 'AM'}</a>
            </div>

            <div className={Head["header-icons"]}>
                <button className={Head["icon-button"] + " " + Head["notification-button"]} aria-label="Notifications">
                    <Bell className={Head["notification-icon"]} />
                    <span className={Head["notification-indicator"]} />
                </button>
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
        </header>
    );
}