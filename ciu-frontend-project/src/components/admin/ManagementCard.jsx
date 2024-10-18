import React from 'react';
import { Users, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import Manage from './ManagementCard.module.css';

export default function ManagementCard({ title, icon, to }) {
  const Icon = icon === 'users' ? Users : User;

  return (
    <Link to={to} className={Manage["management-card"]} aria-label={`Manage ${title}`}>
      <Icon size={60} />
      <h3>{title}</h3>
    </Link>
  )
}

