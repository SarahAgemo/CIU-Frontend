// src/components/DashboardCard.jsx
import React from 'react';
import styles from './DashboardCard.module.css'; // Assuming styles are in the same folder

export default function DashboardCard({ title, value, icon }) {
  return (
    <div className={styles["dashboard-card"]}>
      <div className={styles["card-content"]}>
        <div className={styles["card-text"]}>
          <h3>{title}</h3>
          <p>{value}</p>
        </div>
        <div className={styles["card-icon"]}>{icon}</div>
      </div>
    </div>
  );
}
