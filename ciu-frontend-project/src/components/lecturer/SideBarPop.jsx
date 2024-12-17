import React, { useState } from 'react';
import { LayoutDashboard, FileText, LogOut, Video, HelpCircle, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebar } from './SideBarContext2';
import Side from './SideBarPop.module.css';

export default function Sidebar() {
  const { activeItem, setActiveItem } = useSidebar();
  const location = useLocation();
  const [isExamsDropdownOpen, setExamsDropdownOpen] = useState(false);

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, text: 'Dashboard', path: '/lecturerdashboard' },
    { icon: <FileText size={20} />, text: 'Courses', path: '/lect-courses' },
    { icon: <HelpCircle size={20} />, text: 'Question Bank', path: '/question-bank' },
    { icon: <Video size={20} />, text: 'Proctoring', path: '/lecturer/proctoring' },
    { icon: <FileText size={20} />, text: 'Exam Management', path: '/exam-management' },
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

  const toggleExamsDropdown = () => {
    setExamsDropdownOpen(prevState => !prevState);
  };

  return (
    <aside className={Side["sidebar"]}>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            item.subItems ? (
              <li key={index} className={Side['dropdown']} onClick={toggleExamsDropdown}>
                <div className={`${Side["sidebar-link"]} ${Side["dropdown-toggle"]}`}>
                  <span className={Side["icon"]}>{item.icon}</span>
                  <span className={Side["menu-text"]}>{item.text}</span>
                  <ChevronDown size={16} className={Side["dropdown-icon"]} />
                </div>
                {isExamsDropdownOpen && (
                  <ul className={Side["dropdown-menu"]}>
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex} className={activeItem === subItem.text ? Side['active'] : ''}>
                        <Link to={subItem.path} className={Side["sidebar-link"]} onClick={() => handleItemClick(subItem.text)}>
                          <span className={Side["menu-text"]}>{subItem.text}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
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
            )
          ))}
        </ul>
      </nav>
    </aside>
  );
}
