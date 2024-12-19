import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Collapse,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/system';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

const StyledBox = styled(Box)(({ theme }) => ({
  fontFamily: 'Roboto, sans-serif',
  padding: '30px',
  maxWidth: '900px',
  margin: '0 auto',
  backgroundColor: '#f9f9f9',
  borderRadius: '12px',
  overflow: 'hidden',
  position: 'relative',
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '10px',
  right: '10px',
  color: '#106053',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: '#ffffff',
  marginBottom: '15px',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
  },
}));

const NotificationTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#106053',
}));

const Notifications = ({ onClose }) => {
  const [notifications, setNotifications] = useState(null);
  const [studentCourses, setStudentCourses] = useState([]);
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
      }
    };

    fetchStudentData();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:3000/notifications');

        const exams = await axios.get('http://localhost:3000/exam-paper?isDraft=false');
        const examNotifications = exams.data.map(exam => ({
          id: `exam-${exam.id}`,
          title: `Upcoming Exam: ${exam.title}`,
          message: `The exam for the course ${exam.courseUnit} is scheduled for ${new Date(exam.scheduledDate).toLocaleString()}.`,
          date: exam.scheduledDate,
          eventType: 'exam',
          courseId: exam.courseId,
        }));

        const filteredExamNotifications = examNotifications.filter(exam => studentCourses.includes(exam.courseId));

        const allNotifications = [...response.data, ...filteredExamNotifications];

        const uniqueNotifications = allNotifications.filter((notification, index, self) =>
          index === self.findIndex((n) => (
            n.eventType === notification.eventType && n.title === notification.title
          ))
        );

        setNotifications(uniqueNotifications);
      } catch (error) {
        setError('Failed to fetch notifications: ' + error.message);
      }
    };

    if (studentCourses.length > 0) {
      fetchNotifications();
    }
  }, [studentCourses]);

  const [openNotifications, setOpenNotifications] = useState({});

  const toggleNotification = (id) => {
    setOpenNotifications(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (error) {
    return (
      <StyledBox>
        <Typography color="error">Error: {error}</Typography>
      </StyledBox>
    );
  }

  return (
    <StyledBox>
      {/* <CloseButton onClick={onClose} aria-label="close">
        <X />
      </CloseButton> */}
      <Typography variant="h4" gutterBottom style={{ color: '#106053', textAlign: 'center' }}>
        Notifications
      </Typography>

      {notifications === null ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress style={{ color: '#106053' }} />
        </Box>
      ) : (
        <List>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <StyledListItem key={notification.id} button onClick={() => toggleNotification(notification.id)}>
                <ListItemText
                  primary={<NotificationTitle>{notification.title}</NotificationTitle>}
                  secondary={
                    <Collapse in={openNotifications[notification.id]} timeout="auto" unmountOnExit>
                      <Typography variant="body2" style={{ marginTop: '8px' }}>
                        {notification.message}
                      </Typography>
                    </Collapse>
                  }
                />
                <IconButton edge="end" aria-label="expand" size="small">
                  {openNotifications[notification.id] ? <ChevronUp /> : <ChevronDown />}
                </IconButton>
              </StyledListItem>
            ))
          ) : (
            <Typography>No notifications found.</Typography>
          )}
        </List>
      )}
    </StyledBox>
  );
};

export default Notifications;