import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

function ManualEditExamInterface() {
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
    questions: [
      {
        content: '',
        options: '',
        answer: '',
      },
    ],
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
          const response = await fetch(`http://localhost:3000/manual-exam-paper/courses/${examData.courseId}/units`);
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
        const response = await fetch(`http://localhost:3000/manual-exam-paper/${id}`);
        if (!response.ok) throw new Error('Failed to fetch exam paper');
        const data = await response.json();
        
        // Format the dates and times
        const formattedData = {
          ...data,
          startTime: moment(data.startTime).format('HH:mm'),
          endTime: moment(data.endTime).format('HH:mm'),
          scheduledDate: moment(data.scheduledDate).format('YYYY-MM-DDTHH:mm'),
          questions: data.questions.map(q => ({
            ...q,
            options: Array.isArray(q.options) ? q.options.join(',') : q.options
          }))
        };
        
        setExamData(formattedData);
      } catch (error) {
        setError('Error fetching exam paper: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExamData(prevData => ({
      ...prevData,
      [name]: value,
    }));

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

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const newQuestions = [...examData.questions];
    newQuestions[index][name] = value;
    setExamData({ ...examData, questions: newQuestions });
  };

  const addNewQuestion = () => {
    setExamData(prevState => ({
      ...prevState,
      questions: [
        ...prevState.questions,
        { content: '', options: '', answer: '' }
      ]
    }));
  };

  const removeLastQuestion = () => {
    if (examData.questions.length > 1) {
      setExamData(prevState => ({
        ...prevState,
        questions: prevState.questions.slice(0, -1)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...examData,
        courseId: parseInt(examData.courseId, 10),
        duration: examData.duration,
        scheduledDate: moment(examData.scheduledDate).format('YYYY-MM-DD HH:mm:ss'),
        startTime: moment(examData.startTime, 'HH:mm').format('HH:mm:ss'),
        endTime: moment(examData.endTime, 'HH:mm').format('HH:mm:ss'),
        questions: examData.questions.map(q => ({
          ...q,
          options: q.options.split(',')
        }))
      };

      const response = await axios.put(`http://localhost:3000/manual-exam-paper/${id}`, payload);
      console.log('Exam updated successfully:', response.data);
      navigate('/schedule-upload-exams/exam-list');
    } catch (error) {
      console.error('Error updating exam:', error);
      setError('Failed to update exam: ' + error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h3>Edit Exam Paper</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Assessment Title</label>
          <input
            type="text"
            name="title"
            value={examData.title}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={examData.description}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Select Course</label>
          <select
            name="courseId"
            className="form-control"
            value={examData.courseId}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            className="form-control"
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            value={examData.duration}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Scheduled Date</label>
          <input
            type="datetime-local"
            name="scheduledDate"
            value={examData.scheduledDate}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Start Time</label>
          <input
            type="time"
            name="startTime"
            value={examData.startTime}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>End Time</label>
          <input
            type="time"
            name="endTime"
            value={examData.endTime}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Created By</label>
          <input
            type="text"
            name="createdBy"
            value={examData.createdBy}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        {/* Questions Section */}
        <h4 className="mt-4">Questions</h4>
        {examData.questions.map((question, index) => (
          <div key={index} className="card mb-3 p-3">
            <div className="form-group">
              <label>Question Text</label>
              <input
                type="text"
                name="content"
                value={question.content}
                onChange={(e) => handleQuestionChange(index, e)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Options (comma-separated)</label>
              <input
                type="text"
                name="options"
                value={question.options}
                onChange={(e) => handleQuestionChange(index, e)}
                className="form-control"
                placeholder="Option1,Option2,Option3,Option4"
                required
              />
            </div>
            <div className="form-group">
              <label>Correct Answer</label>
              <input
                type="text"
                name="answer"
                value={question.answer}
                onChange={(e) => handleQuestionChange(index, e)}
                className="form-control"
                required
              />
            </div>
          </div>
        ))}

        <div className="btn-group mb-3">
          <button type="button" className="btn btn-secondary" onClick={addNewQuestion}>
            Add Another Question
          </button>
          <button 
            type="button" 
            className="btn btn-danger" 
            onClick={removeLastQuestion}
            disabled={examData.questions.length === 1}
          >
            Remove Last Question
          </button>
        </div>

        <div>
          <button type="submit" className="btn btn">
            Update Exam Paper
          </button>
        </div>
      </form>
    </div>
  );
}

export default ManualEditExamInterface;