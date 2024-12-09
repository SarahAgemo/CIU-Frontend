import React, { useEffect, useState } from 'react';
import { Settings, Bell, User } from 'lucide-react';
import axios from 'axios';
import Head from './Header.module.css'; // Assuming you have CSS modules for styling
import { Link } from 'react-router-dom';

export default function Header() {
  const [userInfo, setUserInfo] = useState({ name: '', role: '' }); // Default values
  const [error, setError] = useState(''); // To handle any errors

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Retrieve the token from local storage
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('No token found');
          setError('Please log in.'); // Set error message if no token is found
          return; // Exit if there is no token
        }

        // Fetch the user profile
        const response = await axios.get('https://c-i-u-backend.onrender.com/faqs/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token for authorization
          },
        });

        // Extract user information from the response
        const { first_name, last_name, role } = response.data;

        // Update state with user information
        setUserInfo({ name: `${first_name} ${last_name}`, role: role || 'User' }); // Set full name and role
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to fetch user profile.'); // Set error message if fetching fails
      }
    };

    fetchUserProfile(); // Call the function to fetch user data
  }, []); // Empty dependency array to run only on mount

  return (
    <header className={Head["header"]}>
      <div className={Head["logo-container"]}>
        <img src="/CIU exam system logo.png" alt="Clarke University Logo" className={Head["logo"]} />
      </div>
      <div className={Head["user-controls"]}>
        <button className={Head["icon-button"]}>
          <Settings size={24} />
        </button>
        <Link to={'/notifications'} aria-label="Notifications">
          <button className={`${Head["icon-button"]} ${Head["notification-button"]}`} aria-label="Notifications">
            <Bell className={Head["notification-icon"]} />
            <span className={Head["notification-indicator"]} />
          </button>
        </Link>
        <div className={Head["user-info"]}>
          <User size={24} />
          <div className={Head["user-details"]}>
            {error ? ( // Display error message if there is an error
              <span className="error-message">{error}</span>
            ) : (
              <>
                <span className={Head["user-name"]}>{userInfo.name || 'Guest'}</span>
                <span className={Head["user-role"]}>{userInfo.role || 'User'}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
