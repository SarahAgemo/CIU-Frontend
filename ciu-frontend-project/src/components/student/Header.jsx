import React, { useEffect, useState } from 'react';
import { Settings, Bell, User } from 'lucide-react';
import axios from 'axios';
import Head from './Header.module.css'; // Assuming you have CSS modules for styling

export default function Header() {
  const [userInfo, setUserInfo] = useState({ name: '', role: '' }); // Default values
  const [error, setError] = useState(''); // To handle any errors

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        
        const token = localStorage.getItem('token'); 

        if (!token) {
          console.error('No token found');
          setError('Please log in.'); 
          return; 
        }

        
        const response = await axios.get('http://localhost:3000/faqs/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token for authorization
          },
        });

        
        const { first_name, last_name, role } = response.data;

       
        setUserInfo({ name: `${first_name} ${last_name}`, role: role || 'User' }); 
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to fetch user profile.'); 
      }
    };

    fetchUserProfile(); 
  }, []); 

  return (
    <header className={Head["header"]}>
      <div className={Head["logo-container"]}>
        <img src="/CIU exam system logo.png" alt="Clarke University Logo" className={Head["logo"]} />
      </div>
      <div className={Head["user-controls"]}>
        <button className={Head["icon-button"]}>
          <Settings size={24} />
        </button>
        <button className={Head["icon-button"]}>
          <Bell size={24} />
        </button>
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
