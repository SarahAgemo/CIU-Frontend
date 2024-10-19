import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import DoExam from './DoExamContent.module.css'

// Mock API call to fetch available exams
const fetchAvailableExams = async () => {
    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      {
        id: 1,
        title: 'MACRO ECONOMICS',
        program: 'Accounting',
        datePublished: '02/09/2024',
        startingDate: '26/09/2024',
        startingTime: '2:00 p.m.',
        duration: '3 hour',
        status: 'Not Started'
      },
      {
        id: 2,
        title: 'CALCULUS',
        program: 'Procurement',
        datePublished: '02/09/2024',
        startingDate: '04/10/2024',
        startingTime: '10:00 a.m.',
        duration: '1 hour 30 minutes',
        status: 'Not Started'
      }
    ];
  };

const ExamCard = ({ exam }) => (
    <div className={DoExam["exam-card"]}>
      <h3>{exam.title}</h3>
      <div className={DoExam["exam-details"]}>
        <p><strong>Program:</strong> {exam.program}</p>
        <p><strong>Date Published:</strong> {exam.datePublished}</p>
        <p><strong>Starting Date:</strong> {exam.startingDate}</p>
        <p><strong>Starting Time:</strong> {exam.startingTime}</p>
        <p><strong>Duration:</strong> {exam.duration}</p>
        <p><strong>Status:</strong> {exam.status}</p>
      </div>
      <div className={DoExam["exam-actions"]}>
        <button className={DoExam["do-exam-btn"]}>DO EXAM</button>
        <a href="#" className={DoExam["schedule-reminder"]}>
          Schedule Reminder <Clock size={16} />
        </a>
      </div>
    </div>
);

export default function MainContent() {

    const [availableExams, setAvailableExams] = useState([]);
  
    useEffect(() => {
      const loadExams = async () => {
        const exams = await fetchAvailableExams(); // Mock API call to fetch exam data
        setAvailableExams(exams);
      };
      loadExams();
    }, []);
  
    return (
      <main className={DoExam["main-content"]}>
        <h2 className={DoExam["page-title"]}>AVAILABLE EXAMS</h2>
        <div className={DoExam["exam-list"]}>
          {availableExams.map(exam => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      </main>
    );
};

