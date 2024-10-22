import React from 'react';
import Header from '../../components/student/Header';
import Sidebar from '../../components/student/SideBar';
import MainContent from '../../components/student/MainContent';
import DashboardCard from '../../components/student/Dashboard';
import StudDashboard from './StudentDashboard.module.css';

export default function StudentDashboard() {
  return (
    <div className={StudDashboard.studentdash}>
    <div className={StudDashboard.dashboard}>
      <Header />
      <div className={StudDashboard['dashboard-content']}>
        <Sidebar />
        <MainContent />
        <DashboardCard />
      </div>
    </div>
    </div>
  );
}