import React from 'react';
import { LayoutDashboard, Users, Calendar, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminSide from './SideBar.module.css'

export default function Sidebar() {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, text: 'Dashboard', path: '/dashboard', active: true },
    { icon: <Users size={20} />, text: 'Manage Users', path: '/manage' },
    { icon: <Lock size={20} />, text: 'Create FQR', path: '/admin/authentication' },
    { icon: <Calendar size={20} />, text: 'Calendar', path: '/admin/calendar' },
    { icon: <LogOut size={20} />, text: 'Logout', path: '/' }
  ];

  return (
    <aside className={AdminSide["sidebar"]}>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className={item.active ? AdminSide['active'] : ''}>
              <Link to={item.path} className={AdminSide["sidebar-link"]}>
                <span className={AdminSide["menu-text"]}>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
