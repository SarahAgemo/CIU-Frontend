// import { Bell, Menu } from "lucide-react"
// import UserDetailsPopup from "./UserDetailsPopup"
// import Head from './Headerpop.module.css';

// export default function Header({ toggleMobileMenu, isMobile }) {
//   return (
//     <header className={Head["header"]}>
//       <div className={Head["logo-container"]}>
//         {isMobile && (
//           <button className={Head["hamburger-button"]} onClick={toggleMobileMenu} aria-label="Toggle menu">
//             <Menu className={Head["hamburger-icon"]} />
//           </button>
//         )}
//         <img src="/CIU-exam-system-logo.png" alt="System Logo" className={Head["logo"]} />
//       </div>
//       <div className={Head["header-icons"]}>
//         <button className={Head["icon-button"] + " " + Head["notification-button"]} aria-label="Notifications">
//           <Bell className={Head["notification-icon"]} />
//           <span className={Head["notification-indicator"]} />
//         </button>
//         <UserDetailsPopup>
//           <button className={Head["profile-button"]} aria-label="User profile">
//             <img 
//               src="/IMG_9472.jpg" 
//               alt="User profile" 
//               className={Head["profile-image"]}
//             />
//           </button>
//         </UserDetailsPopup>
//       </div>
//     </header>
//   )
// }

import { Bell, Menu } from "lucide-react";
import UserDetailsPopup from "./UserDetailsPopup";
import Head from './Headerpop.module.css';
import { Link } from 'react-router-dom';

export default function Header({ toggleMobileMenu, isMobile }) {
  const userId = localStorage.getItem("userId"); // Or use context, etc.

  return (
    <header className={Head["header"]}>
      <div className={Head["logo-container"]}>
        {isMobile && (
          <button className={Head["hamburger-button"]} onClick={toggleMobileMenu} aria-label="Toggle menu">
            <Menu className={Head["hamburger-icon"]} />
          </button>
        )}
        <img src="/CIU-exam-system-logo.png" alt="System Logo" className={Head["logo"]} />
      </div>
      <div className={Head["header-icons"]}>
        {/* Always render the button, and conditionally wrap it with Link */}
        {userId ? (
          <Link to={'notifications'} aria-label="Notifications">
            <button className={`${Head["icon-button"]} ${Head["notification-button"]}`} aria-label="Notifications">
              <Bell className={Head["notification-icon"]} />
              <span className={Head["notification-indicator"]} />
            </button>
          </Link>
        ) : (
          <button className={`${Head["icon-button"]} ${Head["notification-button"]}`} aria-label="Notifications">
            <Bell className={Head["notification-icon"]} />
            <span className={Head["notification-indicator"]} />
          </button>
        )}
        <UserDetailsPopup>
          <button className={Head["profile-button"]} aria-label="User profile">
            <img 
              src="/IMG_9472.jpg" 
              alt="User profile" 
              className={Head["profile-image"]}
            />
          </button>
        </UserDetailsPopup>
      </div>
    </header>
  );
}
