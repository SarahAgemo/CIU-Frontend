import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditExamInterface() {
  const { id } = useParams(); // Get the exam paper ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate
  const [examData, setExamData] = useState({
    title: '',
    description: '',
    courseId: '',
    courseUnit: '',
    courseUnitCode: '',
    scheduledDate: '',
    duration: '',
    startTime: '',
    endTime: '',
    createdBy: '',
   
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // New loading state

  // Function to format ISO timestamp to HH:mm
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`; // Returns in HH:mm format
  };

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/exam-paper/${id}`);
        if (!response.ok) throw new Error('Failed to fetch exam paper');
        const data = await response.json();
        // Format startTime and endTime to HH:mm
        if (data.startTime) data.startTime = formatTime(data.startTime);
        if (data.endTime) data.endTime = formatTime(data.endTime);
        setExamData(data);
      } catch (error) {
        setError('Error fetching exam paper: ' + error.message);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchExamData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/exam-paper/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(examData),
      });
      if (!response.ok) throw new Error('Failed to update exam paper');
      navigate(`/exam-paper/${id}`); // Redirect to the preview page
    } catch (error) {
      setError('Error updating exam paper: ' + error.message);
    }
  };

  if (loading) return <div>Loading...</div>; // Display loading state
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h3>Edit Exam Paper</h3>
      <form onSubmit={handleSubmit}>
        {/* Render form fields for editing exam data */}
        {Object.keys(examData).map((key) => (
          <div key={key} className="form-group">
            <label>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</label>
            {key === 'scheduledDate' ? (
              <input
                type="date"
                name={key}
                value={examData[key]}
                onChange={handleChange}
                className="form-control"
              />
            ) : key === 'startTime' || key === 'endTime' ? (
              <input
                type="time"
                name={key}
                value={examData[key]} // Ensure time is in HH:mm format
                onChange={handleChange}
                className="form-control"
              />
            ) : (
              <input
                type="text"
                name={key}
                value={examData[key]}
                onChange={handleChange}
                className="form-control"
              />
            )}
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Update Exam Paper</button>
      </form>
    </div>
  );
}

export default EditExamInterface;
