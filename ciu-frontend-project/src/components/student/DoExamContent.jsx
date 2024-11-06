import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./DoExamContent.module.css"

function DoExamList() {
  const [examPapers, setExamPapers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetching published exams (drafts = false)
  useEffect(() => {
    const fetchPublishedExamPapers = async () => {
      try {
        const response = await fetch('http://localhost:3000/exam-paper?isDraft=false');
        if (!response.ok) throw new Error('Failed to fetch published exam papers');
        const data = await response.json();
        setExamPapers(data); // Store exams in state
      } catch (error) {
        setError('Error fetching published exam papers: ' + error.message);
      }
    };

    fetchPublishedExamPapers();
  }, []);

  // Function to navigate to the exam page for attempting the exam
  const handleDoExam = (examId) => {
    navigate(`/proctoring`); // Navigate to the "Do Exam" page for the selected exam
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!examPapers.length) return <div>No published exams available to attempt.</div>;

  return (
    <div className="exam-list-container"style={{ width: "100%" }}>
      <h3>Available Exams</h3>
      <table className="glass-table" style={{ width: "100%" }}>
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
              <td>
                <button className="/proctoring" onClick={() => handleDoExam(exam.id)}>
                  Do Exam
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DoExamList;
