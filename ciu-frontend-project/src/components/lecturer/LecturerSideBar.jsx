import React, { useState } from 'react';
import { LayoutDashboard, FileText, ClipboardList, Calendar, HelpCircle, LogOut, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import AddSide from './SideBarAddQuestion.module.css';

export default function Sidebar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, text: 'Dashboard', path: '/student', active: true },
        // { icon: <ClipboardList size={20} />, text: 'Proctoring', path: '/student/results' },
        // { icon: <Calendar size={20} />, text: 'Question Banks', path: '/student/calendar' },
        // { icon: <HelpCircle size={20} />, text: 'Marking Guide', path: '/student/support' },
    ];

    return (
        <aside className={AddSide["sidebar"]}>
            <nav>
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index} className={item.active ? AddSide['active'] : ''}>
                            <Link to={item.path} className={AddSide["sidebar-link"]}>
                                <span className={AddSide["icon"]}>{item.icon}</span>
                                <span className={AddSide["menu-text"]}>{item.text}</span>
                            </Link>
                        </li>
                    ))}

                    <li>
                        <div
                            className={`${AddSide["sidebar-link"]} ${AddSide["dropdown-header"]}`}
                            onClick={toggleDropdown}
                        >
                            <span className={AddSide["icon"]}>
                                <FileText size={20} />
                            </span>
                            <span className={AddSide["menu-text"]}>Exam Management</span>
                            <ChevronDown
                                size={18}
                                className={`${AddSide["dropdown-arrow"]} ${isDropdownOpen ? AddSide["open"] : ""}`}
                            />
                        </div>

                        {isDropdownOpen && (
                            <ul className={AddSide["dropdown-menu"]}>
                                <li>
                                    <Link to="/schedule-create-exams" className={AddSide["dropdown-link"]}>
                                        Create Assessment
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/schedule-upload-exams" className={AddSide["dropdown-link"]}>
                                        Upload Assessment
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/schedule-upload-exams/exam-list" className={AddSide["dropdown-link"]}>
                                        View Exam List
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>

                <ul className={AddSide["logout-container"]}>
                    <li>
                        <Link to="/" className={AddSide["sidebar-link"]}>
                            <span className={AddSide["icon"]}>
                                <LogOut size={20} />
                            </span>
                            <span className={AddSide["menu-text"]}>Logout</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
