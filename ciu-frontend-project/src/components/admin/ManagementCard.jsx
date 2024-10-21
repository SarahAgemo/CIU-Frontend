import React from 'react';
import { Users, User } from 'lucide-react'; // Icons from lucide-react
import { Link } from 'react-router-dom'; // Import Link for navigation
import styles from './ManagementCard.module.css'; // Import CSS module for styling

export default function ManagementCard({ title, icon, link }) {
  // Use either the 'Users' or 'User' icon based on the 'icon' prop
  const Icon = icon === 'users' ? Users : User;

  return (
    <Link to={link} className={styles["management-card"]} aria-label={`Manage ${title}`}>
      <div className={styles["management-card-content"]}>
        <Icon size={60} />
        <h3>{title}</h3>
      </div>
    </Link>
  );
}
