
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoExam from './DoExamContent.module.css';
import axios from 'axios';

const LoadingSpinner = () => (
  <div className={DoExam.spinner}></div>
);


// Function to fetch available exams from the backend
const fetchAvailableExams = async () => {
    const response = await fetch('http://localhost:3000/exam-paper?isDraft=false');
    if (!response.ok) {
        throw new Error('Failed to fetch exams');
    }
    return await response.json();
};

// ExamCard component for rendering each exam
const ExamCard = ({ exam, onDoExam }) => {
    const scheduledDate = new Date(exam.scheduledDate);
    const now = new Date();
    const startTime = new Date(exam.startTime);
    const endTime = new Date(exam.endTime);

    // Check if the button should be enabled
    // const isButtonDisabled = !(now >= scheduledDate && now >= startTime);

    return (
        <div className={DoExam["exam-card"]}>
            <h3>{exam.title}</h3>
            <div className={DoExam["exam-details"]}>
                <p><strong>Exam Instruction:</strong> {exam.description}</p>
                <p><strong>Scheduled Date:</strong> {scheduledDate.toLocaleDateString()}</p>
                <p><strong>Duration:</strong> {exam.duration}</p>
                <p><strong>Start Time:</strong> {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p><strong>End Time:</strong> {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p><strong>Course Unit:</strong> {exam.courseUnit}</p>
                <p><strong>Course Unit Code:</strong> {exam.courseUnitCode}</p>
                <p><strong>Course Name:</strong> {exam.courseName }</p>
            </div>
            <div className={DoExam["exam-actions"]}>
                <button
                    className={DoExam["do-exam-btn"]}
                    onClick={() => onDoExam(exam)}
                    // disabled={isButtonDisabled} // Disable the button if the exam is not yet available
                    disabled={isButtonDisabled} 
                    // Disable the button if the exam is not yet available
                >
                    DO EXAM
                </button>
                {/* <a href="#" className={DoExam["schedule-reminder"]}>
                    Schedule Reminder <Clock size={16} />
                </a> */}
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
                // Fetch the list of available exams
                const exams = await fetchAvailableExams();
                
                // Retrieve student data from localStorage
                const studentData = localStorage.getItem("user");
                if (!studentData) {
                    throw new Error("No student data found in localStorage.");
                }

                const student = JSON.parse(studentData);

                // Fetch student details from backend
                const response = await axios.get(`http://localhost:3000/students/${student.id}`);
                const studentDetails = response.data;

                if (!studentDetails.courseId) {
                    throw new Error("No courseId found in student data.");
                }

                const courses = await axios.get(`http://localhost:3000/coursesAdd`);
                const returncourses = courses.data;              
                  

                // Fetch courses data
                const coursesResponse = await axios.get(`http://localhost:3000/coursesAdd`);
                const returnCourses = coursesResponse.data;

                // Filter exams based on the student's courseId
                const filteredExams = exams.filter(exam => exam.courseId === studentDetails.courseId);

                // Add courseName to the exams by matching courseId with course data
                const finalStudentExams = filteredExams.map(studentExam => {
                    const course = returnCourses.find(course => course.id === studentExam.courseId);
                    return {
                        ...studentExam,
                        courseName: course ? course.courseName : 'Unknown Course',
                    };
                });

                // Get the list of submitted exams for this student from localStorage
                const submittedExamsByStudent = JSON.parse(localStorage.getItem('submittedExams')) || {};
                const studentSubmittedExams = submittedExamsByStudent[student.id] || [];

                // Filter out the exams that have already been submitted by this student
                const examsToDisplay = finalStudentExams.filter(exam => !studentSubmittedExams.includes(exam.id));

                setAvailableExams(examsToDisplay);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadExams();
    }, []);

    // Handle the action when the student clicks "DO EXAM"
    const handleDoExam = (exam) => {
        const studentData = localStorage.getItem("user");
        const student = JSON.parse(studentData);

        // Update submitted exams for this student in localStorage
        // const submittedExamsByStudent = JSON.parse(localStorage.getItem('submittedExams')) || {};
        // if (!submittedExamsByStudent[student.id]) {
        //     submittedExamsByStudent[student.id] = [];
        // }
        // submittedExamsByStudent[student.id].push(exam.id);
        // localStorage.setItem('submittedExams', JSON.stringify(submittedExamsByStudent));




        // Navigate to the proctoring page
        localStorage.setItem('exam', JSON.stringify(exam.id));
        navigate("/proctoring", { state: { exam } });
    };

    if (loading) return <LoadingSpinner />;
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
