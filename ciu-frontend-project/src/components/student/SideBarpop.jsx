import React from 'react';
import { LayoutDashboard, FileText, ClipboardList, Calendar, HelpCircle, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import `useNavigate`
import { useSidebar } from './SidebarContext';
import Side from './SideBarpop.module.css';

export default function Sidebar() {
  const { activeItem, setActiveItem } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = async () => {
    console.log('Attempting to log out...');
    try {
      const response = await fetch('http://localhost:3000/students/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Use Bearer token
        },
      });

      if (response.ok) {
        // Clear the token from local storage
        localStorage.removeItem('token');
        console.log('Logout successful. Redirecting...');
        navigate('/'); // Redirect to the home/login page
      } else {
        const errorMessage = await response.json();
        console.error('Logout failed:', errorMessage.message || 'Unknown error');
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Something went wrong during logout. Please try again.');
    }
  };

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, text: 'Dashboard', path: '/student' },
    { icon: <FileText size={20} />, text: 'Do Exam', path: '/student/do-exam' },
    { icon: <ClipboardList size={20} />, text: 'Results', path: '/student/results' },
    // { icon: <Calendar size={20} />, text: 'Calendar', path: '/student/calendar' },
    { icon: <HelpCircle size={20} />, text: 'Support', path: '/student/support' },
    { icon: <LogOut size={20} />, text: 'Logout', path: '/', action: handleLogout }, // Attach logout action
  ];

  React.useEffect(() => {
    const currentItem = menuItems.find((item) => item.path === location.pathname);
    if (currentItem) {
      setActiveItem(currentItem.text);
    }
  }, [location, setActiveItem]);

  const handleItemClick = (item) => {
    if (item.action) {
      item.action(); // Call logout or other actions
    } else {
      setActiveItem(item.text);
    }
  };

  return (
    <aside className={Side['sidebar']}>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={activeItem === item.text ? Side['active'] : ''}
              onClick={() => handleItemClick(item)}
            >
              <Link to={item.path} className={Side['sidebar-link']}>
                <span className={Side['icon']}>{item.icon}</span>
                <span className={Side['menu-text']}>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
