import React from 'react';
import { LayoutDashboard, Users, Calendar, LogOut, Lock } from 'lucide-react'; // Ensure 'Lock' is imported
import { Link } from 'react-router-dom';
import UsersSide from './SideBar1.module.css';

export default function Sidebar1() {
    const menuItems = [
        { icon: <LayoutDashboard size={20} />, text: 'Dashboard', path: '/dashboard' },
        { icon: <Users size={20} />, text: 'Manage Lecturers', path: '/manage', active: true },
        { icon: <Lock size={20} />, text: 'Create FAQ', path: '/admin/authentication' },
        { icon: <Calendar size={20} />, text: 'Calendar', path: '/admin/calendar' },
        { icon: <LogOut size={20} />, text: 'Logout', path: '/' }
    ];

    return (
        <aside className={UsersSide["sidebar"]}>
            <nav>
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index} className={item.active ? UsersSide['active'] : ''}>
                            <Link to={item.path} className={UsersSide["sidebar-link"]}>
                                <span className={UsersSide["icon"]}>{item.icon}</span>
                                <span className={UsersSide["menu-text"]}>{item.text}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
