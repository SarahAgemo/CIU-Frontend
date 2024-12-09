// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import DashboardCard from '../../components/lecturer/DashboardCard'; 
// import Dash from './LecturerDashboardContent.module.css';

// export default function LecturerDashboardContent() {
//   const [lecturerMetrics, setLecturerMetrics] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/exam-paper/count'); 
//         const { data } = response;
        
//         // Set lecturer metrics based on the response from the API
//         setLecturerMetrics([
//           { title: "Courses", value: data.coursesCount, icon: "📘" },
//           { title: "Students Enrolled", value: data.studentsCount, icon: "👩‍🎓" },
//           { title: "Question Banks", value: data.questionBankCount, icon: "📝" },
//           { title: "Upcoming Exams", value: data.upcomingExamsCount, icon: "📝" },
//           { title: "Ongoing Exams", value: data.ongoingAssessmentCount, icon: "📝" },
//         ]);
//       } catch (error) {
//         console.error("Error fetching metrics:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className={Dash.overall}>
//       <div className={Dash.dashboard}>
//         <div className={Dash.mainContent}>
//           <h2 className={Dash.dashboardTitle}>Lecturer Dashboard</h2>
//           <div className={Dash.dashboardCards}>
//             {lecturerMetrics.map((metric, index) => (
//               <DashboardCard
//                 key={index}
//                 title={metric.title}
//                 value={metric.value}
//                 icon={metric.icon}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './HeaderPop';
import Sidebar from './SideBarPop';
import MobileMenu from "../../components/lecturer/MobileMenu"
import DashboardCard from '../../components/lecturer/DashboardCard'; 
import Dash from './LecturerDashboardContent.module.css';

export default function LecturerDashboard() {
  const [lecturerMetrics, setLecturerMetrics] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/exam-paper/count'); 
        const { data } = response;
        
        // Set lecturer metrics based on the response from the API
        setLecturerMetrics([
          { title: "Courses", value: data.coursesCount, icon: "📘" },
          { title: "Students Enrolled", value: data.studentsCount, icon: "👩‍🎓" },
          { title: "Question Banks", value: data.upcomingExamsCount, icon: "📝" },
          { title: "Upcoming Exams", value: data.upcomingExamsCount, icon: "📝" },
          { title: "Ongoing Exams", value: data.upcomingExamsCount, icon: "📝" },
        ]);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className={Dash.overall}>
      <div className={`${Dash["dashboard"]} ${isMobileMenuOpen ? Dash["menu-open"] : ""}`}>
        <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
        <div className={Dash.mainContent}>
          {!isMobile && <Sidebar />}
          {isMobile && (
            <>
              <div 
                className={`${Dash["overlay"]} ${isMobileMenuOpen ? Dash["active"] : ""}`} 
                onClick={toggleMobileMenu}
              ></div>
              <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
            </>
          )}
          
          <main className={`${Dash.mainContentWrapper} ${isMobileMenuOpen ? Dash.dimmed : ''}`}>
            <h2 className={Dash.dashboardTitle}>Lecturer Dashboard</h2>
            <div className={Dash.dashboardCards}>
              {lecturerMetrics.map((metric, index) => (
                <DashboardCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  icon={metric.icon}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
