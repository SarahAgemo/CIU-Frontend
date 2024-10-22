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

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }
  

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
