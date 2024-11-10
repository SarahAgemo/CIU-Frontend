import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

function PublishedExamList() {
  const [examPapers, setExamPapers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPublishedExamPapers();
  }, []);

  const fetchPublishedExamPapers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:3000/question-bank/published-assessments');
      if (!response.ok) throw new Error('Failed to fetch published exam papers');
      const data = await response.json();
      setExamPapers(data);
    } catch (error) {
      setError(`Error fetching published exam papers: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToBank = async (exam) => {
    setLoading(true);
    setError('');
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
      setError(`Error adding to question bank: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!examPapers.length) return <div>No published exam papers found.</div>;

  return (
    <div className="exam-list-container">
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
  );
}

export default PublishedExamList;
