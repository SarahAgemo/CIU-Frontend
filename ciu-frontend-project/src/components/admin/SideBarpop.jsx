import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  LogOut,
  Lock,
  Video,
  Library,
  Folder,
  ClipboardCheck,
  ChevronDown,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "./SidebarContext";
import Side from "./SideBarpop.module.css";

export default function Sidebar() {
  const { activeItem, setActiveItem } = useSidebar();
  const location = useLocation();
  const [isExamsDropdownOpen, setExamsDropdownOpen] = useState(false);

  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      text: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <Users size={20} />,
      text: "Manage Users",
      path: "/admin/manage-users",
      subItems: [
        { text: "Manage Students", path: "/table" },
        { text: "Manage Lecturers", path: "/users" },
        {
          text: "Manage Administrators",
          path: "/adminuser",
        },
      ],
    },
    // { icon: <Video size={20} />, text: "Proctoring", path: "/proctoring" },
    {
      icon: <ClipboardCheck size={20} />,
      text: "Exams",
      subItems: [
        { text: "Uploaded Exams", path: "/schedule-upload-exams/exam-list" },
        { text: "Manual Exams", path: "/schedule-upload-exams/exam-list" },
      ],
    },
    { icon: <Library size={20} />, text: "All Courses", path: "/courses" },
    {
      icon: <Folder size={20} />,
      text: "All Course Units",
      path: "/course-units",
    },
    {
      icon: <Lock size={20} />,
      text: "Create FAQs",
      path: "/admin/create-faqs",
    },
    { icon: <Calendar size={20} />, text: "Calendar", path: "/admin/calendar" },
    { icon: <LogOut size={20} />, text: "Logout", path: "/" },
  ];

  React.useEffect(() => {
    const currentItem = menuItems.find(
      (item) => item.path === location.pathname
    );
    if (currentItem) {
      setActiveItem(currentItem.text);
    }
  }, [location, setActiveItem]);

  const handleItemClick = (text) => {
    setActiveItem(text);
  };

  const toggleExamsDropdown = () => {
    setExamsDropdownOpen((prevState) => !prevState);
  };

  return (
    <aside className={Side["sidebar"]}>
      <nav>
        <ul>
          {menuItems.map((item, index) =>
            item.subItems ? (
              <li
                key={index}
                className={Side["dropdown"]}
                onClick={toggleExamsDropdown}
              >
                <div
                  className={`${Side["sidebar-link"]} ${Side["dropdown-toggle"]}`}
                >
                  <span className={Side["icon"]}>{item.icon}</span>
                  <span className={Side["menu-text"]}>{item.text}</span>
                  <ChevronDown size={16} className={Side["dropdown-icon"]} />
                </div>
                {isExamsDropdownOpen && (
                  <ul className={Side["dropdown-menu"]}>
                    {item.subItems.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        className={
                          activeItem === subItem.text ? Side["active"] : ""
                        }
                      >
                        <Link
                          to={subItem.path}
                          className={Side["sidebar-link"]}
                          onClick={() => handleItemClick(subItem.text)}
                        >
                          <span className={Side["menu-text"]}>
                            {subItem.text}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li
                key={index}
                className={activeItem === item.text ? Side["active"] : ""}
                onClick={() => handleItemClick(item.text)}
              >
                <Link to={item.path} className={Side["sidebar-link"]}>
                  <span className={Side["icon"]}>{item.icon}</span>
                  <span className={Side["menu-text"]}>{item.text}</span>
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>
    </aside>
  );
}
