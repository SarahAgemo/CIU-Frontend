import React from 'react';
import ManageCard from './ManageCard.jsx'
import Manage from './ManagementCard.module.css';

export default function ManagementCard({ onOpenCreateExamModal, onOpenUploadExamModal }) {
  const cards = [
    { title: 'Create Assessment', action: onOpenCreateExamModal, icon: '📝' },
    { title: 'Upload Assessment', action: onOpenUploadExamModal, icon: '📤' },
    { title: 'View Exam List', path: '/schedule-upload-exams/exam-list', icon: '📋' },
    { title: 'Published Exams', path: '/published-exam-papers', icon: '📢' },
    { title: 'Completed Exams', path: '/completed-Assessments', icon: '✅' }
  ];

  return (
    <div className={Manage.container}>
      <h1 className={Manage.title}>MANAGE EXAMS</h1>
      <div className={Manage.grid}>
        {cards.map((card, index) => (
          <ManageCard
            key={index}
            title={card.title}
            to={card.path}
            onClick={card.action}
            icon={card.icon}
          />
        ))}
      </div>
    </div>
  )
}

