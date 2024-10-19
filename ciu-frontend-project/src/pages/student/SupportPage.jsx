import React from 'react';
import Header from '../../components/student/Header';
import Sidebar from '../../components/student/SideBar51';
import SupportContent from '../../components/student/SupportContent';
import Suppage from './SupportPage.module.css'

export default function SupportPage() {
  return (
    <div className={Suppage["support-page"]}>
    <div className={Suppage["support"]}>
      <Header />
      <div className={Suppage["support-content"]}>
        <Sidebar />
        <SupportContent />
      </div>
    </div>
    </div>
  );
}