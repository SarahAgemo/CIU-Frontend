import React, { useEffect, useState } from 'react';
import { Settings, Bell, User } from 'lucide-react';
import axios from 'axios';

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
        const response = await axios.get('http://localhost:3000/faqs/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token for authorization
          },
        });

        // Use the correct structure of the response based on your provided data
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
            {error ? ( // Display error message if there is an error
              <span className="error-message">{error}</span>
            ) : (
              <>
                <span className="user-name">{userInfo.name || 'Guest'}</span>
                <span className="user-role">{userInfo.role || 'User'}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
