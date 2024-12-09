// import React, { useState, useEffect } from 'react'; 
// import { useParams, useNavigate } from 'react-router-dom';
// import Header from './Header1';
// import Sidebar1 from './SideBar1';

// const EditStudent = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     program: '',
//     registrationNo: '',
//     password: '',
//     role: '',
//     dateTime: '',
//     courseId: '',  // Add courseId to state
//   });

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       try {
//         const response = await fetch(`https://c-i-u-backend.onrender.com/students/${id}`);
//         const data = await response.json();
//         setUser({
//           firstName: data.first_name,
//           lastName: data.last_name,
//           email: data.email,
//           program: data.program,
//           registrationNo: data.registrationNo,
//           password: data.password,
//           role: data.role,
//           dateTime: data.dateTime,
//           courseId: data.courseId,  // Set courseId from fetched data
//         });
//       } catch (error) {
//         console.error('Error fetching student data:', error);
//       }
//     };

//     fetchStudentData();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({
//       ...user,
//       [name]: name === "courseId" ? Number(value) : value,  // Convert courseId to a number
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const userData = {
//       first_name: user.firstName,
//       last_name: user.lastName,
//       email: user.email,
//       program: user.program,
//       registrationNo: user.registrationNo,
//       password: user.password,
//       role: user.role,
//       dateTime: user.dateTime,
//       courseId: user.courseId,  // Include courseId in the data to be updated
//     };

//     try {
//       const response = await fetch(`https://c-i-u-backend.onrender.com/students/${id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Network response was not ok');
//       }

//       const result = await response.json();
//       console.log('User updated successfully:', result);
//       alert('User updated successfully!');
//       navigate('/table');

//     } catch (error) {
//       console.error('Error updating user:', error);
//       alert(`Error updating user: ${error.message}`);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <Header />
//       <div style={styles.mainContent}>
//         <Sidebar1 />
//         <div style={styles.formContainer}>
//           <h2 style={styles.header}>Edit Student</h2>
//           <form onSubmit={handleSubmit}>
//             <div style={styles.row}>
//               <div style={styles.inputGroup}>
//                 <label style={styles.label}>First Name:</label>
//                 <input type="text" name="firstName" value={user.firstName} onChange={handleChange} required style={styles.input} />
//               </div>
//               <div style={styles.inputGroup}>
//                 <label style={styles.label}>Last Name:</label>
//                 <input type="text" name="lastName" value={user.lastName} onChange={handleChange} required style={styles.input} />
//               </div>
//             </div>

//             <div style={styles.row}>
//               <div style={styles.inputGroup}>
//                 <label style={styles.label}>Email:</label>
//                 <input type="email" name="email" value={user.email} onChange={handleChange} required style={styles.input} />
//               </div>
//               <div style={styles.inputGroup}>
//                 <label style={styles.label}>Program:</label>
//                 <input type="text" name="program" value={user.program} onChange={handleChange} required style={styles.input} />
//               </div>
//             </div>

//             <div style={styles.row}>
//               <div style={styles.inputGroup}>
//                 <label style={styles.label}>Registration No:</label>
//                 <input type="text" name="registrationNo" value={user.registrationNo} onChange={handleChange} required style={styles.input} />
//               </div>
//               <div style={styles.inputGroup}>
//                 <label style={styles.label}>Password:</label>
//                 <input type="password" name="password" value={user.password} onChange={handleChange} required style={styles.input} />
//               </div>
//             </div>

//             <div style={styles.row}>
//               <div style={styles.inputGroup}>
//                 <label style={styles.label}>Role:</label>
//                 <input type="text" name="role" value={user.role} onChange={handleChange} required style={styles.input} />
//               </div>
//               <div style={styles.inputGroup}>
//                 <label style={styles.label}>Course ID:</label>
//                 <input type="number" name="courseId" value={user.courseId} onChange={handleChange} required style={styles.input} />
//               </div>
//             </div>

//             <button type="submit" style={styles.button}>
//               Update User
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Inline Styles
// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     minHeight: '100vh',
//   },
//   mainContent: {
//     display: 'flex',
//     flex: 1,
//   },
//   formContainer: {
//     padding: '30px',
//     borderRadius: '12px',
//     backgroundColor: 'rgba(255, 255, 255, 0.95)',
//     boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
//     width: '80%',
//     maxWidth: '600px',
//     margin: 'auto',
//   },
//   header: {
//     textAlign: 'center',
//     color: '#065c4c',
//   },
//   row: {
//     display: 'flex',
//     marginBottom: '20px',
//   },
//   inputGroup: {
//     flex: '1',
//     marginRight: '20px',
//   },
//   label: {
//     display: 'block',
//     marginBottom: '5px',
//     color: '#106053',
//     textTransform: 'uppercase',
//   },
//   input: {
//     width: '100%',
//     padding: '12px',
//     border: '1px solid #106053',
//     fontSize: '16px',
//   },
//   button: {
//     width: '100%',
//     padding: '12px',
//     backgroundColor: '#065c4c',
//     color: 'white',
//     border: 'none',
//     cursor: 'pointer',
//     fontSize: '16px',
//     transition: 'background-color 0.3s',
//   },
// };

// export default EditStudent;


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
        {/* <div className={editStudent["form-group"]}>
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            className={editStudent["form-control"]}
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div> */}
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




