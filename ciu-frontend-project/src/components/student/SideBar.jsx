import React from 'react';
import { LayoutDashboard, FileText, ClipboardList, Calendar, HelpCircle, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // Changed useHistory to useNavigate
import Side from './SideBar.module.css';

export default function Sidebar() {
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleLogout = async () => {
    console.log('Before logout, token:', localStorage.getItem('token'));
    try {
      const response = await fetch('http://localhost:3000/students/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the JWT if necessary
        },
      });

      if (response.ok) {
        // Clear the token from local storage
        localStorage.removeItem('token');
        console.log('Logout successful. Token cleared:', localStorage.getItem('token'));
        // Redirect to the login page
        navigate('/'); // Adjust to your login route
      } else {
        const errorMessage = await response.text();
        console.error('Logout failed. Response:', errorMessage);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, text: 'Dashboard', path: '/student', active: true },
    { icon: <FileText size={20} />, text: 'Do Exam', path: '/student/do-exam' },
    { icon: <ClipboardList size={20} />, text: 'My Results', path: '/results' },
    { icon: <Calendar size={20} />, text: 'Calendar', path: '/student/calendar' },
    { icon: <HelpCircle size={20} />, text: 'Support', path: '/student/support' },
    { icon: <LogOut size={20} />, text: 'Logout', onClick: handleLogout },
  ];

  return (
    <aside className={Side["sidebar"]}>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className={item.active ? Side['active'] : ''}>
              {item.onClick ? (
                <button className={Side["sidebar-link"]} onClick={item.onClick}>
                  <span className={Side["icon"]}>{item.icon}</span>
                  <span className={Side["menu-text"]}>{item.text}</span>
                </button>
              ) : (
                <Link to={item.path} className={Side["sidebar-link"]}>
                  <span className={Side["icon"]}>{item.icon}</span>
                  <span className={Side["menu-text"]}>{item.text}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
