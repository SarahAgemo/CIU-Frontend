import React from 'react';
import { LayoutDashboard, FileText, ClipboardList, Calendar, HelpCircle, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import Side from './SideBar.module.css'

export default function Sidebar() {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, text: 'Dashboard', path: '/student', active: true  },
    { icon: <FileText size={20} />, text: 'Do Exam', path: '/student/do-exam'},
    { icon: <ClipboardList size={20} />, text: 'Results', path: '/student/results' },
    { icon: <Calendar size={20} />, text: 'Calendar', path: '/student/calendar' },
    { icon: <HelpCircle size={20} />, text: 'Support', path: '/student/support' },
    { icon: <LogOut size={20} />, text: 'Logout', path: '/' }
  ];

  return (
    <aside className={Side["sidebar"]}>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className={item.active ? Side['active'] : ''}>
              <Link to={item.path} className={Side["sidebar-link"]}>
                <span className={Side["icon"]}>{item.icon}</span>
                <span className={Side["menu-text"]}>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

