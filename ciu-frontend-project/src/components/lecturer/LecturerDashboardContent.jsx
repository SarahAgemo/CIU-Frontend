// src/pages/lecturer/LecturerDashboard.jsx
import React from 'react';
import DashboardCard from './DashboardCard'; // Adjust path based on your structure
import Dash from './LecturerDashboard.module.css'; // Assuming you have some styles specific to the lecturer dashboard

export default function LecturerDashboardContent() {
  const lecturerMetrics = [
    { title: "Courses Taught", value: 5, icon: "📘" },
    { title: "Students Enrolled", value: 120, icon: "👩‍🎓" },
    { title: "Assignments Graded", value: 50, icon: "📝" },
    { title: "Office Hours Scheduled", value: 8, icon: "📅" }
  ];

  return (
    <div className={Dash.overall}>
      <div className={Dash.dashboard}>
        <div className={Dash.mainContent}>
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
        </div>
      </div>
    </div>
  );
}
