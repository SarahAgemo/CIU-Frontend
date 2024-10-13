import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/admin/Header';
import Sidebar from '../../components/admin/SideBar';
import DashboardCard from '../../components/admin/DashboardCard';
import './Dashboard.css';

export default function Dashboard() {
  const [studentCount, setStudentCount] = useState(0);
  const [programCount, setProgramCount] = useState(0);

  useEffect(() => {
    // Function to fetch student count
    const fetchStudentCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/students/count/students');
        setStudentCount(response.data); // Adjust according to your backend response structure
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    };

    // Function to fetch program count
    const fetchProgramCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/students/count/programs');
        setProgramCount(response.data.count); // Adjust according to your backend response structure
      } catch (error) {
        console.error("Error fetching program count:", error);
      }
    };

    // Call the functions
    fetchStudentCount();
    fetchProgramCount();
  }, []); // Empty dependency array means this runs once after the first render

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <h2 className="dashboard-title">Dashboard</h2>
          <div className="dashboard-cards">
            <DashboardCard title="Registered Students" value={studentCount} icon="🎓" />
            <DashboardCard title="Course groups" value={programCount} icon="📖" />
            {/* You can add more DashboardCards here if needed */}
            <DashboardCard title="Registered Lecturers" value="26" icon="📚" />
            <DashboardCard title="Ongoing Exams/Tests" value="2" icon="📝" />
          </div>
        </main>        
      </div>
    </div>
  ); 
}
