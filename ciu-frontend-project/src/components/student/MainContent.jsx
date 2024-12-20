import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import axios from 'axios';
import Main from './MainContent.module.css';

const fetchUpcomingExams = async () => {
  try {
    const response = await axios.get('https://c-i-u-backend.onrender.com/exam-paper?isDraft=false');
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming exams:', error);
    return [];
  }
};

const UpcomingExamsTable = ({ exams }) => (
  <div className={Main["exams-table"]}>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Exam Title</th>
          <th>Course Unit</th>
        </tr>
      </thead>
      <tbody>
        {exams.map(exam => (
          <tr key={exam.id}>
            <td>{new Date(exam.scheduledDate).toLocaleDateString()}</td>
            <td>{new Date(exam.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(exam.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
            <td>{exam.title}</td>
            <td>{exam.courseUnit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

function DashboardCard({ icon, title }) {
  return (
    <div className={Main["dashboard-card"]}>
      <div className={Main["card-icon"]}>{icon}</div>
      <h3>{title}</h3>
    </div>
  );
}

export default function MainContent() {
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentCourses, setStudentCourses] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const studentData = localStorage.getItem("user");
        if (!studentData) {
          throw new Error("No student data found in localStorage.");
        }

        const student = JSON.parse(studentData);
        const response = await axios.get(`https://c-i-u-backend.onrender.com/students/${student.id}`);
        const studentDetails = response.data;

        if (!studentDetails.courseId) {
          throw new Error("No courses registered for the student.");
        }

        const courses = Array.isArray(studentDetails.courseId) ? studentDetails.courseId : [studentDetails.courseId];
        setStudentCourses(courses);

        const exams = await fetchUpcomingExams();
        setUpcomingExams(exams);

        const filtered = exams.filter(exam => courses.includes(exam.courseId));
        setFilteredExams(filtered);
        setLoading(false);

      } catch (err) {
        setError('Failed to fetch data: ' + err.message);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className={Main['loading-container']}>
        <div className={Main.spinner}></div>
      </div>
    );
  }
  if (error) return <p>Error: {error}</p>;

  return (
    <main className={Main["main-content"]}>
      <div className={Main["welcome-banner"]}>
        <div className={Main["image-group"]}>
          <img src="IMG-20241106-WA0063.jpg" alt="Students" className={Main["banner-image"]} />
        </div>
        <div className={Main["welcome-overlay"]}>
          <h2>Welcome back!</h2>
          <p>Do your exams from wherever you are</p>
        </div>
      </div>

      <div className={Main["upcoming-exams-section"]}>
        <h2 className={Main["section-title"]}>Upcoming Exams</h2>
        <UpcomingExamsTable exams={filteredExams} />
      </div>
    </main>
  );
}

