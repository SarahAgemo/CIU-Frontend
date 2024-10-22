import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigation for redirection
import Header from '../../components/lecturer/Header';
import SideBar from '../../components/lecturer/SideBar';
import '../../components/admin/Layout.css';

function ScheduleUploadExams() {
  const navigate = useNavigate(); // Initialize useHistory for redirection
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
  const [csvFile, setCsvFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamData({ ...examData, [name]: value });
  };

  const handleFileUpload = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('file', csvFile);
    Object.keys(examData).forEach((key) => {
      let value = examData[key];
      if (key === 'startTime' || key === 'endTime') {
        value = formatTime(value);
      }
      formData.append(key, value);
    });

    try {
      const response = await fetch('http://localhost:3000/exam-paper/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to upload exam paper');
      const data = await response.json();
      setSuccess('Exam paper uploaded successfully!');

      // Redirect to ExamPaperPreview after successful upload
      // Redirect to ExamPaperPreview after successful upload
      navigate('/schedule-upload-exams/exam-list', { state: { examData: data } }); // Corrected line
    } catch (error) {
      setError('Error uploading exam paper: ' + error.message);
    }
  };

  return (
    <div className="layout-container">
      <Header />
      <div className="main-content">
        <SideBar />
        <div className="users-content">
          <div className="container mt-5">
            <h2>Schedule Upload Exams</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Exam Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={examData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  value={examData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Course ID</label>
                <input
                  type="text"
                  name="courseId"
                  className="form-control"
                  value={examData.courseId}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Course Unit</label>
                <input
                  type="text"
                  name="courseUnit"
                  className="form-control"
                  value={examData.courseUnit}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Course Unit Code</label>
                <input
                  type="text"
                  name="courseUnitCode"
                  className="form-control"
                  value={examData.courseUnitCode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Scheduled Date</label>
                <input
                  type="datetime-local"
                  name="scheduledDate"
                  className="form-control"
                  value={examData.scheduledDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Duration (minutes)</label>
                <input
                  type="number"
                  name="duration"
                  className="form-control"
                  value={examData.duration}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  className="form-control"
                  value={examData.startTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>End Time</label>
                <input
                  type="time"
                  name="endTime"
                  className="form-control"
                  value={examData.endTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Created By</label>
                <input
                  type="text"
                  name="createdBy"
                  className="form-control"
                  value={examData.createdBy}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Upload CSV File</label>
                <input
                  type="file"
                  className="form-control"
                  accept=".csv"
                  onChange={handleFileUpload}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Upload Exam Paper
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleUploadExams;
