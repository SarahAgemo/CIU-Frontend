import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../components/admin/ExamList.css'; // Import the CSS file for styling

function ExamPaperPreview() {
  const { id } = useParams(); // Get the exam paper ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate
  const [examData, setExamData] = useState(null);
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

  const handleEdit = () => {
    navigate(`/exam-paper/${id}/edit`);
  };

  const handlePreviewQuestions = () => {
    navigate(`/exam-paper/${id}/questions`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this exam paper?')) {
      try {
        const response = await fetch(`http://localhost:3000/exam-paper/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          const errorData = await response.json(); // Parse the error response
          throw new Error(errorData.message); // Use the message from the error response
        }
        setSuccess('Exam paper deleted successfully');
        navigate('/exam-paper'); // Redirect to the exam papers list
      } catch (error) {
        setError('Error deleting exam paper: ' + error.message);
      }
    }
  };

  const handlePublish = async () => {
    try {
      const response = await fetch(`http://localhost:3000/exam-paper/${id}/publish`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // Assuming the backend responds with updated exam data
      const updatedExamData = await response.json();
      setSuccess('Exam paper published successfully');
      setExamData(updatedExamData); // Update local state with the published data

      // Redirect to the Published Exam Papers List page
      navigate('/published-exam-papers');
    } catch (error) {
      setError('Error publishing exam paper: ' + error.message);
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!examData) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h3>Exam Paper Preview</h3>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td><strong>Title</strong></td>
            <td>{examData.title}</td>
          </tr>
          <tr>
            <td><strong>Description</strong></td>
            <td>{examData.description}</td>
          </tr>
          <tr>
            <td><strong>Course ID</strong></td>
            <td>{examData.courseId}</td>
          </tr>
          <tr>
            <td><strong>Course Unit</strong></td>
            <td>{examData.courseUnit}</td>
          </tr>
          <tr>
            <td><strong>Course Unit Code</strong></td>
            <td>{examData.courseUnitCode}</td>
          </tr>
          <tr>
            <td><strong>Scheduled Date</strong></td>
            <td>{examData.scheduledDate}</td>
          </tr>
          <tr>
            <td><strong>Duration</strong></td>
            <td>{examData.duration}</td>
          </tr>
          <tr>
            <td><strong>Start Time</strong></td>
            <td>{examData.startTime}</td>
          </tr>
          <tr>
            <td><strong>End Time</strong></td>
            <td>{examData.endTime}</td>
          </tr>
          <tr>
            <td><strong>Created By</strong></td>
            <td>{examData.createdBy}</td>
          </tr>
          <tr>
            <td><strong>Questions</strong></td>
            <td>{examData.questions.length} {examData.questions.length === 0 ? "(No questions added)" : ""}</td>
          </tr>
        </tbody>
      </table>

      <div className="mt-3">
        <button onClick={handlePreviewQuestions} className="btn btn-info mr-2">
          Preview Questions
        </button>
        <button onClick={handleEdit} className="btn btn-warning mr-2">
          Edit Exam Paper
        </button>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete Exam Paper
        </button>
        {examData.isDraft && (
          <button onClick={handlePublish} className="btn btn-success ml-2">
            Publish
          </button>
        )}
      </div>
      
      {success && <div className="alert alert-success mt-3">{success}</div>}
    </div>
  );
}

export default ExamPaperPreview;
