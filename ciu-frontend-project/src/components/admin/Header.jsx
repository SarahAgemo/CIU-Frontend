import React from 'react';
import { Settings, Bell, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/CIU exam system logo.png" alt="Clarke University Logo" className="logo" />
      </div>
      <div className="user-controls">
        <Settings size={24} />
        <Bell size={24} />
        <div className="user-info">
          <User size={24} />
          <span className="user-name">Jackson N</span>
          <span className="user-role">Admin</span>
        </div>
      </div>
    </header>
  );
}
