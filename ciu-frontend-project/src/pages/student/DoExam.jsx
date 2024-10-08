import React from 'react';
import Header from '../../components/student/Header';
import Sidebar1 from '../../components/student/SideBar1';
import DoExamContent from '../../components/student/DoExamContent';
import './DoExam.css';

export default function DoExam() {
  return (
    <div className="doexam">
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        <Sidebar1 />
        <DoExamContent />
      </div>
    </div>
    </div>
  );
}