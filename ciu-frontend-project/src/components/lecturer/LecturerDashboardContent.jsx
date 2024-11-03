import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardCard from './DashboardCard'; 
import Dash from './LecturerDashboard.module.css';

export default function LecturerDashboardContent() {
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
