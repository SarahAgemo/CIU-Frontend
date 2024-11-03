// import React from 'react';
// import { LayoutDashboard, FileText, ClipboardList, Calendar, HelpCircle, LogOut } from 'lucide-react';
// import { Link, useLocation } from 'react-router-dom';
// import { useSidebar } from '../../components/lecturer/SideBarContext2';
// import Side from './SideBarPop.module.css';


// export default function Sidebar() {
//     const { activeItem, setActiveItem } = useSidebar();
//     const location = useLocation();

//     const menuItems = [
//         { icon: <LayoutDashboard size={20} />, text: 'Dashboard', path: '/student' },
//         { icon: <FileText size={20} />, text: 'Do Exam', path: '/student/do-exam' },
//         { icon: <ClipboardList size={20} />, text: 'Results', path: '/student/results' },
//         { icon: <Calendar size={20} />, text: 'Calendar', path: '/student/calendar' },
//         { icon: <HelpCircle size={20} />, text: 'Support', path: '/student/support' },
//         { icon: <LogOut size={20} />, text: 'Logout', path: '/' }
//     ];

//     React.useEffect(() => {
//         const currentItem = menuItems.find(item => item.path === location.pathname);
//         if (currentItem) {
//             setActiveItem(currentItem.text);
//         }
//     }, [location, setActiveItem]);

//     const handleItemClick = (text) => {
//         setActiveItem(text);
//     };

//     return (
//         <aside className={Side["sidebar"]}>
//             <nav>
//                 <ul>
//                     {menuItems.map((item, index) => (
//                         <li
//                             key={index}
//                             className={activeItem === item.text ? Side['active'] : ''}
//                             onClick={() => handleItemClick(item.text)}
//                         >
//                             <Link to={item.path} className={Side["sidebar-link"]}>
//                                 <span className={Side["icon"]}>{item.icon}</span>
//                                 <span className={Side["menu-text"]}>{item.text}</span>
//                             </Link>
//                         </li>
//                     ))}
//                 </ul>
//             </nav>
//         </aside>
//     );
// }

import React, { useState } from 'react';
import { LayoutDashboard, FileText, HelpCircle, LogOut, ChevronDown, Video} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebar } from '../../components/lecturer/SideBarContext2';
import Side from './SideBarPop.module.css';

export default function Sidebar() {
    const { activeItem, setActiveItem } = useSidebar();
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, text: 'Dashboard', path: '/lecturerdashboard' },
        { icon: <FileText size={20} />, text: 'Courses', path: '/courses' },
        { icon: <HelpCircle size={20} />, text: 'Question Bank', path: '' },
        { icon: <Video size={20} />, text: 'Proctoring', path: '' },
    ];

    const handleItemClick = (text) => {
        setActiveItem(text);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    React.useEffect(() => {
        const currentItem = menuItems.find(item => item.path === location.pathname);
        if (currentItem) {
            setActiveItem(currentItem.text);
        }
    }, [location, setActiveItem]);

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

                    {/* Dropdown for Exam Management */}
                    <li>
                        <div
                            className={`${Side["sidebar-link"]} ${Side["dropdown-header"]}`}
                            onClick={toggleDropdown}
                        >
                            <span className={Side["icon"]}>
                                <FileText size={20} />
                            </span>
                            <span className={Side["menu-text"]}>Exam Management</span>
                            <ChevronDown
                                size={18}
                                className={`${Side["dropdown-arrow"]} ${isDropdownOpen ? Side["open"] : ""}`}
                            />
                        </div>

                        {isDropdownOpen && (
                            <ul className={Side["dropdown-menu"]}>
                                <li>
                                    <Link to="/schedule-create-exams" className={Side["dropdown-link"]}>
                                        Create Assessment
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/schedule-upload-exams" className={Side["dropdown-link"]}>
                                        Upload Assessment
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/schedule-upload-exams/exam-list" className={Side["dropdown-link"]}>
                                        View Exam List
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>

                {/* Logout button */}
                <ul className={Side["logout-container"]}>
                    <li>
                        <Link to="/" className={Side["sidebar-link"]}>
                            <span className={Side["icon"]}>
                                <LogOut size={20} />
                            </span>
                            <span className={Side["menu-text"]}>Logout</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
