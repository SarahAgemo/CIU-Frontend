import React, { useEffect, useRef, useState } from 'react';
import { Settings, Bell, User } from 'lucide-react';
import axios from 'axios';
import { io } from 'socket.io-client';

export default function Header() {
  const [userInfo, setUserInfo] = useState({ name: '', role: '' });
  const [error, setError] = useState('');
  const [notifications, setNotifications] = useState([]);
  const socketRef = useRef(null);  // Ref to persist the socket connection

  useEffect(() => {
    // Initialize socket connection only if it doesn't exist yet
    if (!socketRef.current) {
      const newSocket = io('https://c-i-u-backend.onrender.com');
      socketRef.current = newSocket;

      // Register admin once connected
      newSocket.emit('registerAdmin');

      // Listen for 'issueReported' event and update notifications
      newSocket.on('issueReported', (data) => {
        console.log('Notification received:', data);
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          `${data.regno}: ${data.issueDescription}`,  // Display regno and issueDescription in notifications
        ]);
      });

      // Cleanup on component unmount
      return () => {
        newSocket.disconnect();
        socketRef.current = null;
      };
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user')); // Correctly parse user object

      console.log('Token:', token);
      console.log('User:', user); // Debugging log

      if (!token || !user) {
        console.error('Token or user is missing');
        setError('Please log in.');
        return;
      }

      const { id } = user; // Get user ID
      console.log(`Fetching profile for user ID: ${id}`);

      const response = await axios.get(`https://c-i-u-backend.onrender.com/adminReg/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Profile response:', response.data); // Debugging log
      const { first_name, last_name, role } = response.data;
      setUserInfo({ name: `${first_name} ${last_name}`, role });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Failed to fetch user profile.');
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

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
          {notifications.length > 0 && (
            <span className="notification-badge">{notifications.length}</span>
          )}
        </button>
        <button className="icon-button">
          <User size={24} />
        </button>
        <div className="user-info">
          {error ? (
            <span className="error-message">{error}</span>
          ) : (
            <>
              <p>{userInfo.name}</p>
              <span>{userInfo.role}</span>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

