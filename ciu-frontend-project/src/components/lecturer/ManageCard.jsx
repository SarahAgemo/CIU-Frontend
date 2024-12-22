
import React from 'react';
import { useNavigate } from 'react-router-dom'
import Card from './ManageCard.module.css';

export default function ManageCard({ title, to, onClick, icon }) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    }
  };

  return (
    <button 
      className={Card.card}
      onClick={handleClick}
      aria-label={title}
    >
      <span className={Card.icon} role="img" aria-label={title}>{icon}</span>
      <span className={Card.title}>{title}</span>
    </button>
  )
}

