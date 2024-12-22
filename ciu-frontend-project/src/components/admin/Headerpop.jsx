import { Bell, Menu } from 'lucide-react';
import Head from './Headerpop.module.css';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import UserDetailsPopup from './UserDetailsPopup';  

export default function Header({ toggleMobileMenu, isMobile, profilePhotoUrl }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState([]);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); 

  useEffect(() => {
    const socket = io('http://localhost:3000');  
    socket.emit('registerAdmin'); 

    socket.on('issueReported', (data) => {
      const notificationMessage = `New issue reported: ${data.regno} ${data.issueDescription}`;
      setNotifications((prevNotifications) => [...prevNotifications, notificationMessage]);
      setNewNotificationCount((prevCount) => prevCount + 1);
    });

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      socket.disconnect();
      clearInterval(timer);
    };
  }, []);

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setNewNotificationCount(0);
  };

  return (
    <header className={Head["header"]}>
      <div className={Head["logo-container"]}>
        {isMobile && (
          <button
            className={Head["hamburger-button"]}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <Menu className={Head["hamburger-icon"]} />
          </button>
        )}
        <img
          src="/CIU-exam-system-logo.png"
          alt="Logo"
          className={Head["logo"]}
        />
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

        <button
          className={`${Head["icon-button"]} ${Head["notification-button"]}`}
          aria-label="Notifications"
          onClick={handleNotificationClick}
        >
          <Bell className={Head["notification-icon"]} />
          {newNotificationCount > 0 && (
            <span className={Head["notification-indicator"]}>{newNotificationCount}</span>
          )}
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

      {isNotificationOpen && (
        <div className={Head["notification-list"]}>
          <ul>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li key={index}>
                  {notification}
                </li>
              ))
            ) : (
              <li>No new notifications</li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
