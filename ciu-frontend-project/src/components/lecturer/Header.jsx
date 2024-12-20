import React, { useEffect, useState } from 'react';
import { Settings, Bell, User } from 'lucide-react';
import { lecturerAuth } from './lecturerAuth' // For use when integrating the backend with the frontend to ensure user's details are displayed
import LecturerHeader from './Header.module.css'
import axios from 'axios';

export default function Header() {
    const [user, setUser] = useState({ name: '', role: '' }); // State to store lecturer profile
    const [error, setError] = useState(''); // State for any errors
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const fetchLecturerProfile = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token from localStorage
                const user = JSON.parse(localStorage.getItem('user'));
                if (!token || !user) {
                    setError('User is not authenticated.');
                    return;
                }

                // Make a request to the backend API to get the lecturer's profile
                const { id } = user;
                const response = await axios.get(`https://c-i-u-backend.onrender.com/lecturerReg/profile/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Assuming response contains profile data like { firstName, lastName, role }
                const { first_name, last_name, role } = response.data;
                setUser({ name: `${first_name} ${last_name}`, role });
            } catch (err) {
                console.error('Failed to fetch profile:', err);
                setError('Failed to load profile.');
            }
        };

        fetchLecturerProfile();
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(interval);
    }, []);
    return (
        <header className={LecturerHeader["header"]}>
            <div className={LecturerHeader["logo-container"]}>
                <img src="/CIU exam system logo.png" alt="Clarke University Logo" className={LecturerHeader["logo"]} />
            </div>
            <div className={LecturerHeader["user-controls"]}>
                <div id="timedate">
                    <a id="month">{currentTime.toLocaleString('default', { month: 'long' })}</a>{' '}
                    <a id="day">{currentTime.getDate()}</a>,{' '}
                    <a id="year">{currentTime.getFullYear()}</a>
                    <br />
                    <a id="hour">{currentTime.getHours().toString().padStart(2, '0')}</a> :
                    <a id="min">{currentTime.getMinutes().toString().padStart(2, '0')}</a> :
                    <a id="s">{currentTime.getSeconds().toString().padStart(2, '0')}</a>
                </div>
                <button className={LecturerHeader["icon-button"]}>
                    <Settings size={24} />
                </button>

                <button className={LecturerHeader["icon-button"]}>
                    <Bell size={24} />
                </button>
                <div className={LecturerHeader["user-info"]}>
                    <User size={24} />
                    <div className={LecturerHeader["user-details"]}>
                        {error ? (
                            <span className={LecturerHeader['error-message']}>{error}</span>
                        ) : (
                            <>
                                <span className={LecturerHeader['user-name']}>{user.name}</span>
                                <span className={LecturerHeader['user-role']}>{user.role}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}