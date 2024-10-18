import React from 'react';
import Header from '../../components/student/Header';
import Sidebar from '../../components/student/SideBar5';
import MessageSupport from '../../components/student/MessageSupport';
import Repissues from './ReportIssue.module.css'

export default function ReportIssue() {
  return (
    <div className={Repissues['reportissue-page']}>
    <div className={Repissues['reportissue']}>
      <Header />
      <div className={Repissues['reportissue-content']}>
        <Sidebar />
        <MessageSupport />
      </div>
    </div>
    </div>
  );
}


