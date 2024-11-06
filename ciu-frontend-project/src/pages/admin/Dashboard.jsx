import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/admin/Header1';
import Sidebar from '../../components/admin/SideBar';
import DashboardCard from '../../components/admin/DashboardCard';
import AdminDash from './Dashboard.module.css';

export default function Dashboard() {
  const [studentCount, setStudentCount] = useState(0);
  const [programCount, setProgramCount] = useState(0);

  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/students/count/students');
        console.log("Student Count Response:", response);
        setStudentCount(response.data.count || 0);  // Ensure response is not undefined
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    };

    const fetchProgramCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/students/count/programs');
        console.log("Program Count Response:", response);
        setProgramCount(response.data.count || 0);  // Ensure response is not undefined
      } catch (error) {
        console.error("Error fetching program count:", error);
      }
    };

    fetchStudentCount();
    fetchProgramCount();
  }, []);

  return (
    <div className={AdminDash.overall}>
      <div className={AdminDash.dashboard}>
        <Header />
        <div className={AdminDash['dashboard-content']}>
          <Sidebar />
          <main className={AdminDash['main-content']}>
            <h2 className={AdminDash['dashboard-title']}>Dashboard</h2>
            <div className={AdminDash['dashboard-cards']}>
              <DashboardCard title="Registered Students" value={studentCount} icon="🎓" />
              <DashboardCard title="Course groups" value={programCount} icon="📖" />
              <DashboardCard title="Registered Lecturers" value="26" icon="📚" />
              <DashboardCard title="Ongoing Exams/Tests" value="2" icon="📝" />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
