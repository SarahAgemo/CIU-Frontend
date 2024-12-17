import React, { useState } from 'react';
import { LayoutDashboard, FileText, LogOut, Video, ClipboardCheck, HelpCircle, ChevronDown, X } from "lucide-react"
import { Link, useLocation } from 'react-router-dom'
import { useSidebar } from './SideBarContext2';
import Mobile from "./MobileMenu.module.css"

export default function MobileMenu({ isOpen, toggleMenu }) {
  const { activeItem, setActiveItem } = useSidebar();
  const location = useLocation();
  const [isExamsOpen, setIsExamsOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/lecturerdashboard' },
    { icon: FileText, label: 'Courses', path: '/lect-courses' },
    { icon: HelpCircle, label: 'Question Bank', path: '/question-bank' },
    { icon: Video, label: 'Proctoring', path: '/lecturer/proctoring' },
    { icon: FileText, label: 'Exam Management', path: '/exam-management' },
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
    if (label === "Exam Mgt") {
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

