import React from 'react';
import { Settings, Bell, User } from 'lucide-react';
import { useAuth } from './studUseAuth' // For use when integrating the backend with the frontend to ensure user's detaisl are displayed
import Head from './Header.module.css'

export default function Header() {
  const { user } = useAuth()

  return (
    <header className={Head["header"]}>
      <div className={Head["logo-container"]}>
        <img src="/CIU exam system logo.png" alt="Clarke University Logo" className={Head["logo"]} />
      </div>
      <div className={Head["user-controls"]}>
        <button className={Head["icon-button"]}>
          <Settings size={24} />
        </button>
        <button className={Head["icon-button"]}>
          <Bell size={24} />
        </button>
        <div className={Head["user-info"]}>
          <User size={24} />
          <div className={Head["user-details"]}>
            <span className={Head["user-name"]}>{user.name}</span>
            <span className={Head["user-role"]}>{user.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
}