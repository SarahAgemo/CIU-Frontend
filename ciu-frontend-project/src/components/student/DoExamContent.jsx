// AvailableExams.js

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DoExam from './DoExamContent.module.css';
import axios from 'axios';

const fetchAvailableExams = async () => {
    const response = await fetch('http://localhost:3000/exam-paper?isDraft=false');
    if (!response.ok) {
        throw new Error('Failed to fetch exams');
    }
    return await response.json();
};

const ExamCard = ({ exam, onDoExam }) => {
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
                {/* <p><strong>Course ID:</strong> {exam.courseId}</p> */}
                <p><strong>Course Name:</strong> {exam.courseName }</p>
            </div>
            <div className={DoExam["exam-actions"]}>
                <button className={DoExam["do-exam-btn"]} onClick={() => onDoExam(exam)}>DO EXAM</button>
                <a href="#" className={DoExam["schedule-reminder"]}>
                    Schedule Reminder <Clock size={16} />
                </a>
            </div>
        </div>
    );
};

export default function AvailableExams() {
    const [availableExams, setAvailableExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadExams = async () => {
            try {
                const exams = await fetchAvailableExams();
                const studentData = localStorage.getItem("user");
                if (!studentData) {
                    throw new Error("No student data found in localStorage.");
                }

                const student = JSON.parse(studentData);
                const response = await axios.get(`http://localhost:3000/students/${student.id}`);
                const studentDetails = response.data;

                if (!studentDetails.courseId) {
                    throw new Error("No courseId found in student data.");
                }
            const courses = await axios.get(`http://localhost:3000/coursesAdd`);
            const returncourses = courses.data;

                  
                  

                const filteredExams = exams.filter(exam => exam.courseId === studentDetails.courseId);
                const finalStudentExams = filteredExams.map(studentExam => {
                    const exam = returncourses.find(course => course.id === studentExam.courseId);
                
                    return {
                        ...studentExam,
                        courseName: exam.courseName 
                    };
                });
                
                console.log(finalStudentExams);
                setAvailableExams(finalStudentExams);
            } catch (err) {
                setError(err.message);
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        loadExams();
    }, []);

    const handleDoExam = (exam) => {
        console.log(exam);
        localStorage.setItem('exam' ,exam.id);
        navigate("/proctoring", { state: { exam } });
    };

    if (loading) return <p>Loading exams...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main className={DoExam["main-content"]}>
            <h2 className={DoExam["page-title"]}>AVAILABLE EXAMS</h2>
            <div className={DoExam["exam-list"]}>
                {availableExams.length > 0 ? (
                    availableExams.map(exam => (
                        <ExamCard key={exam.id} exam={exam} onDoExam={handleDoExam} />
                    ))
                ) : (
                    <p>No published exams available to attempt.</p>
                )}
            </div>
        </main>
    );
}

