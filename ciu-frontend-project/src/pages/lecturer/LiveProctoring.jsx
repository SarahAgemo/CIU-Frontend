import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { Box, Paper, Typography, Alert } from '@mui/material';
import './LiveProctoring.css';
import Video from 'twilio-video';


const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

const LiveProctoring = ({ examId }) => {
  const [students, setStudents] = useState(new Map());
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    try {
      socketRef.current = io(`${SOCKET_URL}/proctor`, {
        transports: ['websocket']
      });

      socketRef.current.on('connect', () => {
        console.log('Connected to socket server');
        setLoading(false);
      });

      socketRef.current.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        setError('Failed to connect to server');
        setLoading(false);
      });

      socketRef.current.emit('join-exam-room', {
        examId,
        role: 'proctor'
      });

      socketRef.current.on('proctor-stream', (data) => {
        console.log('Received stream data:', data);
        setStudents(prev => {
          const newMap = new Map(prev);
          newMap.set(data.studentId, {
            stream: data.stream,
            lastUpdate: new Date()
          });
          return newMap;
        });
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    } catch (error) {
      console.error('Failed to initialize socket:', error);
      setError('Failed to initialize connection');
      setLoading(false);
    }
  }, [examId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Connecting to exam room...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Live Exam Monitoring
      </Typography>

      {notifications.length > 0 && (
        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Alerts
          </Typography>
          {notifications.map((notification, index) => (
            <Alert 
              key={index} 
              severity={notification.type}
              sx={{ mb: 1 }}
              onClose={() => setNotifications(prev => prev.filter((_, i) => i !== index))}
            >
              {notification.message}
            </Alert>
          ))}
        </Paper>
      )}

      {students.size === 0 ? (
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
          <Typography>Waiting for students to connect...</Typography>
        </Paper>
      ) : (
        <div className="live-proctoring-grid">
          {Array.from(students).map(([studentId, data]) => (
            <Paper key={studentId} elevation={3} sx={{ p: 2 }}>
              <div className="student-stream">
                <img 
                  src={data.stream} 
                  alt={`Student ${studentId}`}
                  style={{ width: '100%', maxWidth: '320px', height: 'auto' }}
                />
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  Student ID: {studentId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last Updated: {data.lastUpdate.toLocaleTimeString()}
                </Typography>
              </div>
            </Paper>
          ))}
        </div>
      )}
    </Box>
  );
};

export default LiveProctoring;