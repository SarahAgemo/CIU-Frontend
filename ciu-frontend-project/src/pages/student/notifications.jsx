// src/components/Notifications.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { subscribeToNotifications } from '../../components/student/socketService'; // Import the socket service
import styles from './Notifications.module.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:3000/notifications/${userId}`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Failed to fetch notifications.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

    // Subscribe to notifications
    const handleNewNotification = (notification) => {
      setNotifications((prevNotifications) => [notification, ...prevNotifications]); // Add new notification to the top
    };

    subscribeToNotifications(handleNewNotification);

    return () => {
      // Cleanup on unmount
      disconnectSocket(); // Make sure to disconnect socket if needed
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.notificationsContainer}>
      <h1>Your Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <ul className={styles.notificationsList}>
          {notifications.map((notification) => (
            <li key={notification.id} className={styles.notificationItem}>
              <h3>{notification.title}</h3>
              <p>{notification.message}</p>
              <p>{new Date(notification.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
