// import React from 'react';
// import { Settings, Bell, User } from 'lucide-react';

// export default function Header() {
//     return (
//         <header className="header">
//             <div className="logo-container">
//                 <img src="/CIU exam system logo.png" alt="Clarke University Logo" className="logo" />
//             </div>
//             <div className="user-controls">
//                 <button className="icon-button">
//                     <Settings size={24} />
//                 </button>
//                 <button className="icon-button">
//                     <Bell size={24} />
//                 </button>
//                 <div className="user-info">
//                     <User size={24} />
//                     <div className="user-details">
//                         <span className="user-name">Jackson S</span>
//                         <span className="user-role">Lecturer</span>
//                     </div>
//                 </div>
//             </div>
//         </header>
//     );
// }

import React from 'react';
import { Settings, Bell, User } from 'lucide-react';
import { lecturerAuth } from './lecturerAuth' // For use when integrating the backend with the frontend to ensure user's detaisl are displayed
import LecturerHeader from './Header.module.css'

export default function Header() {
    const { user } = lecturerAuth()
    return (
        <header className={LecturerHeader["header"]}>
            <div className={LecturerHeader["logo-container"]}>
                <img src="/CIU exam system logo.png" alt="Clarke University Logo" className={LecturerHeader["logo"]} />
            </div>
            <div className={LecturerHeader["user-controls"]}>
                <button className={LecturerHeader["icon-button"]}>
                    <Settings size={24} />
                </button>
                <button className={LecturerHeader["icon-button"]}>
                    <Bell size={24} />
                </button>
                <div className={LecturerHeader["user-info"]}>
                    <User size={24} />
                    <div className={LecturerHeader["user-details"]}>
                        <span className={LecturerHeader["user-name"]}>{user.name}</span>
                        <span className={LecturerHeader["user-role"]}>{user.role}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}