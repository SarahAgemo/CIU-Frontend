// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '../../components/admin/Headerpop';
// import Sidebar from '../../components/admin/SideBarpop';
// import MobileMenu from "../../components/admin/MobileMenu";
// import './RegForm.css';

// const RegForm = () => {
//   const [user, setUser] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     program: '',
//     registrationNo: '',
//     role: 'student',
//     dateTime: '',
//     courseId: '', 
//   });

//   const [courses, setCourses] = useState([]); 
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/coursesAdd');
//         if (!response.ok) {
//           throw new Error('Failed to fetch courses');
//         }
//         const data = await response.json();
//         setCourses(data);
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//       }
//     };

//     fetchCourses();
//   }, []);

//   const handleChange = (e) => {
//     setUser({
//       ...user,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const emailRegex = /^[a-zA-Z]+@student\.ciu\.ac\.ug$/;
//     if (!emailRegex.test(user.email)) {
//       alert("Email format should be 'firstname@student.ciu.ac.ug'");
//       return;
//     }

//     if (!user.courseId) {
//       alert('Course ID should not be empty');
//       return;
//     }

//     const userData = {
//       first_name: user.firstName,
//       last_name: user.lastName,
//       email: user.email,
//       registrationNo: user.registrationNo,
//       password: user.password,
//       role: user.role,
//       dateTime: user.dateTime,
//       courseId: parseInt(user.courseId),
//     };

//     try {
//       const response = await fetch('http://localhost:3000/students', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Network response was not ok');
//       }

//       alert('User registered successfully!');
//       navigate('/table');

//       setUser({
//         firstName: '',
//         lastName: '',
//         email: '',
//         registrationNo: '',
//         role: 'students',
//         dateTime: '',
//         courseId: '',
//       });
//     } catch (error) {
//       alert(`Error creating user: ${error.message}`);
//     }
//   };

//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 991);
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize();

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <div className="this-container">
//       <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
//       <div className="this-content">
//         {!isMobile && <Sidebar />}
//         {isMobile && <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />}
//         <div style={{ display: 'flex', flex: '1', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'  }}>
//           <div style={{ padding: '30px', borderRadius: '12px', backgroundColor: 'rgba(255, 255, 255, 0.95)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', width: '80%', maxWidth: '600px' }}>
//             <h2 style={{ textAlign: 'center', color: '#065c4c' }}>User Registration</h2>
//             <form onSubmit={handleSubmit}>
//               <div style={{ display: 'flex', marginBottom: '20px' }}>
//                 <div style={{ flex: '1', marginRight: '20px' }}>
//                   <label style={{ display: 'block', marginBottom: '5px', color: '#106053', textTransform: 'uppercase' }}>First Name:</label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={user.firstName}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter your first name"
//                     style={{
//                       width: '100%',  
//                       padding: '12px',
//                       border: '1px solid #106053',
//                       fontSize: '16px',
//                     }}
//                   />
//                 </div>
//                 <div style={{ flex: '1' }}>
//                   <label style={{ display: 'block', marginBottom: '5px', color: '#106053', textTransform: 'uppercase' }}>Last Name:</label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={user.lastName}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter your last name"
//                     style={{
//                       width: '100%',
//                       padding: '12px',
//                       border: '1px solid #106053',
//                       fontSize: '16px',
//                     }}
//                   />
//                 </div>
//               </div>

//               <div style={{ display: 'flex', marginBottom: '20px' }}>
//                 <div style={{ flex: '1', marginRight: '20px' }}>
//                   <label style={{ display: 'block', marginBottom: '5px', color: '#106053', textTransform: 'uppercase' }}>Email:</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={user.email}
//                     onChange={handleChange}
//                     required
//                     placeholder="firstname@student.ciu.ac.ug"
//                     style={{
//                       width: '100%',
//                       padding: '12px',
//                       border: '1px solid #106053',
//                       fontSize: '16px',
//                     }}
//                   />
//                 </div>
//                 <div style={{ flex: '1' }}>
//                   <label style={{ display: 'block', marginBottom: '5px', color: '#106053', textTransform: 'uppercase' }}>Course:</label>
//                   <select
//                     name="courseId"
//                     value={user.courseId}
//                     onChange={handleChange}
//                     required
//                     className="course-select"
//                     style={{
//                       width: '100%',
//                       padding: '12px',
//                       border: '1px solid #106053',
//                       fontSize: '16px',
//                       borderRadius: '4px',
//                       backgroundColor: '#fff',
//                       color: '#333',
//                     }}
//                   >
//                     <option value="">Select a Course</option>
//                     {courses.length > 0 ? (
//                       courses.map((course) => (
//                         <option key={course.id} value={course.id}>
//                           {course.courseName} 
//                         </option>
//                       ))
//                     ) : (
//                       <option disabled>Loading courses...</option>
//                     )}
//                   </select>
//                 </div>
//               </div>

//               <div style={{ display: 'flex', marginBottom: '20px' }}>
//                 <div style={{ flex: '1', marginRight: '20px' }}>
//                   <label style={{ display: 'block', marginBottom: '5px', color: '#106053', textTransform: 'uppercase' }}>Registration No:</label>
//                   <input
//                     type="text"
//                     name="registrationNo"
//                     value={user.registrationNo}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter your registration number"
//                     style={{
//                       width: '100%',
//                       padding: '12px',
//                       border: '1px solid #106053',
//                       fontSize: '16px',
//                     }}
//                   />
//                 </div>
//                 {/* <div style={{ flex: '1' }}>
//                   <label style={{ display: 'block', marginBottom: '5px', color: '#106053', textTransform: 'uppercase' }}>Password:</label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={user.password}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter your password"
//                     style={{
//                       width: '100%',
//                       padding: '12px',
//                       border: '1px solid #106053',
//                       fontSize: '16px',
//                     }}
//                   />
//                 </div> */}
//               </div>

//               <div style={{ display: 'flex', marginBottom: '20px' }}>
//                 <div style={{ flex: '1', marginRight: '20px' }}>
//                   <label style={{ display: 'block', marginBottom: '5px', color: '#106053', textTransform: 'uppercase' }}>Role:</label>
//                   <input
//                     type="text"
//                     name="role"
//                     value={user.role}
//                     onChange={handleChange}
//                     required
//                     placeholder="e.g., student"
//                     style={{
//                       width: '100%',
//                       padding: '12px',
//                       border: '1px solid #106053',
//                       fontSize: '16px',
//                     }}
//                   />
//                 </div>
//                 <div style={{ flex: '1' }}>
//                   <label style={{ display: 'block', marginBottom: '5px', color: '#106053', textTransform: 'uppercase' }}>DateTime:</label>
//                   <input
//                     type="datetime-local"
//                     name="dateTime"
//                     value={user.dateTime}
//                     onChange={handleChange}
//                     required
//                     style={{
//                       width: '100%',
//                       padding: '12px',
//                       border: '1px solid #106053',
//                       fontSize: '16px',
//                     }}
//                   />
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 style={{
//                   width: '100%',
//                   padding: '15px',
//                   backgroundColor: '#106053',
//                   color: '#fff',
//                   fontSize: '16px',
//                   fontWeight: 'bold',
//                   borderRadius: '4px',
//                   cursor: 'pointer',
//                   transition: 'background-color 0.3s ease',
//                 }}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#0c4b42'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = '#106053'}
//               >
//                 Register
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegForm;

import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Snackbar, Alert } from '@mui/material';
import styles from './RegForm.module.css';

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


