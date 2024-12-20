import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Snackbar, Alert } from '@mui/material';
import editStudent from './EditStudent.module.css';

const EditStudent = ({ id, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    program: '',
    registrationNo: '',
    role: '',
    courseId: '',
  });
  const [alertInfo, setAlertInfo] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`https://c-i-u-backend.onrender.com/students/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        const data = await response.json();
        setFormData({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          program: data.program,
          registrationNo: data.registrationNo,
          role: data.role,
          courseId: data.courseId,
        });
      } catch (error) {
        console.error('Error fetching student data:', error);
        setAlertInfo({ open: true, message: `Error fetching student data: ${error.message}`, severity: 'error' });
      }
    };

    fetchStudentData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "courseId" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://c-i-u-backend.onrender.com/students/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update student');
      }

      const result = await response.json();
      console.log('Student updated successfully:', result);
      setAlertInfo({ open: true, message: 'Student updated successfully', severity: 'success' });
      onUpdate(result);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error updating student:', error);
      setAlertInfo({ open: true, message: `Error updating student: ${error.message}`, severity: 'error' });
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertInfo({ ...alertInfo, open: false });
  };

  return (
    <div className={editStudent["edit-user-container"]}>
      <div className={editStudent["edit-user-header"]}>
        <h2>Edit Student</h2>
        <button onClick={onClose} className={editStudent["close-button"]}>
          <FaTimes />
        </button>
      </div>
      <form onSubmit={handleSubmit} className={editStudent["edit-user-form"]}>
        <div className={editStudent["form-group"]}>
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            className={editStudent["form-control"]}
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={editStudent["form-group"]}>
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            className={editStudent["form-control"]}
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={editStudent["form-group"]}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className={editStudent["form-control"]}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={editStudent["form-group"]}>
          <label htmlFor="program">Program</label>
          <input
            type="text"
            id="program"
            name="program"
            className={editStudent["form-control"]}
            value={formData.program}
            onChange={handleChange}
            required
          />
        </div>
        <div className={editStudent["form-group"]}>
          <label htmlFor="registrationNo">Registration No</label>
          <input
            type="text"
            id="registrationNo"
            name="registrationNo"
            className={editStudent["form-control"]}
            value={formData.registrationNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className={editStudent["form-group"]}>
          <label htmlFor="courseId">Course ID</label>
          <input
            type="number"
            id="courseId"
            name="courseId"
            className={editStudent["form-control"]}
            value={formData.courseId}
            onChange={handleChange}
            required
          />
        </div>
        <div className={editStudent["form-actions"]}>
          <button type="submit" className={editStudent["form-button"]}>
            Save Changes
          </button>
        </div>
      </form>
      <Snackbar open={alertInfo.open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertInfo.severity} sx={{ width: '100%' }}>
          {alertInfo.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EditStudent;




