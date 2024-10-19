import React, { useEffect, useState } from 'react';
import { Settings, Bell, User } from 'lucide-react';
import axios from 'axios';
import Heads from './Header1.module.css';

export default function Header() {
  const [userInfo, setUserInfo] = useState({ name: '', role: '' });
  const [tokenError, setTokenError] = useState(false); // New state for token error

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('No token found');
          setTokenError(true);
          return;
        }

        const response = await axios.get('http://localhost:3000/faqs/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token for authorization
          },
        });

        // Check if the response structure is as expected
        const { message, user } = response.data;

        if (message && user) {
          const userName = message.split(', ')[1]; // Adjust this according to your actual response
          const role = user.role || 'Unknown'; // Fallback in case role is not provided

          setUserInfo({ name: userName, role });
          setTokenError(false); // Clear any previous token error
        } else {
          console.error('Unexpected response structure:', response.data);
          setTokenError(true); // Set token error if the structure is unexpected
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setTokenError(true); // Handle any errors during fetch
      }
    };

    fetchUserProfile(); // Call the function to fetch user data
  }, []);

  return (
    <header className={Heads["header"]}>
      <div className={Heads["logo-container"]}>
        <img src="/CIU exam system logo.png" alt="Clarke University Logo" className={Heads["logo"]} />
      </div>
      <div className={Heads["user-controls"]}>
        <button className={Heads["icon-button"]}>
          <Settings size={24} />
        </button>
        <button className={Heads["icon-button"]}>
          <Bell size={24} />
        </button>
        <div className={Heads["user-info"]}>
          <User size={24} />
          <div className={Heads["user-details"]}>
            {/* Check for token error and show message if token is missing */}
            {tokenError ? (
              <span className={Heads["user-name"]}>No token found. Please log in.</span>
            ) : (
              <>
                <span className={Heads["user-name"]}>{userInfo.name}</span>
                <span className={Heads["user-role"]}>{userInfo.role}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
