import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Header from '../../components/lecturer/HeaderPop';
import Sidebar from '../../components/lecturer/SideBarPop';
import MobileMenu from "../../components/lecturer/MobileMenu";
import './PublishedExamList.css';
import Dash from "../../components/lecturer/LecturerDashboard.module.css";

const PublishedExamList = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [examPapers, setExamPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const fetchPublishedExamPapers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/question-bank/published-assessments');
      if (!response.ok) throw new Error('Failed to fetch published exam papers');
      const data = await response.json();
      setExamPapers(data);
    } catch (error) {
      console.error('Error fetching published exam papers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublishedExamPapers();
  }, []);

  const handleAddToBank = async (exam) => {
    setLoading(true);
    try {
      const examId = Number(exam.id);
      if (isNaN(examId)) throw new Error('Invalid exam ID');

      const response = await fetch(`http://localhost:3000/question-bank?courseUnit=${encodeURIComponent(exam.courseUnit)}`);
      if (!response.ok) throw new Error('Failed to check existing question banks');
      const existingBanks = await response.json();

      if (existingBanks.length > 0) {
        const bankId = Number(existingBanks[0].id);
        const addResponse = await fetch(`http://localhost:3000/question-bank/${bankId}/questions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ assessmentId: examId, courseUnit: exam.courseUnit }),
        });
//hahhahhhahahaha
        if (!addResponse.ok) {
          const errorData = await addResponse.json();
          throw new Error(errorData.message || 'Failed to add to existing bank');
        }
      } else {
        const createResponse = await fetch('http://localhost:3000/question-bank', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            assessmentId: examId,
            courseUnit: exam.courseUnit,
            title: `${exam.courseUnit} Question Bank`,
          }),
        });

        if (!createResponse.ok) {
          const errorData = await createResponse.json();
          throw new Error(errorData.message || 'Failed to create new bank');
        }
      }

      navigate('/question-bank');
    } catch (error) {
      console.error('Error adding to question bank:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className={Dash.overall}>
      <div className={Dash.dashboard}>
        <Header  toggleMobileMenu={toggleMobileMenu} isMobile={isMobile}/>
        <div className={Dash["dashboard-content"]}>
          {!isMobile && <Sidebar />}
          {isMobile && (
            <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          )}
          <div className={Dash["form-container"]}>
            <h3>Published Exam Papers</h3>
            <table className="glass-table">
              <thead>
                <tr>
                  <th>CourseUnit</th>
                  <th>Title</th>
                  <th>Instructions</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {examPapers.map((exam) => (
                  <tr key={exam.id}>
                    <td>{exam.courseUnit}</td>
                    <td>{exam.title}</td>
                    <td>{exam.description}</td>
                    <td className="space-x-2">
                      <button
                        className="preview-button"
                        onClick={() => navigate(`/exam-paper/${exam.id}`)}
                        disabled={loading}
                      >
                        Preview
                      </button>
                      <button
                        className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:bg-gray-400"
                        onClick={() => handleAddToBank(exam)}
                        disabled={loading}
                      >
                        <Plus className="w-4 h-4" />
                        Add to Bank
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishedExamList;
