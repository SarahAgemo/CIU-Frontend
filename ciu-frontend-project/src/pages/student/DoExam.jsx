import React from 'react';
import Header from '../../components/student/Header';
import Sidebar from '../../components/student/SideBar1';
import DoExamContent from '../../components/student/DoExamContent';
import Doexam from './DoExam.module.css';

export default function DoExam() {
  return (
    <div className={Doexam.doexam}>
    <div className={Doexam.dashboard}>
      <Header />
      <div className={Doexam['dashboard-content']}>
        <Sidebar />
        <DoExamContent />
      </div>
    </div>
    </div>
  );
}