import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import DoExam from './DoExamContent.module.css';

// Function to fetch exams from both endpoints
const fetchAvailableExams = async () => {
    const csvResponse = await fetch('http://localhost:3000/exam-paper');
    const manualResponse = await fetch('http://localhost:3000/manualAssessment');

    // Check if the responses are successful
    if (!csvResponse.ok || !manualResponse.ok) {
        throw new Error('Failed to fetch exams');
    }

    const csvExams = await csvResponse.json();
    const manualExams = await manualResponse.json();

    // Combine both exam lists
    return [...csvExams, ...manualExams];
};

const ExamCard = ({ exam }) => {
    const scheduledDate = new Date(exam.scheduledDate);
    const startTime = new Date(exam.startTime);
    const endTime = new Date(exam.endTime);

    return (
        <div className={DoExam["exam-card"]}>
            <h3>{exam.title}</h3>
            <div className={DoExam["exam-details"]}>
                <p><strong>Description:</strong> {exam.description}</p>
                <p><strong>Scheduled Date:</strong> {scheduledDate.toLocaleDateString()}</p>
                <p><strong>Duration:</strong> {exam.duration} minutes</p>
                <p><strong>Start Time:</strong> {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p><strong>End Time:</strong> {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p><strong>Course Unit:</strong> {exam.courseUnit}</p>
                <p><strong>Course Unit Code:</strong> {exam.courseUnitCode}</p>
            </div>
            <div className={DoExam["exam-actions"]}>
                <button className={DoExam["do-exam-btn"]}>DO EXAM</button>
                <a href="#" className={DoExam["schedule-reminder"]}>
                    Schedule Reminder <Clock size={16} />
                </a>
            </div>
        </div>
    );
};

export default function MainContent() {
    const [availableExams, setAvailableExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const loadExams = async () => {
        try {
          const exams = await fetchAvailableExams(); // Fetch exam data from both endpoints
          setAvailableExams(exams);
        } catch (err) {
          setError(err.message); // Capture any errors
        } finally {
          setLoading(false); // Stop loading
        }
      };
      loadExams();
    }, []);
  
    if (loading) return <p>Loading exams...</p>;
    if (error) return <p>Error: {error}</p>;

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
}
