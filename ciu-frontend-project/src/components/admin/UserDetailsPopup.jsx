import { useState, useEffect, useRef } from 'react'
import { Settings, LogOut, X } from "lucide-react"
import User from "./UserDetailsPopup.module.css"

// Function to get logged-in user data (simulating immediate access to user data)
const getLoggedInUserData = () => {
  // In a real application, this data might come from a global state or local storage
  return {
    profileImageSrc: "IMG_9472.jpg",
    name: "Val Kiguli",
    role: "Admin",
    id: "AD12345"
  };
};

export default function UserDetailsPopup({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [userData, setUserData] = useState(null)
  const popupRef = useRef(null)

  const togglePopup = () => {
    if (!isOpen && !userData) {
      const loggedInUserData = getLoggedInUserData();
      setUserData(loggedInUserData);
    }
    setIsOpen(!isOpen);
  }

  const closePopup = () => setIsOpen(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className={User["user-details-popup"]} ref={popupRef}>
      <div onClick={togglePopup}>
        {children}
      </div>      
      {isOpen && (
        <div className={User["popup-content"]} >
          <button className={User["close-button"]}  onClick={closePopup} aria-label="Close popup">
            <X className={User["close-icon"]}  />
          </button>
          {userData ? (
            <>
              <div className={User["user-info"]} >
                <img 
                  src={userData.profileImageSrc}
                  alt="User profile" 
                  className={User["user-avatar"]} 
                />
                <h2 className={User["user-name"]} >{userData.name}</h2>
                <p className={User["user-role"]} >{userData.role}</p>
                <p className={User["user-id"]} >{userData.id}</p>
              </div>
              <div className={User["popup-actions"]} >
                <button className={User["action-button"]}  onClick={() => console.log("Manage Account clicked")}>
                  <Settings className={User["action-icon"]}  />
                  Manage Account
                </button>
                <button className={User["action-button"] + " " + User["logout-button"]}  onClick={() => console.log("Logout clicked")}>
                  <LogOut className={User["action-icon"]}  />
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
  )
}

