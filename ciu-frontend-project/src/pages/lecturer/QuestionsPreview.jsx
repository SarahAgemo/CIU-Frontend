import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons for edit and delete


function QuestionsPreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Track selected answers

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log('Fetching questions for exam paper ID:', id);
        const response = await fetch(`http://localhost:3000/exam-paper/${id}/questions`);
        if (!response.ok) throw new Error('Failed to fetch questions');

        const data = await response.json();
        console.log('Fetched questions:', data);

        if (Array.isArray(data)) {
          setQuestions(data);
        } else {
          throw new Error('Unexpected data format');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError('Error fetching questions: ' + error.message);
      }
    };

    fetchQuestions();
  }, [id]);

  const handleDeleteQuestion = async (questionId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        console.log(`Attempting to delete question ID: ${questionId} from exam paper ID: ${id}`);
        const response = await fetch(`http://localhost:3000/exam-paper/${id}/question/${questionId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to delete question: ${errorData.message || response.statusText}`);
        }
        
        setQuestions(questions.filter(q => q.id !== questionId));
        console.log(`Question ${questionId} deleted successfully`);
      } catch (error) {
        console.error('Error deleting question:', error);
        setError('Error deleting question: ' + error.message);
      }
    }
  };

  const handleEditQuestion = (questionId) => {
    navigate(`/exam-paper/${id}/question/${questionId}`);
  };

  const handleOptionChange = (questionId, selectedOption) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: selectedOption,
    }));
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!questions.length) return <div>No questions found.</div>;

  return (
    <div className="container mt-5">
      <h3>Questions Preview</h3>
      <p>Total Questions: {questions.length}</p>
      {questions.map((question) => (
        <div key={question.id} className="question-card mb-3" style={{ textAlign: 'left' }}> {/* Ensured text aligns to the left */}
          <div className="question-content" style={{ display: 'flex', alignItems: 'center' }}>
            <strong>Q{question.id}: </strong> {question.content}
          </div>
          <form className="question-options" style={{ display: 'flex', flexDirection: 'column', marginBottom: '0' }}>
            {question.options.map((option, index) => (
              <div key={index} className="form-check" style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
                <input
                  className="form-check-input me-1" // Adjusted margin to reduce space
                  type="radio"
                  name={`question-${question.id}`} // Group radio buttons by question ID
                  id={`question-${question.id}-option-${index}`}
                  value={option}
                  checked={selectedAnswers[question.id] === option} // Only check if user selects this option
                  onChange={() => handleOptionChange(question.id, option)} // Handle user selection
                  style={{ marginRight: '2px' }} // Further reduced space between radio button and label
                />
                <label className="form-check-label" htmlFor={`question-${question.id}-option-${index}`}>
                  {option}
                </label>
              </div>
            ))}
          </form>
          <div className="question-answer" style={{ marginTop: '5px' }}>
            <strong>Correct Answer:</strong> {question.answer}
          </div>
          <div className="question-actions d-flex" style={{ marginTop: '5px' }}>
            <button onClick={() => handleEditQuestion(question.id)} className="btn btn-warning me-1">
              <FaEdit />
            </button>
            <button onClick={() => handleDeleteQuestion(question.id)} className="btn btn-warning me-1">
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuestionsPreview;
