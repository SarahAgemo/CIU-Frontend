import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

function EditExamInterface() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [courseUnits, setCourseUnits] = useState([]);
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
  const [loading, setLoading] = useState(true);

  // Fetch courses when component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3000/exam-paper/courses');
        if (!response.ok) throw new Error('Failed to fetch courses');
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError('Error fetching courses: ' + err.message);
      }
    };
    fetchCourses();
  }, []);

  // Fetch course units when courseId changes
  useEffect(() => {
    if (examData.courseId) {
      const fetchCourseUnits = async () => {
        try {
          const response = await fetch(`http://localhost:3000/exam-paper/courses/${examData.courseId}/units`);
          if (!response.ok) throw new Error('Failed to fetch course units');
          const data = await response.json();
          setCourseUnits(data.courseUnits || []);
        } catch (err) {
          console.error('Error fetching course units:', err);
          setError('Error fetching course units: ' + err.message);
          setCourseUnits([]);
        }
      };
      fetchCourseUnits();
    }
  }, [examData.courseId]);

  // Fetch exam data
  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/exam-paper/${id}`);
        if (!response.ok) throw new Error('Failed to fetch exam paper');
        const data = await response.json();
        
        // Format the dates and times
        if (data.startTime) {
          data.startTime = moment(data.startTime).format('HH:mm');
        }
        if (data.endTime) {
          data.endTime = moment(data.endTime).format('HH:mm');
        }
        if (data.scheduledDate) {
          data.scheduledDate = moment(data.scheduledDate).format('YYYY-MM-DDTHH:mm');
        }
        
        setExamData(data);
      } catch (error) {
        setError('Error fetching exam paper: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Update course unit code when course unit changes
    if (name === 'courseUnit') {
      const selectedUnit = courseUnits.find(unit => unit.unitName === value);
      if (selectedUnit) {
        setExamData(prevData => ({
          ...prevData,
          courseUnitCode: selectedUnit.unitCode
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...examData,
        scheduledDate: moment(examData.scheduledDate).format('YYYY-MM-DD HH:mm:ss'),
        startTime: moment(examData.startTime, 'HH:mm').format('HH:mm:ss'),
        endTime: moment(examData.endTime, 'HH:mm').format('HH:mm:ss'),
      };

      const response = await fetch(`http://localhost:3000/exam-paper/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      });
      
      if (!response.ok) throw new Error('Failed to update exam paper');
      navigate(`/exam-paper/${id}`);
    } catch (error) {
      setError('Error updating exam paper: ' + error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h3>Edit Exam Paper</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={examData.title}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={examData.description}
            onChange={handleChange}
            className="form-control"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Select Course</label>
          <select
            name="courseId"
            className="form-control"
            value={examData.courseId}
            onChange={handleChange}
            required
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.courseName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Course Unit</label>
          <select
            name="courseUnit"
            className="form-control"
            value={examData.courseUnit}
            onChange={handleChange}
            required
            disabled={!examData.courseId}
          >
            <option value="">Select a course unit</option>
            {Array.isArray(courseUnits) && courseUnits.map((unit) => (
              <option key={unit.id} value={unit.unitName}>
                {unit.unitName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Course Unit Code</label>
          <input
            type="text"
            name="courseUnitCode"
            value={examData.courseUnitCode}
            onChange={handleChange}
            className="form-control"
           
          />
        </div>

        <div className="form-group">
          <label>Scheduled Date</label>
          <input
            type="datetime-local"
            name="scheduledDate"
            value={examData.scheduledDate}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            value={examData.duration}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Start Time</label>
          <input
            type="time"
            name="startTime"
            value={examData.startTime}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>End Time</label>
          <input
            type="time"
            name="endTime"
            value={examData.endTime}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Created By</label>
          <input
            type="text"
            name="createdBy"
            value={examData.createdBy}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">Update Exam Paper</button>
      </form>
    </div>
  );
}

export default EditExamInterface;