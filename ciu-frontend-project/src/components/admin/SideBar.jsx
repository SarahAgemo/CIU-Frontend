import React from 'react';
import { LayoutDashboard, Users, Lock, Key, Calendar, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, text: 'Dashboard', path: '/admin', active: true },
    { icon: <Users size={20} />, text: 'Manage Users', path: '/admin/manage-users' },
    { icon: <Lock size={20} />, text: 'Create FQR', path: '/admin/authentication' },
    { icon: <Calendar size={20} />, text: 'Calendar', path: '/admin/calendar' },
    { icon: <LogOut size={20} />, text: 'Logout', path: '/' }
  ];

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className={item.active ? 'active' : ''}>
              <Link to={item.path} className="sidebar-link">
                <span className="icon">{item.icon}</span>
                <span className="menu-text">{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
