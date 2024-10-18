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
        <main className={ManageUser["main-content"]}>
          <h2 className={ManageUser["dashboard-title"]}>Manage Users</h2>
          <div className={ManageUser["management-cards"]}>
            <ManagementCard title="Manage Lecturers" icon="users" to="/admin/manage-users/students" />
            <ManagementCard title="Manage Students" icon="user" to="/admin/manage-users/teachers"/>
          </div>
        </main>
      </div>
    </div>
    </div>
  );
}