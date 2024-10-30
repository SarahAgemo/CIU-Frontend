import React from 'react';
import { LayoutDashboard, Users, Calendar, LogOut, Lock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebar } from './SidebarContext';
import Side from './SideBarpop.module.css'


export default function Sidebar() {
  const { activeItem, setActiveItem } = useSidebar();
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, text: 'Dashboard', path: '/dashboard' },
    { icon: <Users size={20} />, text: 'Manage Users', path: '/admin/manage-users' },
    { icon: <Lock size={20} />, text: 'Create FAQs', path: '/admin/create-faqs' },
    { icon: <Calendar size={20} />, text: 'Calendar', path: '/admin/calendar' },
    { icon: <LogOut size={20} />, text: 'Logout', path: '/' }
  ];

  React.useEffect(() => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    if (currentItem) {
      setActiveItem(currentItem.text);
    }
  }, [location, setActiveItem]);

  const handleItemClick = (text) => {
    setActiveItem(text);
  };

  return (
    <aside className={Side["sidebar"]}>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li 
              key={index} 
              className={activeItem === item.text ? Side['active'] : ''}
              onClick={() => handleItemClick(item.text)}
            >
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