import React from 'react';
import Header from '../../components/admin/Header';
import Sidebar from '../../components/admin/SideBar';
import DashboardCard from '../../components/admin/DashboardCard';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <h2 className="dashboard-title">Dashboard</h2>
          <div className="dashboard-cards">
            <DashboardCard title="Registered Lecturers" value="26" icon="📚" />
            <DashboardCard title="Registered Students" value="128" icon="🎓" />
            <DashboardCard title="Course groups" value="15" icon="📖" />
            <DashboardCard title="Ongoing Exams/Tests" value="2" icon="📝" />
          </div>
        </main>        
      </div>
    </div>
  );
}