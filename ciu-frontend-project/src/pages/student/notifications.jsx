
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotificationItem = ({ notification }) => (
  <div style={notificationStyle}>
    <div style={titleStyle}>
      {notification.title}
    </div>
    <div style={{ ...messageStyle, ...(notification.open ? openMessageStyle : {}) }}>
      {notification.message}
    </div>
  </div>
);

const containerStyle = {
  fontFamily: 'Arial, sans-serif',
  padding: '30px',
  maxWidth: '900px',
  margin: '0 auto',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  overflow: 'hidden',
  textAlign: 'center',
  position: 'relative',
};

const listStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '15px',
  padding: '20px',
};

const notificationStyle = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  width: '100%',
  maxWidth: '500px',
  cursor: 'pointer',
  opacity: 0.9,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const hoverStyle = {
  transform: 'translateY(-8px)',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
};

const titleStyle = {
  fontWeight: 'bold',
  fontSize: '18px',
  color: '#333',
  marginBottom: '10px',
  cursor: 'pointer',
  textTransform: 'capitalize',
  width: '100%',
  textAlign: 'left',
};

const messageStyle = {
  fontSize: '16px',
  color: '#555',
  display: 'none',
  marginTop: '10px',
  padding: '10px',
  borderTop: '1px solid #eaeaea',
  width: '100%',
  textAlign: 'left',
};

const openMessageStyle = {
  display: 'block',
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [studentCourses, setStudentCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentData = localStorage.getItem('user');
        if (!studentData) {
          throw new Error('No student data found in localStorage.');
        }

        const student = JSON.parse(studentData);
        const response = await axios.get(`http://localhost:3000/students/${student.id}`);
        
        if (!response.data || !response.data.courseId) {
          throw new Error('No course data found for this student.');
        }
        
        const courses = Array.isArray(response.data.courseId) ? response.data.courseId : [response.data.courseId];
        setStudentCourses(courses);
      } catch (error) {
        setError('Error fetching student data: ' + error.message);
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        
        const response = await axios.get('http://localhost:3000/notifications');
        
        // Fetch upcoming exams
        const exams = await axios.get('http://localhost:3000/exam-paper?isDraft=false'); 
        // Convert upcoming exams to notification format
        const examNotifications = exams.data.map(exam => ({
          title: `Upcoming Exam: ${exam.title}`,
          message: `The exam for the course ${exam.courseUnit} is scheduled for ${new Date(exam.scheduledDate).toLocaleString()}.`,
          date: exam.scheduledDate,
          eventType: 'exam',
          courseId: exam.courseId,
        }));

        const filteredExamNotifications = examNotifications.filter(exam => studentCourses.includes(exam.courseId));

        // Combine regular notifications and filtered exam notifications
        const allNotifications = [...response.data, ...filteredExamNotifications];

        // Remove duplicates based on eventType and title
        const uniqueNotifications = allNotifications.filter((notification, index, self) =>
          index === self.findIndex((n) => (
            n.eventType === notification.eventType && n.title === notification.title
          ))
        );

        setNotifications(uniqueNotifications);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch notifications: ' + error.message);
        setLoading(false);
      }
    };

    if (studentCourses.length > 0) {
      fetchNotifications();
    }
  }, [studentCourses]);

  const toggleNotification = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id
          ? { ...notification, open: !notification.open }
          : notification
      )
    );
  };

  if (loading) return <p>Loading notifications...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={containerStyle}>
      <h1>Notifications</h1>

      {/* Notifications List */}
      <div style={listStyle}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              style={{
                ...notificationStyle,
                ...(notification.open ? hoverStyle : {}),
              }}
              onClick={() => toggleNotification(notification.id)} 
            >
              <div style={titleStyle}>
                {notification.title}
              </div>
              <div
                style={{
                  ...messageStyle,
                  ...(notification.open ? openMessageStyle : {}),
                }}
              >
                {notification.message}
              </div>
            </div>
          ))
        ) : (
          <p>No notifications found.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
