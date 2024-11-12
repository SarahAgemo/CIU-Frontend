// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons for edit and delete

// function ManualQuestionsPreview() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]);
//   const [error, setError] = useState('');
//   const [selectedAnswers, setSelectedAnswers] = useState({}); // Track selected answers

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         console.log('Fetching questions for exam paper ID:', id);
//         const response = await fetch(`http://localhost:3000/manual-exam-paper/${id}/questions`);
//         if (!response.ok) throw new Error('Failed to fetch questions');

//         const data = await response.json();
//         console.log('Fetched questions:', data);

//         if (Array.isArray(data)) {
//           setQuestions(data);
//         } else {
//           throw new Error('Unexpected data format');
//         }
//       } catch (error) {
//         console.error('Error fetching questions:', error);
//         setError('Error fetching questions: ' + error.message);
//       }
//     };

//     fetchQuestions();
//   }, [id]);

//   const handleDeleteQuestion = async (questionId) => {
//     if (window.confirm('Are you sure you want to delete this question?')) {
//       try {
//         console.log(`Attempting to delete question ID: ${questionId} from exam paper ID: ${id}`);
//         const response = await fetch(`http://localhost:3000/manual-exam-paper/${id}/question/${questionId}`, {
//           method: 'DELETE',
//         });
        
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(`Failed to delete question: ${errorData.message || response.statusText}`);
//         }
        
//         setQuestions(questions.filter(q => q.id !== questionId));
//         console.log(`Question ${questionId} deleted successfully`);
//       } catch (error) {
//         console.error('Error deleting question:', error);
//         setError('Error deleting question: ' + error.message);
//       }
//     }
//   };

//   const handleEditQuestion = (questionId) => {
//     navigate(`/manual-exam-paper/${id}/question/${questionId}`);
//   };

//   const handleOptionChange = (questionId, selectedOption) => {
//     setSelectedAnswers((prevSelectedAnswers) => ({
//       ...prevSelectedAnswers,
//       [questionId]: selectedOption,
//     }));
//   };

//   if (error) return <div className="alert alert-danger">{error}</div>;
//   if (!questions.length) return <div>No questions found.</div>;

//   return (
//     <div className="container mt-5">
//       <h3>Questions Preview</h3>
//       <p>Total Questions: {questions.length}</p>
//       {questions.map((question) => (
//         <div key={question.id} className="question-card mb-3" style={{ textAlign: 'left' }}> {/* Ensured text aligns to the left */}
//           <div className="question-content" style={{ display: 'flex', alignItems: 'center' }}>
//             <strong>Q{question.id}: </strong> {question.content}
//           </div>
//           <form className="question-options" style={{ display: 'flex', flexDirection: 'column', marginBottom: '0' }}>
//             {question.options.map((option, index) => (
//               <div key={index} className="form-check" style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
//                 <input
//                   className="form-check-input me-1" // Adjusted margin to reduce space
//                   type="radio"
//                   name={`question-${question.id}`} // Group radio buttons by question ID
//                   id={`question-${question.id}-option-${index}`}
//                   value={option}
//                   checked={selectedAnswers[question.id] === option} // Only check if user selects this option
//                   onChange={() => handleOptionChange(question.id, option)} // Handle user selection
//                   style={{ marginRight: '2px' }} // Further reduced space between radio button and label
//                 />
//                 <label className="form-check-label" htmlFor={`question-${question.id}-option-${index}`}>
//                   {option}
//                 </label>
//               </div>
//             ))}
//           </form>
//           <div className="question-answer" style={{ marginTop: '5px' }}>
//             <strong>Correct Answer:</strong> {question.answer}
//           </div>
//           <div className="question-actions d-flex" style={{ marginTop: '5px' }}>
//             <button onClick={() => handleEditQuestion(question.id)} className="btn btn-warning me-1">
//               <FaEdit />
//             </button>
//             <button onClick={() => handleDeleteQuestion(question.id)} className="btn btn-warning me-1">
//               <FaTrash />
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

  
// }

// export default ManualQuestionsPreview;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';

function ManualQuestionsPreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Dialog state
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    questionId: null
  });

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  const handleSnackbar = (message, severity = 'info') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const closeSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log('Fetching questions for exam paper ID:', id);
        const response = await fetch(`http://localhost:3000/manual-exam-paper/${id}/questions`);
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
        handleSnackbar('Error fetching questions: ' + error.message, 'error');
      }
    };

    fetchQuestions();
  }, [id]);

  const handleDeleteQuestion = async (questionId) => {
    setDeleteDialog({
      open: true,
      questionId
    });
  };

  const confirmDelete = async () => {
    const questionId = deleteDialog.questionId;
    try {
      console.log(`Attempting to delete question ID: ${questionId} from exam paper ID: ${id}`);
      const response = await fetch(`http://localhost:3000/manual-exam-paper/${id}/question/${questionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to delete question: ${errorData.message || response.statusText}`);
      }

      setQuestions(questions.filter(q => q.id !== questionId));
      handleSnackbar('Question deleted successfully', 'success');
      console.log(`Question ${questionId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting question:', error);
      handleSnackbar('Error deleting question: ' + error.message, 'error');
    } finally {
      setDeleteDialog({ open: false, questionId: null });
    }
  };

  const handleEditQuestion = (questionId) => {
    navigate(`/manual-exam-paper/${id}/question/${questionId}`);
  };

  const handleOptionChange = (questionId, selectedOption) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: selectedOption,
    }));
  };

  if (!questions.length) return <div>No questions found.</div>;

  return (
    <div className="container mt-5">
      {/* Snackbar Component */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ width: '50%' }}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, questionId: null })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this question? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, questionId: null })}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <h3>Questions Preview</h3>
      <p>Total Questions: {questions.length}</p>
      {questions.map((question) => (
        <div key={question.id} className="question-card mb-3" style={{ textAlign: 'left' }}>
          <div className="question-content" style={{ display: 'flex', alignItems: 'center' }}>
            <strong>Q{question.id}: </strong> {question.content}
          </div>
          <form className="question-options" style={{ display: 'flex', flexDirection: 'column', marginBottom: '0' }}>
            {question.options.map((option, index) => (
              <div key={index} className="form-check" style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
                <input
                  className="form-check-input me-1"
                  type="radio"
                  name={`question-${question.id}`}
                  id={`question-${question.id}-option-${index}`}
                  value={option}
                  checked={selectedAnswers[question.id] === option}
                  onChange={() => handleOptionChange(question.id, option)}
                  style={{ marginRight: '2px' }}
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

export default ManualQuestionsPreview;
