
import React, { useState, useEffect } from 'react';
import { Search, FileText, ClipboardList, MessageSquare, X } from 'lucide-react';
import axios from 'axios';
import Main from './MainContent.module.css';

// API call to fetch upcoming exams only
const fetchUpcomingExams = async () => {
  try {
    const response = await axios.get('http://localhost:3000/upcoming-exams');  // Assuming this endpoint fetches only upcoming exams
    return response.data;  // Return the list of upcoming exams
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
          <th>Exam</th>
          <th>Course</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {exams.map(exam => (
          <tr key={exam.id}>
            <td>{new Date(exam.scheduledDate).toLocaleDateString()}</td>
            <td>{new Date(exam.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(exam.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
            <td>{exam.title}</td>
            <td>{exam.course.courseName}</td>
            <td>
              <button className={Main["do-exam-btn"]}>Do Exam</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className={Main["modal-overlay"]}>
      <div className={Main["modal-content"]}>
        <button className={Main["modal-close"]} onClick={onClose}>
          <X size={24} />
        </button>
        <h2 className={Main["modal-title"]}>{title}</h2>
        {children}
      </div>
    </div>
  );
};

function DashboardCard({ icon, title, badge, onClick, isActive }) {
  return (
    <div className={`${Main["dashboard-card"]} ${isActive ? Main["active"] : ''}`}
      onClick={onClick}>
      <div className={Main["card-icon"]}>{icon}</div>
      <h3>{title}</h3>
      {badge && <span className={Main["badge"]}>{badge}</span>}
    </div>
  );
}

export default function MainContent() {
  const [activeModal, setActiveModal] = useState(null);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch upcoming exams only once component is mounted
  useEffect(() => {
    const loadUpcomingExams = async () => {
      try {
        const exams = await fetchUpcomingExams();  // Fetch upcoming exams only
        setUpcomingExams(exams);
      } catch (err) {
        setError('Failed to fetch upcoming exams: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUpcomingExams();
  }, []);

  const handleCardClick = (modalType) => {
    setActiveModal(modalType);
  };

  if (loading) return <p>Loading upcoming exams...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className={Main["main-content"]}>
      <div className={Main["welcome-banner"]}>
        <div className={Main["image-group"]}>
          <img src="977A9972-min.jpg" alt="Students" className={Main["banner-image"]} />
        </div>
        <div className={Main["welcome-overlay"]}>
          <h2>Welcome back!</h2>
          <p>Do your exams from wherever you are</p>
          {/* <div className={Main["search-bar"]}>
            <Search size={20} />
            <input type="text" placeholder="Search..." />
          </div> */}
        </div>
      </div>

      <div className={Main["dashboard-cards"]}>
        <DashboardCard 
          icon={<FileText size={48} />} 
          title="Upcoming Exams" 
          onClick={() => handleCardClick('upcoming')}
          isActive={activeModal === 'upcoming'}
        />
        <DashboardCard 
          icon={<ClipboardList size={48} />} 
          title="Completed Exams" 
          onClick={() => handleCardClick('completed')}
          isActive={activeModal === 'completed'}
        />
        {/* <DashboardCard icon={<MessageSquare size={48} />} title="Messages" badge="1" /> */}
      </div>

      {/* Modal for Upcoming Exams */}
      <Modal 
        isOpen={activeModal === 'upcoming'} 
        onClose={() => setActiveModal(null)}
        title="Upcoming Exams"
      >
        <UpcomingExamsTable exams={upcomingExams} />
      </Modal>
    </main>
  );
}
