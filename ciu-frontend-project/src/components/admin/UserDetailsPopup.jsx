import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Settings, LogOut, X } from "lucide-react";
import User from "./UserDetailsPopup.module.css";

export default function UserDetailsPopup({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const popupRef = useRef(null);

  const togglePopup = () => {
    if (!isOpen) {
      fetchUserProfile(); // Fetch user profile when opening the popup
    }
    setIsOpen(!isOpen);
  };

  const closePopup = () => setIsOpen(false);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      if (!token || !user) {
        setError('Please log in.');
        return;
      }

      const { id } = user;
      const response = await axios.get(`https://c-i-u-backend.onrender.com/adminReg/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { first_name, last_name, role } = response.data;
      setUserData({
        name: `${first_name} ${last_name}`,
        role,
        profileImageSrc: "IMG_9472.jpg", // Placeholder or fetched image URL
        id
      });
    } catch (error) {
      setError('Failed to fetch user profile.');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={User["user-details-popup"]} ref={popupRef}>
      <div onClick={togglePopup}>
        {children}
      </div>
      {isOpen && (
        <div className={User["popup-content"]}>
          <button className={User["close-button"]} onClick={closePopup} aria-label="Close popup">
            <X className={User["close-icon"]} />
          </button>
          {error ? (
            <div className="error">{error}</div>
          ) : userData ? (
            <>
              <div className={User["user-info"]}>
                <img
                  src={userData.profileImageSrc}
                  alt="User profile"
                  className={User["user-avatar"]}
                />
                <h2 className={User["user-name"]}>{userData.name}</h2>
                <p className={User["user-role"]}>{userData.role}</p>
                <p className={User["user-id"]}>{userData.id}</p>
              </div>
              <div className={User["popup-actions"]}>
                <button className={User["action-button"]} onClick={() => console.log("Manage Account clicked")}>
                  <Settings className={User["action-icon"]} />
                  Manage Account
                </button>
                <button className={User["action-button"] + " " + User["logout-button"]} onClick={() => console.log("Logout clicked")}>
                  <LogOut className={User["action-icon"]} />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="error">Failed to load user data</div>
          )}
        </div>
      )}
    </div>
  );
}
