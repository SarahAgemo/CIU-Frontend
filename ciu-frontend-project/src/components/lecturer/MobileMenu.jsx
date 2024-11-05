// import React from 'react';
// import { LayoutDashboard, FileText, ClipboardList, Calendar, HelpCircle, LogOut, X } from "lucide-react"
// import { Link, useLocation } from 'react-router-dom'
// import { useSidebar } from '../../components/lecturer/SideBarContext2';
// import Mobile from "./MobileMenu.module.css"

// export default function MobileMenu({ isOpen, toggleMenu }) {
//     const { activeItem, setActiveItem } = useSidebar();
//     const location = useLocation();

//     const menuItems = [
//         { icon: LayoutDashboard, label: "Dashboard", path: "/student" },
//         { icon: FileText, label: "Do Exam", path: '/student/do-exam' },
//         { icon: ClipboardList, label: "Results", path: '/student/results' },
//         { icon: Calendar, label: "Calendar", path: '/student/calendar' },
//         { icon: HelpCircle, label: "Support", path: '/student/support' },
//         { icon: LogOut, label: "Logout", path: "/" },
//     ];

//     React.useEffect(() => {
//         const currentItem = menuItems.find(item => item.path === location.pathname);
//         if (currentItem) {
//             setActiveItem(currentItem.label);
//         }
//     }, [location, setActiveItem]);

//     const handleItemClick = (label) => {
//         setActiveItem(label);
//     };

//     return (
//         <div className={`${Mobile['mobile-menu']} ${isOpen ? Mobile['open'] : ''}`}>
//             <button className={Mobile["close-button"]} onClick={toggleMenu} aria-label="Close menu">
//                 <X className={Mobile["close-icon"]} />
//             </button>
//             <aside className={Mobile["mobile-nav"]}>
//                 <nav>
//                     <ul>
//                         {menuItems.map((item, index) => (
//                             <li
//                                 key={index}
//                                 className={`${Mobile["menu-item"]} ${activeItem === item.label ? Mobile['active'] : ''}`}
//                                 onClick={() => handleItemClick(item.label)}
//                             >
//                                 <Link key={index} to={item.path} className={Mobile["mobile-button"]} onClick={toggleMenu}>
//                                     <item.icon className={Mobile["mobile-icon"]} />
//                                     {item.label}
//                                 </Link>
//                             </li>
//                         ))}
//                     </ul>
//                 </nav>
//             </aside>
//         </div>
//     )
// }
import React, { useState } from 'react';
import { LayoutDashboard, FileText, HelpCircle, LogOut, ChevronDown, Video, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebar } from '../../components/lecturer/SideBarContext2';
import Mobile from './MobileMenu.module.css'; // Use the MobileMenu styles

export default function MobileMenu({ isOpen, toggleMenu }) {
    const { activeItem, setActiveItem } = useSidebar();
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/lecturerdashboard' },
        { icon: FileText, label: 'Courses', path: '/lect-courses' },
        { icon: HelpCircle, label: 'Question Bank', path: '' },
        { icon: Video, label: 'Proctoring', path: '' },
    ];

    React.useEffect(() => {
        const currentItem = menuItems.find(item => item.path === location.pathname);
        if (currentItem) {
            setActiveItem(currentItem.label);
        }
    }, [location, setActiveItem]);

    const handleItemClick = (label) => {
        setActiveItem(label);
        toggleMenu(); // Close menu after selection
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
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
                                <Link to={item.path} className={Mobile["mobile-button"]}>
                                    <item.icon className={Mobile["mobile-icon"]} />
                                    {item.label}
                                </Link>
                            </li>
                        ))}

                        {/* Dropdown for Exam Management */}
                        <li>
                            <div
                                className={`${Mobile["mobile-button"]} ${Mobile["dropdown-header"]}`}
                                onClick={toggleDropdown}
                            >
                                <FileText className={Mobile["mobile-icon"]} />
                                <span>Exam Management</span>
                                <ChevronDown
                                    size={18}
                                    className={`${Mobile["dropdown-arrow"]} ${isDropdownOpen ? Mobile["open"] : ""}`}
                                />
                            </div>

                            {isDropdownOpen && (
                                <ul className={Mobile["dropdown-menu"]}>
                                    <li>
                                        <Link to="/schedule-create-exams" className={Mobile["dropdown-link"]}>
                                            Create Assessment
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/schedule-upload-exams" className={Mobile["dropdown-link"]}>
                                            Upload Assessment
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/schedule-upload-exams/exam-list" className={Mobile["dropdown-link"]}>
                                            View Exam List
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Logout */}
                        <li className={Mobile["menu-item"]}>
                            <Link to="/" className={Mobile["mobile-button"]} onClick={toggleMenu}>
                                <LogOut className={Mobile["mobile-icon"]} />
                                Logout
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    );
}
