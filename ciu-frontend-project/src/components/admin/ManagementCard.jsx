import React from 'react';
import { Users, User } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link for navigation

export default function ManagementCard({ title, icon, link }) {
  const Icon = icon === 'users' ? Users : User;

  return (
    <Link to={link} className="management-card"> {/* Wrap in Link for navigation */}
      <div className="management-card-content"> {/* Add a container for styling */}
        <Icon size={60} />
        <h3>{title}</h3>
      </div>
    </Link>
  );
}
