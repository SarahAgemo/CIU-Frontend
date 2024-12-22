import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Snackbar, Alert } from '@mui/material';
import styles from './StudentRegForm.module.css';

const RegForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    registrationNo: '',
    role: 'student',
    dateTime: '',
    courseId: '', 
  });

  const [courses, setCourses] = useState([]);
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3000/coursesAdd');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setAlertInfo({
          open: true,
          message: 'Failed to fetch courses. Please try again.',
          severity: 'error'
        });
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z]+@student\.ciu\.ac\.ug$/;
    if (!emailRegex.test(formData.email)) {
      setAlertInfo({
        open: true,
        message: "Email format should be 'firstname@student.ciu.ac.ug'",
        severity: 'error'
      });
      return;
    }

    if (!formData.courseId) {
      setAlertInfo({
        open: true,
        message: 'Course ID should not be empty',
        severity: 'error'
      });
      return;
    }

    const userData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      registrationNo: formData.registrationNo,
      role: formData.role,
      dateTime: formData.dateTime,
      courseId: parseInt(formData.courseId),
    };

    try {
      const response = await fetch('http://localhost:3000/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const newStudent = await response.json();
      onSubmit(newStudent);
      setAlertInfo({
        open: true,
        message: 'Student account created successfully!',
        severity: 'success'
      });
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      setAlertInfo({
        open: true,
        message: `Error creating user: ${error.message}`,
        severity: 'error'
      });
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertInfo({ ...alertInfo, open: false });
  };

  return (
    <div className={styles['reg-form-container']}>
      <div className={styles['reg-form-header']}>
        <h2>Student Registration</h2>
        <button onClick={onClose} className={styles['close-button']}>
          <FaTimes />
        </button>
      </div>
      <form onSubmit={handleSubmit} className={styles['reg-form']}>
        <div className={styles['form-row']}>
          <div className={styles['form-group']}>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Enter your first name"
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div className={styles['form-row']}>
          <div className={styles['form-group']}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="firstname@student.ciu.ac.ug"
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="courseId">Course:</label>
            <select
              id="courseId"
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              required
              className={styles['course-select']}
            >
              <option value="">Select a Course</option>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.courseName} 
                  </option>
                ))
              ) : (
                <option disabled>Loading courses...</option>
              )}
            </select>
          </div>
        </div>

        <div className={styles['form-row']}>
          <div className={styles['form-group']}>
            <label htmlFor="registrationNo">Registration No:</label>
            <input
              type="text"
              id="registrationNo"
              name="registrationNo"
              value={formData.registrationNo}
              onChange={handleChange}
              required
              placeholder="Enter your registration number"
            />
          </div>
        </div>

        <div className={styles['form-row']}>
          <div className={styles['form-group']}>
            <label htmlFor="role">Role:</label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              placeholder="e.g., student"
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="dateTime">Date and Time:</label>
            <input
              type="datetime-local"
              id="dateTime"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className={styles['submit-button']}>
          Register
        </button>
      </form>

      <Snackbar open={alertInfo.open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertInfo.severity} sx={{ width: '100%' }}>
          {alertInfo.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RegForm;


