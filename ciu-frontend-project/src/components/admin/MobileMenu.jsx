import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  LogOut,
  Lock,
  Library,
  ClipboardCheck,
  ChevronDown,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "./SidebarContext";
import Mobile from "./MobileMenu.module.css";

export default function MobileMenu({ isOpen, toggleMenu }) {
  const { activeItem, setActiveItem } = useSidebar();
  const location = useLocation();
  const [isExamsOpen, setIsExamsOpen] = useState(false);
  const [isManageUsersOpen, setIsManageUsersOpen] = useState(false); // Add this state

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    {
      icon: Users,
      label: "Manage Users",
      subItems: [
        { icon: ClipboardCheck, label: "Manage Students", path: "/table" },
        { icon: ClipboardCheck, label: "Manage Lectures", path: "/users" },
        {
          icon: ClipboardCheck,
          label: "Manage Administrators",
          path: "/adminuser",
        },
      ],
    },

    { icon: ClipboardCheck, label: "Exam list", path: "/admin-exam-list" },
    {
      icon: Library,
      label: "Courses",
      subItems: [
        { icon: Library, label: "Register Course", path: "/regCourse" },
        { icon: Library, label: "View Courses", path: "/admin-courses" },
      ],
    },
    // { icon: Folder, label: 'Course Units', path: '/course-units' },
    { icon: Lock, label: "Create FAQs", path: "/admin/create-faqs" },
    { icon: Calendar, label: "Calendar", path: "/admin/calendar" },
    { icon: LogOut, label: "Logout", path: "/" },
  ];

  React.useEffect(() => {
    const currentItem = menuItems.find(
      (item) => item.path === location.pathname
    );
    if (currentItem) {
      setActiveItem(currentItem.label);
    }
  }, [location, setActiveItem]);

  const handleItemClick = (label) => {
    setActiveItem(label);
    if (label === "Courses") {
      setIsExamsOpen(!isExamsOpen);
    } else if (label === "Manage Users") {
      setIsManageUsersOpen(!isManageUsersOpen); // Toggle the "Manage Users" submenu
    } else {
      toggleMenu();
    }
  };

  return (
    <div className={`${Mobile["mobile-menu"]} ${isOpen ? Mobile["open"] : ""}`}>
      <button
        className={Mobile["close-button"]}
        onClick={toggleMenu}
        aria-label="Close menu"
      >
        <X className={Mobile["close-icon"]} />
      </button>
      <aside className={Mobile["mobile-nav"]}>
        <nav>
          <ul>
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`${Mobile["menu-item"]} ${
                  activeItem === item.label ? Mobile["active"] : ""
                }`}
              >
                {item.subItems ? (
                  <div>
                    <button
                      className={`${Mobile["mobile-button"]} ${Mobile["mobile-button-with-submenu"]}`}
                      onClick={() => handleItemClick(item.label)}
                    >
                      <item.icon className={Mobile["mobile-icon"]} />
                      {item.label}
                      <ChevronDown
                        className={`${Mobile["mobile-icon"]} ${
                          Mobile["mobile-icon-chevron"]
                        } ${
                          item.label === "Exams" && isExamsOpen
                            ? Mobile["rotated"]
                            : ""
                        } ${
                          item.label === "Manage Users" && isManageUsersOpen
                            ? Mobile["rotated"]
                            : ""
                        }`}
                      />
                    </button>
                    {(isExamsOpen && item.label === "Courses") ||
                    (isManageUsersOpen && item.label === "Manage Users") ? (
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
                    ) : null}
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
  );
}
