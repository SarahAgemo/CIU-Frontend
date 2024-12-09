

// import { useState, useEffect } from 'react';
// import Header from '../../components/lecturer/HeaderPop';
// import Sidebar from '../../components/lecturer/SideBarPop';
// import MobileMenu from "../../components/lecturer/MobileMenu";
// import CreateExamContent from './ManualCreateExamContent';
// import Dash from '../../components/lecturer/LecturerDashboard.module.css';


// export default function CreateExam() {
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const [isMobile, setIsMobile] = useState(false);

//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth <= 991);
//         };

//         window.addEventListener('resize', handleResize);
//         handleResize();

//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     const toggleMobileMenu = () => {
//         setIsMobileMenuOpen(!isMobileMenuOpen);
//     };

//     return (
//         <div className={Dash.lecturerDashboard}>
//             <div className={Dash.dashboard}>
//                 <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
//                 <div className={Dash['dashboard-content']}>
//                     {!isMobile && <Sidebar />}
//                     {isMobile && <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />}
//                     <CreateExamContent />
//                 </div>
//             </div>
//         </div>
//     );
// }

import React from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import styles from './ManualCreateExams.module.css';

export default function ManualCreateExams({ onClose }) {
  const [formData, setFormData] = React.useState({
    examTitle: '',
    courseCode: '',
    examType: '',
    examDuration: '',
    examDate: '',
    startTime: '',
    endTime: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    onClose();
  };

  return (
    <div className={styles.createExamForm}>
      <h2>Create New Exam</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Exam Title"
          name="examTitle"
          value={formData.examTitle}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Course Code"
          name="courseCode"
          value={formData.courseCode}
          onChange={handleChange}
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Exam Type</InputLabel>
          <Select
            name="examType"
            value={formData.examType}
            onChange={handleChange}
          >
            <MenuItem value="midterm">Midterm</MenuItem>
            <MenuItem value="final">Final</MenuItem>
            <MenuItem value="quiz">Quiz</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Exam Duration (minutes)"
          name="examDuration"
          type="number"
          value={formData.examDuration}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Exam Date"
          name="examDate"
          type="date"
          value={formData.examDate}
          onChange={handleChange}
          margin="normal"
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          label="Start Time"
          name="startTime"
          type="time"
          value={formData.startTime}
          onChange={handleChange}
          margin="normal"
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          label="End Time"
          name="endTime"
          type="time"
          value={formData.endTime}
          onChange={handleChange}
          margin="normal"
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className={styles.formActions}>
          <Button type="submit" variant="contained" color="primary">
            Create Exam
          </Button>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}