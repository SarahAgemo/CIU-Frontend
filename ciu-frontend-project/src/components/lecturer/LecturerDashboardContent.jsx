import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardCard from './DashboardCard'; 
import Dash from './LecturerDashboard.module.css';

export default function LecturerDashboardContent() {
<<<<<<< HEAD
  const lecturerMetrics = [
    { title: "Question Banks", value: 5, icon: "📘" },
    { title: "Ongoing Exams", value: 120, icon: "👩‍🎓" },
    { title: "Upcoming Exams", value: 50, icon: "📝" },
    // { title: "Office Hours Scheduled", value: 8, icon: "📅" }
  ];
=======
  const [lecturerMetrics, setLecturerMetrics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/exam-paper/count'); 
        const { data } = response;
        
        // Set lecturer metrics based on the response from the API
        setLecturerMetrics([
          { title: "Courses", value: data.coursesCount, icon: "📘" },
          { title: "Students Enrolled", value: data.studentsCount, icon: "👩‍🎓" },
          { title: "Upcoming Exams", value: data.upcomingExamsCount, icon: "📝" },
        ]);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    fetchData();
  }, []);
>>>>>>> 623392a38b7f64c9cd6245eb99e2c9f53bcca964

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
