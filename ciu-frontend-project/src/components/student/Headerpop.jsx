
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bell, Menu } from "lucide-react";
import UserDetailsPopup from "./UserDetailsPopup";
import Head from './Headerpop.module.css';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

const Headerpop = ({ toggleMobileMenu, isMobile }) => {
  const [notifications, setNotifications] = useState([]);
  const [studentCourses, setStudentCourses] = useState([]);
  const [loading, setLoading] = useState(true); // Loading only applies to initial notification fetch
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io('http://localhost:3000');
    setSocket(socketInstance);

    socketInstance.on('new-notification', (newNotification) => {
      setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
      setUnreadCount(prevUnreadCount => prevUnreadCount + 1);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

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
          title: `Upcoming Exam: ${exam.title}`,
          message: `The exam for the course ${exam.courseUnit} is scheduled for ${new Date(exam.scheduledDate).toLocaleString()}.`,
          date: exam.scheduledDate,
          eventType: 'exam',
          courseId: exam.courseId,
          read: false,
        }));

        const filteredExamNotifications = examNotifications.filter(exam => studentCourses.includes(exam.courseId));
        const allNotifications = [...response.data, ...filteredExamNotifications];

        const uniqueNotifications = allNotifications.filter((notification, index, self) =>
          index === self.findIndex((n) => (
            n.eventType === notification.eventType && n.title === notification.title
          ))
        );

        setNotifications(uniqueNotifications);
        const unreadNotifications = uniqueNotifications.filter(notification => !notification.read);
        setUnreadCount(unreadNotifications.length);
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
          ? { ...notification, open: !notification.open, read: true }
          : notification
      )
    );
    setUnreadCount(prevCount => prevCount - 1);
  };

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  return (
    <header className={Head["header"]}>
      <div className={Head["logo-container"]}>
        {isMobile && (
          <button className={Head["hamburger-button"]} onClick={toggleMobileMenu} aria-label="Toggle menu">
            <Menu className={Head["hamburger-icon"]} />
          </button>
        )}
        <img src="/CIU-exam-system-logo.png" alt="System Logo" className={Head["logo"]} />
      </div>
      <div className={Head["header-icons"]}>
        <button className={Head["icon-button"] + " " + Head["notification-button"]} aria-label="Notifications">
          <Bell className={Head["notification-icon"]} />
          {unreadCount > 0 && !loading && (
            <span className={Head["notification-count"]}>{unreadCount}</span>
          )}
        </button>
        <UserDetailsPopup>
          <button className={Head["profile-button"]} aria-label="User profile">
            <img
              src="/IMG_9472.jpg"
              alt="User profile"
              className={Head["profile-image"]}
            />
          </button>
        </UserDetailsPopup>
      </div>
    </header>
  );
};

export default Headerpop;
