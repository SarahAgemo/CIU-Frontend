import React from 'react';
import { Users, User } from 'lucide-react';

export default function ManagementCard({ title, icon }) {
  const Icon = icon === 'users' ? Users : User;

  return (
    <div className="management-card">
      <Icon size={60} />
      <h3>{title}</h3>
    </div>
  );
}

