// src/components/AdminDashboard.js

import React, { useEffect, useState } from 'react';
import { initiateSocket, disconnectSocket, subscribeToNotifications } from '../services/socketService';

const AdminDashboard = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    initiateSocket();

    subscribeToNotifications((err, data) => {
      if (err) return;
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Notifications</h2>
      {notifications.map((notif, index) => (
        <div key={index}>
          <p><strong>{notif.message}</strong></p>
          {notif.issue && (
            <div>
              <p><strong>Registration No:</strong> {notif.issue.registrationNo}</p>
              <p><strong>Subject:</strong> {notif.issue.subject}</p>
              <p><strong>Description:</strong> {notif.issue.description}</p>
            </div>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
