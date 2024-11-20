import React, { useState, useEffect, useRef } from 'react';
import { Settings, LogOut, X } from "lucide-react";
import axios from 'axios';
import User from "./UserDetailsPopup.module.css";

export default function UserDetailsPopup({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const popupRef = useRef(null);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const closePopup = () => setIsOpen(false);

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in.');
          return;
        }

        const response = await axios.get('http://localhost:3000/faqs/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { first_name, last_name, role, profileImageSrc, id } = response.data;
        setUserData({
          name: `${first_name} ${last_name}`,
          role: role || 'User',
          profileImageSrc: profileImageSrc || 'default-profile.png', // Default if no image
          id,
        });
      } catch (error) {
        setError('Failed to fetch user profile.');
        console.error('Error fetching user profile:', error);
      }
    };

    if (isOpen && !userData) {
      fetchUserData();
    }
  }, [isOpen]);

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
                
                <h2 className={User["user-name"]}>{userData.name}</h2>
                <p className={User["user-role"]}>{userData.role}</p>
                <p className={User["user-id"]}>{userData.id}</p>
              </div>
              <div className={User["popup-actions"]}>
                <button className={User["action-button"]} onClick={() => console.log("Manage Account clicked")}>
                  <Settings className={User["action-icon"]} />
                  Manage Account
                </button>
                <button className={`${User["action-button"]} ${User["logout-button"]}`} onClick={() => console.log("/")}>
                  <LogOut className={User["action-icon"]} />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="error">Loading user data...</div>
          )}
        </div>
      )}
    </div>
  );
}
