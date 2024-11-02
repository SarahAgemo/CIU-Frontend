import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ExamList.css';


function ExamList() {
  const [examPapers, setExamPapers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchExamPapers = async () => {
      try {
        const response = await fetch('http://localhost:3000/exam-paper');
        if (!response.ok) throw new Error('Failed to fetch exam papers');
        const data = await response.json();
        setExamPapers(data);
      } catch (error) {
        setError('Error fetching exam papers: ' + error.message);
      }
    };

    fetchExamPapers();
  }, []);

  const handlePreview = (examId) => {
    navigate(`/exam-paper/${examId}`); // Navigate to the preview page for the selected exam
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!examPapers.length) return <div>Loading...</div>;

  return (
    <div className="exam-list-container">
      <h3>Exam Papers</h3>
      <table className="glass-table">
        <thead>
          <tr>
            <th>Course Unit</th>
            <th>Title</th>
            <th>Instructions</th>
            <th>Status</th> {/* Added Status Column */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {examPapers.map((exam) => (
            <tr key={exam.id}>
              <td>{exam.courseUnit}</td>
              <td>{exam.title}</td>
              <td>{exam.description}</td>
              <td>
                <button className={`status-button ${exam.isDraft ? 'draft' : 'published'}`}>
                  {exam.isDraft ? 'Draft' : 'Published'}
                </button>
              </td>
              <td>
                <button className="preview-button" onClick={() => handlePreview(exam.id)}>
                  Preview
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExamList;
