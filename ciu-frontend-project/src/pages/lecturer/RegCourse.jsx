import React, { useState } from 'react';
import './RegCourse.css';
import Header from '../../components/admin/Header';  // Import the Header
import Sidebar1 from '../../components/lecturer/SideBar';  // Import the Sidebar

const RegCourse = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("Select User");
  const [formData, setFormData] = useState({
    facultyName: '',
    courseName: '',
    courseUnits: '',
    courseUnitsCode: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setIsOpen(false);
    setFormData({
      ...formData,
      emailOrStudentNumber: '', // Reset the input field when user type changes
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let errors = {};

    if (!formData.facultyName.trim()) {
      errors.facultyName = 'Faculty Name is required';
    }

    if (!formData.courseName.trim()) {
      errors.courseName = 'Course Name is required';
    }

    if (!formData.courseUnits.trim()) {
      errors.courseUnits = 'Course Units is required'; // Only require email for lecturers and administrators
     } 
    //  else if (!/\S+@\S+\.\S+/.test(formData.emailOrStudentNumber)) {
    //    errors.emailOrStudentNumber = 'Email is invalid';
    //  }

    if (!formData.courseUnitsCode.trim()) {
      errors.courseUnitsCode = 'Course Unit Code is required';
    } 
    // else if (formData.password.length < 6) {
    //   errors.password = 'Password must be at least 6 characters long';
    // }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        let endpoint = '';
        let payload;

        // Set the endpoint and payload based on the selected user type
        if (selectedUser === "Lecturer") {
          endpoint = 'http://localhost:3000/lecturerReg';
          payload = {
            faculty_name: formData.facultytName,
            course_name: formData.courseName,
            // course_units: null, // No student number for lecturer
            course_units: formData.courseUnits, // Email for lecturer
            course_units_code: formData.courseUnitsCode,
            // password: formData.password,
          };
        } else if (selectedUser === "Administrator") {
          endpoint = '/api/register/administrator';
          payload = {
            faculty_name: formData.facultyName,
            course_name: formData.courseName,
            // student_number: null, // No student number for administrator
            course_units: formData.courseUnits, // Email for administrator
            role: selectedUser,
            course_units_code:formData.courseUnitsCode ,
          };
        }

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          setSuccessMessage(`${selectedUser} successfully registered!`);
          setFormData({ facultyName: '', courseName: '', courseUnits: '', courseUnitsCode: '' }); // Clear the form
          setErrors({});
        } else {
          const errorData = await response.json();
          setErrors(errorData.errors || {});
        }
      } catch (error) {
        console.error('Error registering user:', error);
        setErrors({ server: 'An error occurred. Please try again later.' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className='container'>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        {/* <div className="button-group">
          <button type="button" className={selectedUser === "Administrator" ? "active" : ""} onClick={() => handleUserSelection("Administrator")}>Administrator</button>
          <button type="button" className={selectedUser === "Lecturer" ? "active" : ""} onClick={() => handleUserSelection("Lecturer")}>Lecturer</button>
        </div> */}

        <label htmlFor='facultyName'>Faculty Name</label>
        <input
          type="text"
          placeholder='Enter Faculty Name'
          name='facultyName'
          value={formData.facultyName}
          onChange={handleInputChange}
        />
        {errors.facultyName && <span className='error'>{errors.facultyName}</span>}

        <label htmlFor='courseName'> Course Name</label>
        <input
          type="text"
          placeholder='Enter Course Name'
          name='courseName'
          value={formData.course}
          onChange={handleInputChange}
        />
        {errors.courseName && <span className='error'>{errors.courseName}</span>}

        <label htmlFor='courseUnits'>Course Units</label>
        <input
          type="text"
          placeholder='Enter Course Units'
          name='courseUnits'
          value={formData.courseUnits}
          onChange={handleInputChange}
        />
        {errors.courseUnits && <span className='error'>{errors.courseUnits}</span>}

        <label htmlFor='courseUnitsCode'>Course Units Code</label>
        <input
          type="text"
          placeholder='Enter Course Units Code'
          name='courseUnitsCode'
          value={formData.courseUnitsCode}
          onChange={handleInputChange}
        />
        {errors.courseUnitsCode && <span className='error'>{errors.courseUnitsCode}</span>}

        <button type='submit'>Submit</button>
        {successMessage && <p className='success'>{successMessage}</p>} {/* Success message display */}
        {errors.server && <span className='error'>{errors.server}</span>} {/* Server error display */}
      </form>
    </div>
    
  );

  
  return (
    <div className="layout-container">  {/* New layout container */}
        <Header />  {/* Render Header */}
        <div className="main-content">  {/* Flex container for sidebar and content */}
            <Sidebar1 />  {/* Render Sidebar */}
           
        </div>
    </div>
   );
};

export default RegCourse;
