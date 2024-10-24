import React from 'react';
import { LayoutDashboard, FileText, ClipboardList, Calendar, HelpCircle, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import CreateSide from './SideBarCreateExams.module.css'

export default function Sidebar() {
    const menuItems = [
        { icon: <LayoutDashboard size={20} />, text: 'Dashboard', path: '/student' },
        { icon: <FileText size={20} />, text: 'Create Exam', path: '/student/do-exam', active: true },
        { icon: <ClipboardList size={20} />, text: 'Results', path: '/student/results' },
        { icon: <Calendar size={20} />, text: 'Calendar', path: '/student/calendar' },
        { icon: <HelpCircle size={20} />, text: 'Support', path: '/student/support' },
        { icon: <LogOut size={20} />, text: 'Logout', path: '/' }
    ];

    return (
        <aside className={CreateSide["sidebar"]}>
            <nav>
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index} className={item.active ? CreateSide['active'] : ''}>
                            <Link to={item.path} className={CreateSide["sidebar-link"]}>
                                <span className={CreateSide["icon"]}>{item.icon}</span>
                                <span className={CreateSide["menu-text"]}>{item.text}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

