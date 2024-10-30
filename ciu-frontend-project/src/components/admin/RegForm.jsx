import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header1';
import Sidebar1 from './SideBar1';
import './RegForm.css'; 

const RegForm = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    program: '',
    registrationNo: '',
    password: '',
    role: 'student',
    dateTime: '',
    courseId: '', 
  });

  const [courses, setCourses] = useState([]); 
  const navigate = useNavigate(); 

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
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.courseId) {
      alert('Course ID should not be empty');
      return;
    }

    const userData = {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      registrationNo: user.registrationNo,
      password: user.password,
      role: user.role,
      dateTime: user.dateTime,
      courseId: parseInt(user.courseId),
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

      alert('User registered successfully!');
      navigate('/table');

      setUser({
        firstName: '',
        lastName: '',
        email: '',
        registrationNo: '',
        password: '',
        role: 'students',
        dateTime: '',
        courseId: '',
      });
    } catch (error) {
      alert(`Error creating user: ${error.message}`);
    }
  };

  return (
    <div className="layout-container">
      <Header />
      <div className="main-content">
        <Sidebar1 />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <div style={{ padding: '30px', borderRadius: '12px', backgroundColor: 'rgba(255, 255, 255, 0.95)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', width: '80%', maxWidth: '600px' }}>
            <h2 style={{ textAlign: 'center', color: '#065c4c' }}>User Registration</h2>
            <form onSubmit={handleSubmit}>
              {/* First Name and Last Name */}
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                <div style={{ flex: '1', marginRight: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#106053', textTransform: 'uppercase' }}>First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #106053',
                      fontSize: '16px',
                    }}
                  />
                </div>
                <div style={{ flex: '1' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#106053', textTransform: 'uppercase' }}>Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #106053',
                      fontSize: '16px',
                    }}
                  />
                </div>
              </div>

              {/* Email and Course ID */}
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                <div style={{ flex: '1', marginRight: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#106053', textTransform: 'uppercase' }}>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #106053',
                      fontSize: '16px',
                    }}
                  />
                </div>
                <div style={{ flex: '1' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#106053', textTransform: 'uppercase' }}>Course:</label>
                  <select
                    name="courseId"
                    value={user.courseId}
                    onChange={handleChange}
                    required
                    className="course-select"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #106053',
                      fontSize: '16px',
                      borderRadius: '4px',
                      backgroundColor: '#fff',
                      color: '#333',
                    }}
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

              {/* Registration No and Password */}
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                <div style={{ flex: '1', marginRight: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#106053', textTransform: 'uppercase' }}>Registration No:</label>
                  <input
                    type="text"
                    name="registrationNo"
                    value={user.registrationNo}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #106053',
                      fontSize: '16px',
                    }}
                  />
                </div>
                <div style={{ flex: '1' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#106053', textTransform: 'uppercase' }}>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #106053',
                      fontSize: '16px',
                    }}
                  />
                </div>
              </div>

              {/* Role and DateTime */}
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                <div style={{ flex: '1', marginRight: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#106053', textTransform: 'uppercase' }}>Role:</label>
                  <input
                    type="text"
                    name="role"
                    value={user.role}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #106053',
                      fontSize: '16px',
                    }}
                  />
                </div>
                <div style={{ flex: '1' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#106053', textTransform: 'uppercase' }}>DateTime:</label>
                  <input
                    type="datetime-local"
                    name="dateTime"
                    value={user.dateTime}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #106053',
                      fontSize: '16px',
                    }}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#106053', color: '#fff', fontSize: '18px', textTransform: 'uppercase', cursor: 'pointer' }}>
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegForm;
