import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const EditStudent = ({ id, onClose, onUpdate }) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    program: '',
    registrationNo: '',
    password: '',
    role: '',
    dateTime: '',
    courseId: '',
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/students/${id}`);
        const data = await response.json();
        setUser({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          program: data.program,
          registrationNo: data.registrationNo,
          password: data.password,
          role: data.role,
          dateTime: data.dateTime,
          courseId: data.courseId,
        });
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: name === "courseId" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      program: user.program,
      registrationNo: user.registrationNo,
      password: user.password,
      role: user.role,
      dateTime: user.dateTime,
      courseId: user.courseId,
    };

    try {
      const response = await fetch(`http://localhost:3000/students/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const result = await response.json();
      console.log('User updated successfully:', result);
      alert('User updated successfully!');
      onUpdate(result);
    } catch (error) {
      console.error('Error updating user:', error);
      alert(`Error updating user: ${error.message}`);
    }
  };

  return (
    <div className="edit-student-modal">
      <div className="modal-header">
        <h2>Edit Student</h2>
        <button onClick={onClose} className="close-button">
          <FaTimes />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" value={user.firstName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" value={user.lastName} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={user.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="program">Program:</label>
            <input type="text" id="program" name="program" value={user.program} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="registrationNo">Registration No:</label>
            <input type="text" id="registrationNo" name="registrationNo" value={user.registrationNo} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={user.password} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <input type="text" id="role" name="role" value={user.role} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="courseId">Course ID:</label>
            <input type="number" id="courseId" name="courseId" value={user.courseId} onChange={handleChange} required />
          </div>
        </div>
        <button type="submit" className="update-button">
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditStudent;