import React from 'react';
import Header from '../../components/student/Header';
import Sidebar from '../../components/student/SideBar';
import MainContent from '../../components/student/MainContent';
import './Dashboard.css';

export default function StudentDashboard() {
  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}