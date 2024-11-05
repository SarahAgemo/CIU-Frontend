import React from 'react';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ManageCard.css';

function ManageCard({ title, link }) {
  return (
    <Link to={link} className="manage-card">
      <div className="manage-content">
        <User className="manage-icon" />
        <h3 className="manage-title">{title}</h3>
      </div>
    </Link>
  );
}

export default ManageCard;