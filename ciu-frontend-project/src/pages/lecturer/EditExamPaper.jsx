import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditExamPaper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [examData, setExamData] = useState({ questions: [] }); // Initialize questions as an empty array
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/exam-paper/${id}`);
        if (!response.ok) throw new Error('Failed to fetch exam paper');
        const data = await response.json();
        setExamData(data);
      } catch (error) {
        setError('Error fetching exam paper: ' + error.message);
      }
    };

    fetchExamData();
  }, [id]);

  const handleQuestionUpdate = async (questionId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/exam-paper/${id}/question/${questionId}`, {
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
      // Update each question
      for (let question of examData.questions) {
        const updatedData = {
          question: question.content,
          options: question.options,
          answer: question.answer,
        };
        await handleQuestionUpdate(question.id, updatedData); // Ensure question.id exists
      }
      setSuccess('Questions updated successfully!');
      navigate(`/exam-paper/${id}/questions`);
    } catch (error) {
      setError('Error updating questions: ' + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Edit Exam Paper</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        {examData.questions && examData.questions.map((question, index) => (
          <div key={index} className="mt-3">
            <label>Question {index + 1}:</label>
            <input
              type="text"
              name={`question_${index}`}
              value={question.content}
              onChange={(e) => {
                const updatedQuestions = [...examData.questions];
                updatedQuestions[index].content = e.target.value; // Changed from 'question' to 'content'
                setExamData({ ...examData, questions: updatedQuestions });
              }}
              className="form-control"
            />
            <label>Options:</label>
            {question.options.map((option, optIndex) => (
              <div key={optIndex}>
                <input
                  type="text"
                  name={`option_${index}_${optIndex}`}
                  value={option}
                  onChange={(e) => {
                    const updatedOptions = [...examData.questions[index].options];
                    updatedOptions[optIndex] = e.target.value;
                    const updatedQuestions = [...examData.questions];
                    updatedQuestions[index].options = updatedOptions;
                    setExamData({ ...examData, questions: updatedQuestions });
                  }}
                  className="form-control mt-1"
                />
              </div>
            ))}
            <label>Answer:</label>
            <input
              type="text"
              name={`answer_${index}`}
              value={question.answer}
              onChange={(e) => {
                const updatedQuestions = [...examData.questions];
                updatedQuestions[index].answer = e.target.value;
                setExamData({ ...examData, questions: updatedQuestions });
              }}
              className="form-control mt-1"
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary mt-3">Save</button>
      </form>
    </div>
  );
}

export default EditExamPaper;
