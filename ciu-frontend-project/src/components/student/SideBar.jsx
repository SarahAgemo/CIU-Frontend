import React from 'react';
import { LayoutDashboard, FileText, ClipboardList, Calendar, HelpCircle, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, text: 'Dashboard', path: '/student', active: true  },
    { icon: <FileText size={20} />, text: 'Do Exam', path: '/student/do-exam'},
    { icon: <Calendar size={20} />, text: 'Calendar', path: '/student/calendar' },
    { icon: <HelpCircle size={20} />, text: 'Support', path: '/student/support' },
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

