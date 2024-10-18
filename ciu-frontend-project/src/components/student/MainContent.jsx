import React, { useState, useEffect } from 'react';
import { Search, FileText, ClipboardList, MessageSquare, X } from 'lucide-react';
import Main from './MainContent.module.css'

// Mock API call to fetch upcoming exam data
const fetchUpcomingExams = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, date: '17/08/2023', time: '8:00 a.m. - 9:00 a.m.', exam: 'Macro Economics Quiz' },
    { id: 2, date: '17/08/2023', time: '2:00 p.m. - 4:00 p.m.', exam: 'Logistics Exam' },
    { id: 3, date: '18/08/2023', time: '10:00 a.m. - 11:30 a.m.', exam: 'Marketing Strategy Test' },
  ];
};

// Mock API call to fetch completed exam data
const fetchCompletedExams = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, subject: 'Logistics', dateSubmitted: '10/08/2024', timeSubmitted: '10:55 a.m.', status: 'Graded', results: 'View' },
    { id: 2, subject: 'Macro Economics', dateSubmitted: '15/08/2024', timeSubmitted: '4:00 p.m.', status: 'Reviewing', results: 'View' },
  ];
};

const UpcomingExamsTable = ({ exams }) => (
  <div className={Main["exams-table"]}>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Exam</th>
        </tr>
      </thead>
      <tbody>
        {exams.map(exam => (
          <tr key={exam.id}>
            <td>{exam.date}</td>
            <td>{exam.time}</td>
            <td>{exam.exam}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CompletedExamsTable = ({ exams }) => (
  <div className={Main["exams-table"]}>
    <table>
      <thead>
        <tr>
          <th>Subject</th>
          <th>Date Submitted</th>
          <th>Time Submitted</th>
          <th>Status</th>
          <th>Results</th>
        </tr>
      </thead>
      <tbody>
        {exams.map(exam => (
          <tr key={exam.id}>
            <td>{exam.subject}</td>
            <td>{exam.dateSubmitted}</td>
            <td>{exam.timeSubmitted}</td>
            <td>{exam.status}</td>
            <td>
              <button className={`view-results ${exam.status.toLowerCase()}`}>
                {exam.results}
              </button>
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
  const [completedExams, setCompletedExams] = useState([]);

  useEffect(() => {
    const loadExams = async () => {
      const upcoming = await fetchUpcomingExams();
      const completed = await fetchCompletedExams();
      setUpcomingExams(upcoming);
      setCompletedExams(completed);
    };
    loadExams();
  }, []);

  const handleCardClick = (modalType) => {
    setActiveModal(modalType);
  };

  return (
    <main className={Main["main-content"]}>
      <div className={Main["welcome-banner"]}>
        <div className={Main["image-group"]}>
          <img src="977A9972-min.jpg" alt="Students" className={Main["banner-image"]} />
        </div>
        <div className={Main["welcome-overlay"]}>
          <h2>Welcome back!</h2>
          <p>Do your exams from wherever you are</p>
          <div className={Main["search-bar"]}>
            <Search size={20} />
            <input type="text" placeholder="Search..." />
          </div>
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
        <DashboardCard icon={<MessageSquare size={48} />} title="Messages" badge="1" />
      </div>
      <Modal 
        isOpen={activeModal === 'upcoming'} 
        onClose={() => setActiveModal(null)}
        title="UPCOMING EXAMS"
      >
        <UpcomingExamsTable exams={upcomingExams} />
      </Modal>
      <Modal 
        isOpen={activeModal === 'completed'} 
        onClose={() => setActiveModal(null)}
        title="COMPLETED EXAMS"
      >
        <CompletedExamsTable exams={completedExams} />
      </Modal>
    </main>
  );
}
