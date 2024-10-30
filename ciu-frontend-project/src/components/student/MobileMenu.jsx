import React from 'react';
import { LayoutDashboard, FileText, ClipboardList, Calendar, HelpCircle, LogOut, X } from "lucide-react"
import { Link, useLocation } from 'react-router-dom'
import { useSidebar } from './SidebarContext';
import Mobile from "./MobileMenu.module.css"

export default function MobileMenu({ isOpen, toggleMenu }) {
  const { activeItem, setActiveItem } = useSidebar();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/student" },
    { icon: FileText, label: "Do Exam", path: '/student/do-exam'},
    { icon: ClipboardList, label: "Results", path: '/student/results' },
    { icon: Calendar, label: "Calendar", path: '/student/calendar' },
    { icon: HelpCircle, label: "Support", path: '/student/support' },
    { icon: LogOut, label: "Logout", path: "/" },
  ];

  React.useEffect(() => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    if (currentItem) {
      setActiveItem(currentItem.label);
    }
  }, [location, setActiveItem]);

  const handleItemClick = (label) => {
    setActiveItem(label);
  };

  return (
    <div className={`${Mobile['mobile-menu']} ${isOpen ? Mobile['open'] : ''}`}>
      <button className={Mobile["close-button"]} onClick={toggleMenu} aria-label="Close menu">
        <X className={Mobile["close-icon"]} />
      </button>
      <aside className={Mobile["mobile-nav"]}>
        <nav>
          <ul>
            {menuItems.map((item, index) => (
              <li 
              key={index} 
              className={`${Mobile["menu-item"]} ${activeItem === item.label ? Mobile['active'] : ''}`}
              onClick={() => handleItemClick(item.label)}
            >
              <Link key={index} to={item.path} className={Mobile["mobile-button"]} onClick={toggleMenu}>
                <item.icon className={Mobile["mobile-icon"]} />
                {item.label}
              </Link>
            </li>
            ))}
          </ul> 
        </nav>
      </aside>
    </div>
  )
}