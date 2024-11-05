import React, { useState } from 'react';
import { LayoutDashboard, Users, Calendar, LogOut, Lock, Video, Library, Folder, ClipboardCheck, ChevronDown, X } from "lucide-react"
import { Link, useLocation } from 'react-router-dom'
import { useSidebar } from './SidebarContext';
import Mobile from "./MobileMenu.module.css"

export default function MobileMenu({ isOpen, toggleMenu }) {
  const { activeItem, setActiveItem } = useSidebar();
  const location = useLocation();
  const [isExamsOpen, setIsExamsOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Manage Users', path: '/admin/manage-users' },
    { icon: Video, label: 'Proctoring', path: '/proctoring' },
    { 
      icon: ClipboardCheck, 
      label: 'Exams', 
      subItems: [
        { icon: ClipboardCheck, label: 'Uploaded Exams', path: '/schedule-upload-exams/exam-list' },
        { icon: ClipboardCheck, label: 'Manual Exams', path: '/schedule-upload-exams/exam-list' },
      ],
    },
    { icon: Library, label: 'All Courses', path: '/courses' },
    { icon: Folder, label: 'All Course Units', path: '/course-units' },
    { icon: Lock, label: 'Create FAQs', path: '/admin/create-faqs' },
    { icon: Calendar , label: 'Calendar', path: '/admin/calendar' },
    { icon: LogOut, label: 'Logout', path: '/' }
  ];

  React.useEffect(() => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    if (currentItem) {
      setActiveItem(currentItem.label);
    }
  }, [location, setActiveItem]);

  const handleItemClick = (label) => {
    setActiveItem(label);
    if (label === "Exams") {
      setIsExamsOpen(!isExamsOpen);
    } else {
      toggleMenu();
    }
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
              >
                {item.subItems ? (
                  <div>
                    <button 
                      className={`${Mobile["mobile-button"]} ${Mobile["mobile-button-with-submenu"]}`}
                      onClick={() => handleItemClick(item.label)}
                    >
                      <item.icon className={Mobile["mobile-icon"]} />
                      {item.label}
                      <ChevronDown className={`${Mobile["mobile-icon"]} ${Mobile["mobile-icon-chevron"]} ${isExamsOpen ? Mobile['rotated'] : ''}`} />
                    </button>
                    {isExamsOpen && (
                      <ul className={Mobile["submenu"]}>
                        {item.subItems.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link 
                              to={subItem.path} 
                              className={Mobile["mobile-button"]} 
                              onClick={() => {
                                handleItemClick(subItem.label);
                                toggleMenu();
                              }}
                            >
                              <subItem.icon className={Mobile["mobile-icon"]} />
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link 
                    to={item.path} 
                    className={Mobile["mobile-button"]} 
                    onClick={() => handleItemClick(item.label)}
                  >
                    <item.icon className={Mobile["mobile-icon"]} />
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul> 
        </nav>
      </aside>
    </div>
  )
}

