import React from 'react';
import Header from '../../components/admin/Header1.jsx';
import Sidebar1 from '../../components/admin/SideBar1.jsx';
import ManagementCard from '../../components/admin/ManagementCard.jsx';
import ManageUser from './ManageUsers.module.css';

export default function ManageUsers() {
  return (
    <div className={ManageUser["overall"]}>	
    <div className={ManageUser["dashboard"]}>
      <Header />
      <div className={ManageUser["dashboard-content"]}>
        <Sidebar1 />
        <main className="main-content">
          <h2 className="dashboard-title">Manage Users</h2>
          <div className="management-cards">
          <ManagementCard title="Manage Students" icon="user" link="/table" />
            <ManagementCard title="Manage Lecturers" icon="users" link="/users" />
            <ManagementCard title="Manage Admin" icon="users" link="/adminuser" />
          </div>
        </main>
      </div>
    </div>
    </div>
  );
}
