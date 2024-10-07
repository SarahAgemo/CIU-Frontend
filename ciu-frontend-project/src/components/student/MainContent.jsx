import React from 'react';
import { Search, FileText, ClipboardList, MessageSquare } from 'lucide-react';

export default function MainContent() {
  return (
    <main className="main-content">
      <div className="welcome-banner">
        <div className="image-group">
          <img src="/977A9972-min.jpg" alt="Student 1" className="banner-image" />          
        </div>
        <div className="welcome-overlay">
          <h2>Welcome back Cole!</h2>
          <div className="search-bar">
            <Search size={20} />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      </div>
      <div className="dashboard-cards">
        <DashboardCard icon={<FileText size={48} />} title="Upcoming Exams" />
        <DashboardCard icon={<ClipboardList size={48} />} title="Completed Exams" />
        <DashboardCard icon={<MessageSquare size={48} />} title="Messages" badge="2" />
      </div>
    </main>
  );
}

function DashboardCard({ icon, title, badge }) {
  return (
    <div className="dashboard-card">
      <div className="card-icon">{icon}</div>
      <h3>{title}</h3>
      {badge && <span className="badge">{badge}</span>}
    </div>
  );
}

// import React from 'react';
// import { Search, FileText, ClipboardList, MessageSquare } from 'lucide-react';

// export default function MainContent() {
//   return (
//     <main className="main-content">
//       <div className="welcome-banner">
//         <h2>Welcome back Cole!</h2>
//         <div className="search-bar">
//           <Search size={20} />
//           <input type="text" placeholder="Search..." />
//         </div>
//       </div>
//       <div className="dashboard-cards">
//         <DashboardCard icon={<FileText size={48} />} title="Upcoming Exams" />
//         <DashboardCard icon={<ClipboardList size={48} />} title="Completed Exams" />
//         <DashboardCard icon={<MessageSquare size={48} />} title="Messages" badge="1" />
//       </div>
//     </main>
//   );
// }

// function DashboardCard({ icon, title, badge }) {
//   return (
//     <div className="dashboard-card">
//       <div className="card-icon">{icon}</div>
//       <h3>{title}</h3>
//       {badge && <span className="badge">{badge}</span>}
//     </div>
//   );
// }