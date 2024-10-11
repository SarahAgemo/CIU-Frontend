import React from 'react';
import { LayoutDashboard, Users, Lock, Key, Calendar, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sidebar1() {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, text: 'Dashboard', path: '/admin/'},
    { icon: <Users size={20} />, text: 'Manage Users', path: '/admin/manage-users', active: true  },
    { icon: <Lock size={20} />, text: 'Authentication', path: '/admin/authentication' },
    { icon: <Key size={20} />, text: 'Password Reset', path: '/admin/password-reset' },
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

