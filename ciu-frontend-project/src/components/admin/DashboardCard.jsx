import React from 'react';

export default function DashboardCard({ title, value, icon }) {
  return (
    <div className="dashboard-card">
      <div className="card-content">
        <div className="card-text">
          <h3>{title}</h3>
          <p>{value}</p>
        </div>
        <div className="card-icon">{icon}</div>
      </div>
    </div>
  );
}