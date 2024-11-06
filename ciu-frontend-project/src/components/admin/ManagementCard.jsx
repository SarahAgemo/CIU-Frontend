import React from 'react';
import ManageCard from './ManageCard.jsx'
import Manage from './ManagementCard.module.css';

export default function ManagementCard() {
  const manageItems = [
    { title: 'Manage Students', link: '/table' },
    { title: 'Manage Lecturers', link: '/users' },
    { title: 'Manage Admin', link: '/adminuser' }
  ];

  return (
    <div className={Manage["overall"]}>
    <div className={Manage["dashboard"]}>
      <h2 className={Manage["dashboard-title"]}>Manage Users</h2>
      <div className={Manage["manage-grid"]}>
        {manageItems.map((item, index) => (
          <ManageCard
            key={index}
            title={item.title}
            link={item.link}
          />
        ))}
      </div>
    </div>
    </div>
  );
}


