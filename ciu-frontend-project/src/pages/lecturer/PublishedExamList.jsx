import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../../components/admin/ExamList.css'; 

function PublishedExamList() {
  const [examPapers, setExamPapers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchPublishedExamPapers = async () => {
      try {
        const response = await fetch('http://localhost:3000/exam-paper?isDraft=false');
        if (!response.ok) throw new Error('Failed to fetch published exam papers');
        const data = await response.json();
        setExamPapers(data);
      } catch (error) {
        setError('Error fetching published exam papers: ' + error.message);
      }
    };

    fetchPublishedExamPapers();
  }, []);

  const handlePreview = (examId) => {
    navigate(`/exam-paper/${examId}`); // Navigate to the preview page for the selected exam
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!examPapers.length) return <div>No published exam papers found.</div>;

  return (
    <div className="exam-list-container">
      <h3>Published Exam Papers</h3>
      <table className="glass-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {examPapers.map((exam) => (
            <tr key={exam.id}>
              <td>{exam.title}</td>
              <td>{exam.description}</td>
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

export default PublishedExamList;
