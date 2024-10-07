import React from 'react';
import { LayoutDashboard, Users, Lock, Key, Calendar, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, text: 'Dashboard', path: '/admin', active: true },
    { icon: <Users size={20} />, text: 'Manage Users', path: '/admin/manage-users' },
    { icon: <Lock size={20} />, text: 'Authentication', path: '/admin/authentication' },
    { icon: <Key size={20} />, text: 'Password Reset', path: '/admin/password-reset' },
    { icon: <Calendar size={20} />, text: 'Calendar', path: '/admin/calendar' },
    { icon: <LogOut size={20} />, text: 'Logout', path: '/' }
  ];

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className={item.active ? 'active' : ''}>
              <Link to={item.path} className="sidebar-link">
                <span className="icon">{item.icon}</span>
                <span className="menu-text">{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

// export default function Sidebar() {
//   const menuItems = [
//     { icon: <LayoutDashboard size={20} />, text: 'Dashboard', active: true },
//     { icon: <Users size={20} />, text: 'Manage Users' },
//     { icon: <Lock size={20} />, text: 'Authentication' },
//     { icon: <Key size={20} />, text: 'Password Reset' },
//     { icon: <Calendar size={20} />, text: 'Calendar' },
//     { icon: <LogOut size={20} />, text: 'Logout' }
//   ];

//   return (
//     <aside className="sidebar">
//       <nav>
//         <ul>
//           {menuItems.map((item, index) => (
//             <li key={index} className={item.active ? 'active' : ''}>
//                <a href="#">
//                 <span className="icon">{item.icon}</span> {item.text}
//               </a>       
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </aside>
//   );
// }

// export default function Sidebar() {
//   return (
//     <aside className="sidebar">
//       <nav>
//         <ul>
//           <li className="active"><a href="#"><span className="icon">📊</span> Dashboard</a></li>
//           <li><a href="#"><span className="icon">👥</span> Manage Users</a></li>
//           <li><a href="#"><span className="icon">🔐</span> Authentication</a></li>
//           <li><a href="#"><span className="icon">🔑</span> Password Reset</a></li>
//           <li><a href="#"><span className="icon">📅</span> Calendar</a></li>
//           <li><a href="#"><span className="icon">🚪</span> Logout</a></li>
//         </ul>
//       </nav>
//     </aside>
//   );
// }
