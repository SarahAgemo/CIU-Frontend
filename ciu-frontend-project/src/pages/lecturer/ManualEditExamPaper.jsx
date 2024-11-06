import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./ManualEditExamPaper.css";

function ManualEditExamPaper() {
  // Extract both `id` (exam paper ID) and `questionId` (specific question ID)
  const { id, questionId } = useParams(); 
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/manual-exam-paper/${id}/question/${questionId}`);
        if (!response.ok) throw new Error('Failed to fetch question');
        const data = await response.json();
        setQuestionData(data); // Change this line to use setQuestionData
      } catch (error) {
        setError('Error fetching question: ' + error.message);
      }
    };
  
    if (id && questionId) {
      fetchQuestionData(); // Only call if both id and questionId are available
    } else {
      setError("Invalid question or exam paper ID.");
    }
  }, [id, questionId]);
  

  const handleQuestionUpdate = async (updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/manual-exam-paper/${id}/question/${questionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error('Failed to update question');
      setSuccess('Question updated successfully!');
    } catch (error) {
      setError('Error updating question: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        content: questionData.content,
        options: questionData.options,
        answer: questionData.answer,
      };
      await handleQuestionUpdate(updatedData);
      navigate(`/manual-exam-paper/${id}/questions`); // Redirect after success
    } catch (error) {
      setError('Error updating question: ' + error.message);
    }
  };

  return (
//     <div className="container mt-5">
//       <h3>Edit Question</h3>
//       {error && <div className="alert alert-danger">{error}</div>}
//       {success && <div className="alert alert-success">{success}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="mt-3">
//           <label>Question:</label>
//           <input
//             type="text"
//             name="content"
//             value={questionData.content || ''} 
//             onChange={(e) => setQuestionData({ ...questionData, content: e.target.value })}
//             className="form-control"
//           />
//           <label>Options:</label>
//           {questionData.options && questionData.options.map((option, index) => (
//             <div key={index}>
//               <input
//                 type="text"
//                 name={`option_${index}`}
//                 value={option || ''} 
//                 onChange={(e) => {
//                   const updatedOptions = [...questionData.options];
//                   updatedOptions[index] = e.target.value;
//                   setQuestionData({ ...questionData, options: updatedOptions });
//                 }}
//                 className="form-control mt-1"
//               />
//             </div>
//           ))}
//           <label>Answer:</label>
//           <input
//             type="text"
//             name="answer"
//             value={questionData.answer || ''} 
//             onChange={(e) => setQuestionData({ ...questionData, answer: e.target.value })}
//             className="form-control mt-1"
//           />
//         </div>
//         <button type="submit" className="btn btn-primary mt-3">Save</button>
//       </form>
//     </div>
//   );
// }

<div className="edit-question-container mt-5">
  <h3 className="edit-question-header">Edit Question</h3>
  {error && <div className="edit-question-alert edit-question-alert-danger">{error}</div>}
  {success && <div className="edit-question-alert edit-question-alert-success">{success}</div>}
  <form onSubmit={handleSubmit}>
    <div className="edit-question-form-group mt-3">
      <label className="edit-question-label">Question:</label>
      <input
        type="text"
        name="content"
        value={questionData.content || ''} 
        onChange={(e) => setQuestionData({ ...questionData, content: e.target.value })}
        className="edit-question-input"
      />
      
      <label className="edit-question-label">Options:</label>
      {questionData.options && questionData.options.map((option, index) => (
        <div key={index}>
          <input
            type="text"
            name={`option_${index}`}
            value={option || ''} 
            onChange={(e) => {
              const updatedOptions = [...questionData.options];
              updatedOptions[index] = e.target.value;
              setQuestionData({ ...questionData, options: updatedOptions });
            }}
            className="edit-question-option-input mt-1"
          />
        </div>
      ))}
      
      <label className="edit-question-label">Answer:</label>
      <input
        type="text"
        name="answer"
        value={questionData.answer || ''} 
        onChange={(e) => setQuestionData({ ...questionData, answer: e.target.value })}
        className="edit-question-input mt-1"
      />
    </div>
    <button type="submit" className="edit-question-button mt-3">Save</button>
  </form>
</div>
 );
}

export default ManualEditExamPaper;
