// import React, { useState, useEffect } from 'react';
// import { TextField, Button, Grid } from '@mui/material';

// const CourseRegistration = ({ initialData, onSubmit, onCancel }) => {
//   const [formData, setFormData] = useState({
//     facultyName: '',
//     courseName: '',
//     courseUnits: '',
//     courseUnitsCode: ''
//   });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (initialData) {
//       setFormData({
//         facultyName: initialData.facultyName,
//         courseName: initialData.courseName,
//         courseUnits: Array.isArray(initialData.courseUnits) ? initialData.courseUnits.join(', ') : initialData.courseUnits,
//         courseUnitsCode: Array.isArray(initialData.courseUnitCode) ? initialData.courseUnitCode.join(', ') : initialData.courseUnitCode
//       });
//     }
//   }, [initialData]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const validate = () => {
//     let errors = {};
//     if (!formData.facultyName.trim()) errors.facultyName = 'Faculty Name is required';
//     if (!formData.courseName.trim()) errors.courseName = 'Course Name is required';
//     if (!formData.courseUnits.trim()) errors.courseUnits = 'Course Units are required';
//     if (!formData.courseUnitsCode.trim()) errors.courseUnitsCode = 'Course Unit Code is required';
//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length === 0) {
//       const payload = {
//         ...formData,
//         courseUnits: formData.courseUnits.split(',').map(item => item.trim()),
//         courseUnitCode: formData.courseUnitsCode.split(',').map(item => item.trim()),
//       };
//       if (initialData) {
//         payload.id = initialData.id;
//       }
//       onSubmit(payload);
//     } else {
//       setErrors(validationErrors);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             label="Faculty Name"
//             name="facultyName"
//             value={formData.facultyName}
//             onChange={handleInputChange}
//             error={!!errors.facultyName}
//             helperText={errors.facultyName}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             label="Course Name"
//             name="courseName"
//             value={formData.courseName}
//             onChange={handleInputChange}
//             error={!!errors.courseName}
//             helperText={errors.courseName}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             label="Course Units"
//             name="courseUnits"
//             value={formData.courseUnits}
//             onChange={handleInputChange}
//             error={!!errors.courseUnits}
//             helperText={errors.courseUnits || "Enter multiple course units separated by commas"}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             label="Course Units Code"
//             name="courseUnitsCode"
//             value={formData.courseUnitsCode}
//             onChange={handleInputChange}
//             error={!!errors.courseUnitsCode}
//             helperText={errors.courseUnitsCode || "Enter multiple course unit codes separated by commas"}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>
//             {initialData ? 'Update' : 'Submit'}
//           </Button>
//           <Button variant="outlined" onClick={onCancel}>
//             Cancel
//           </Button>
//         </Grid>
//       </Grid>
//     </form>
//   );
// }

// export default CourseRegistration;