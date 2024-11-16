import { Bell, Menu } from "lucide-react";
import UserDetailsPopup from "./UserDetailsPopup";
import { Link } from 'react-router-dom';
import Head from './Headerpop.module.css';

export default function Header({ toggleMobileMenu, isMobile }) {
  return (
    <header className={Head["header"]}>
      <div className={Head["logo-container"]}>
        {isMobile && (
          <button className={Head["hamburger-button"]} onClick={toggleMobileMenu} aria-label="Toggle menu">
            <Menu className={Head["hamburger-icon"]} />
          </button>
        )}
        <img src="/CIU-exam-system-logo.png" alt="System Logo" className={Head["logo"]} />
      </div>
      <div className={Head["header-icons"]}>
        <Link to="/admin/notifications">
        <button className={Head["icon-button"] + " " + Head["notification-button"]} aria-label="Notifications">
          <Bell className={Head["notification-icon"]} />
          <span className={Head["notification-indicator"]} />
        </button>
        </Link>
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
    </header>
  )
}