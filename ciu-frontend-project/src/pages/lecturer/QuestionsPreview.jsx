import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../components/admin/CsvQuestionsPreview.css'; // Import the CSS file for styling

function QuestionsPreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:3000/exam-paper/${id}/questions`);
        if (!response.ok) throw new Error('Failed to fetch questions');

        const data = await response.json();
        console.log('Fetched questions:', data); // Log the fetched data

        // Ensure that data is in the expected format
        if (Array.isArray(data)) {
          setQuestions(data);
        } else {
          throw new Error('Unexpected data format');
        }
      } catch (error) {
        setError('Error fetching questions: ' + error.message);
      }
    };

    fetchQuestions();
  }, [id]);

  const handleDeleteQuestion = async (questionId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        const idToDelete = Number(questionId); // Ensure questionId is an integer
        const response = await fetch(`http://localhost:3000/exam-paper/${examPaperId}/question/${idToDelete}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete question');
        setQuestions(questions.filter(q => q.id !== idToDelete)); // Filter by integer id
      } catch (error) {
        setError('Error deleting question: ' + error.message);
      }
    }
  };
  

  const handleEditQuestion = (questionId) => {
    navigate(`/questions/${questionId}/edit`);
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!questions.length) return <div>No questions found.</div>;

  return (
    <div className="container mt-5">
      <h3>Questions Preview</h3>
      <p>Total Questions: {questions.length}</p>
      {questions.map((question) => (
        <div key={question.id} className="question-card">
          <div className="question-content">
            <strong>Q{question.id}: </strong> {question.content}
          </div>
          <div className="question-options">
            <strong>Options:</strong>
            <ul>
              {question.options.map((option, index) => (
                <li key={index}>{String.fromCharCode(97 + index)}){option}</li>
              ))}
            </ul>
          </div>
          <div className="question-answer">
            <strong>Answer:</strong> {question.answer}
          </div>
          <div className="question-actions">
            <button onClick={() => handleEditQuestion(question.id)} className="btn btn-warning">Edit</button>
            <button onClick={() => handleDeleteQuestion(question.id)} className="btn btn-danger">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuestionsPreview;
