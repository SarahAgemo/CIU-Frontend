import React from 'react';
import Dash from './AdminDashboardCard.module.css'

export default function DashboardCard({ title, value, icon }) {
  return (
    <div className={Dash["dashboard-card"]}>
      <div className={Dash["card-content"]}>
        <div className={Dash["card-text"]}>
          <h3>{title}</h3>
          <p>{value}</p>
        </div>
        <div className={Dash["card-icon"]}>{icon}</div>
      </div>
    </div>
  );
}