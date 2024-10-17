import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar1 from './SideBar1';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    program: '',
    registrationNo: '',
    password: '',
    role: '',
    dateTime: ''
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/students/${id}`);
        const data = await response.json();
        setUser({
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          program: data.program,
          registrationNo: data.registrationNo,
          password: data.password, 
          role: data.role,
        //   dateTime: data.dateTime,
        });
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, [id]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      program: user.program,
      registrationNo: user.registrationNo,
      password: user.password,
      role: user.role,
      dateTime: user.dateTime
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
      navigate('/table');

    } catch (error) {
      console.error('Error updating user:', error);
      alert(`Error updating user: ${error.message}`);
    }
  };

  return (
    <div className="layout-container">
      <Header />
      <div className="main-content">
        <Sidebar1 />
        <div className="edit-student-content">
          <div
            style={{
              padding: '30px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
              width: '80%',
              maxWidth: '600px',
              margin: 'auto',
            }}
          >
            <h2 style={{ textAlign: 'center', color: '#065c4c' }}>Edit Student</h2>
            <form onSubmit={handleSubmit}>
              {/* First Name and Last Name */}
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                <div style={{ flex: '1', marginRight: '20px' }}>
                  <label style={labelStyle}>First Name:</label>
                  <input type="text" name="firstName" value={user.firstName} onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={{ flex: '1' }}>
                  <label style={labelStyle}>Last Name:</label>
                  <input type="text" name="lastName" value={user.lastName} onChange={handleChange} required style={inputStyle} />
                </div>
              </div>

              {/* Email and Program */}
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                <div style={{ flex: '1', marginRight: '20px' }}>
                  <label style={labelStyle}>Email:</label>
                  <input type="email" name="email" value={user.email} onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={{ flex: '1' }}>
                  <label style={labelStyle}>Program:</label>
                  <input type="text" name="program" value={user.program} onChange={handleChange} required style={inputStyle} />
                </div>
              </div>

              {/* Registration No and Password */}
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                <div style={{ flex: '1', marginRight: '20px' }}>
                  <label style={labelStyle}>Registration No:</label>
                  <input type="text" name="registrationNo" value={user.registrationNo} onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={{ flex: '1' }}>
                  <label style={labelStyle}>Password:</label>
                  <input type="password" name="password" value={user.password} onChange={handleChange} required style={inputStyle} />
                </div>
              </div>

              {/* Role and DateTime */}
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                <div style={{ flex: '1', marginRight: '20px' }}>
                  <label style={labelStyle}>Role:</label>
                  <input type="text" name="role" value={user.role} onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={{ flex: '1' }}>
                  <label style={labelStyle}>DateTime:</label>
                  <input type="datetime-local" name="created" value={user.dateTime} onChange={handleChange} required style={inputStyle} />
                </div>
              </div>

              <button type="submit" style={submitButtonStyle}>
                Update User
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  color: '#106053',
  textTransform: 'uppercase'
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  border: '1px solid #106053',
  fontSize: '16px',
};

const submitButtonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#065c4c',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s',
};

export default EditStudent;
