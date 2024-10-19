import React from 'react';
import { Settings, Bell, User } from 'lucide-react';
import { useAuth } from './adminUseAuth' // For use when integrating the backend with the frontend to ensure user's detaisl are displayed
import Heads from './Header1.module.css'

export default function Header() {
  return (
    <header className={Heads["header"]}>
      <div className={Heads["logo-container"]}>
        <img src="/CIU exam system logo.png" alt="Clarke University Logo" className={Heads["logo"]} />
      </div>
      <div className={Heads["user-controls"]}>
        <button className={Heads["icon-button"]}>
          <Settings size={24} />
        </button>
        <button className={Heads["icon-button"]}>
          <Bell size={24} />
        </button>
        <div className={Heads["user-info"]}>
          <User size={24} />
          <div className={Heads["user-details"]}>
            <span className={Heads["user-name"]}>{user.name}</span>
            <span className={Heads["user-role"]}>{user.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
}