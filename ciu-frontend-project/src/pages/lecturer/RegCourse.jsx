
import React, { useState } from 'react';
import { useEffect } from 'react';
import styles from './RegCourseContent.module.css'; // Import the CSS module
import Header from '../../components/admin/Headerpop';
import Sidebar from '../../components/admin/SideBarpop';
import MobileMenu from "../../components/admin/MobileMenu";
import AdminDash from '../admin/Dashboard.module.css';

const RegCourse = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const [formData, setFormData] = useState({
    facultyName: '',
    courseName: '',
    courseUnits: '',
    courseUnitsCode: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

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
      errors.courseUnits = 'Course Units are required';
    }
    if (!formData.courseUnitsCode.trim()) {
      errors.courseUnitsCode = 'Course Unit Code is required';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const endpoint = 'http://localhost:3000/coursesAdd'; // Adjust endpoint as needed

        const payload = {
          facultyName: formData.facultyName,
          courseName: formData.courseName,
          courseUnits: formData.courseUnits.split(','),
          courseUnitCode: formData.courseUnitsCode,
        };

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          setSuccessMessage('Course successfully registered!');
          setFormData({ facultyName: '', courseName: '', courseUnits: '', courseUnitsCode: '' });
          setErrors({});
        } else {
          const errorData = await response.json();
          setErrors(errorData.errors || {});
        }
      } catch (error) {
        console.error('Error registering course:', error);
        setErrors({ server: 'An error occurred. Please try again later.' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  // return (
  // <div className={styles.formContainer}> {/* Use module styles */}
  //   <h2 className={styles.formTitle}>Register Course</h2>
  //   <form onSubmit={handleSubmit}>
  //     <div className={styles.formGroup}> {/* Faculty Name */}
  //       <label className={styles.label} htmlFor='facultyName'>Faculty Name</label>
  //       <input
  //         type="text"
  //         className={styles.formControl} // Use module styles
  //         placeholder='Enter Faculty Name'
  //         name='facultyName'
  //         value={formData.facultyName}
  //         onChange={handleInputChange}
  //       />
  //       {errors.facultyName && <span className={styles.error}>{errors.facultyName}</span>}
  //     </div>

  //     <div className={styles.formGroup}> {/* Course Name */}
  //       <label className={styles.label} htmlFor='courseName'>Course Name</label>
  //       <input
  //         type="text"
  //         className={styles.formControl} // Use module styles
  //         placeholder='Enter Course Name'
  //         name='courseName'
  //         value={formData.courseName}
  //         onChange={handleInputChange}
  //       />
  //       {errors.courseName && <span className={styles.error}>{errors.courseName}</span>}
  //     </div>

  //     <div className={styles.formGroup}> {/* Course Units */}
  //       <label className={styles.label} htmlFor='courseUnits'>Course Units</label>
  //       <input
  //         type="text"
  //         className={styles.formControl} // Use module styles
  //         placeholder='Enter Course Units'
  //         name='courseUnits'
  //         value={formData.courseUnits}
  //         onChange={handleInputChange}
  //       />
  //       {errors.courseUnits && <span className={styles.error}>{errors.courseUnits}</span>}
  //     </div>

  //     <div className={styles.formGroup}> {/* Course Units Code */}
  //       <label className={styles.label} htmlFor='courseUnitsCode'>Course Units Code</label>
  //       <input
  //         type="text"
  //         className={styles.formControl} // Use module styles
  //         placeholder='Enter Course Units Code'
  //         name='courseUnitsCode'
  //         value={formData.courseUnitsCode}
  //         onChange={handleInputChange}
  //       />
  //       {errors.courseUnitsCode && <span className={styles.error}>{errors.courseUnitsCode}</span>}
  //     </div>

  //     <div className={styles.buttonContainer}> {/* Button Container */}
  //       <button type='submit' className={styles.btnPrimary}>Submit</button>
  //       {successMessage && <p className={styles.success}>{successMessage}</p>}
  //       {errors.server && <span className={styles.error}>{errors.server}</span>}
  //     </div>
  //   </form>
  // </div>
  // );
  // 
  return (
    <div className={AdminDash["overall"]}>
          <div className={AdminDash["dashboard"]}>
               <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
          <div className={AdminDash["dashboard-content"]}>
            {!isMobile && <Sidebar />}
            {isMobile && (
              <MobileMenu
                isOpen={isMobileMenuOpen}
                toggleMenu={toggleMobileMenu}
              />
            )}
          <div className={styles.formContainer}> {/* Use module styles */}
            <h2 className={styles.formTitle}>Register Course</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}> {/* Faculty Name */}
                <label className={styles.label} htmlFor='facultyName'>Faculty Name</label>
                <input
                  type="text"
                  className={styles.formControl} // Use module styles
                  placeholder='Enter Faculty Name'
                  name='facultyName'
                  value={formData.facultyName}
                  onChange={handleInputChange}
                />
                {errors.facultyName && <span className={styles.error}>{errors.facultyName}</span>}
              </div>

              <div className={styles.formGroup}> {/* Course Name */}
                <label className={styles.label} htmlFor='courseName'>Course Name</label>
                <input
                  type="text"

                  className={styles.formControl} // Use module styles
                  placeholder='Enter Course Name'
                  name='courseName'
                  value={formData.courseName}
                  onChange={handleInputChange}
                />
                {errors.courseName && <span className={styles.error}>{errors.courseName}</span>}
              </div>

              <div className={styles.formGroup}> {/* Course Units */}
                <label className={styles.label} htmlFor='courseUnits'>Course Units</label>
                <input
                  type="text"
                  className={styles.formControl} // Use module styles
                  placeholder='Enter Course Units'
                  name='courseUnits'
                  value={formData.courseUnits}
                  onChange={handleInputChange}
                />
                {errors.courseUnits && <span className={styles.error}>{errors.courseUnits}</span>}
              </div>

              <div className={styles.formGroup}> {/* Course Units Code */}
                <label className={styles.label} htmlFor='courseUnitsCode'>Course Units Code</label>
                <input
                  type="text"
                  className={styles.formControl} // Use module styles
                  placeholder='Enter Course Units Code'
                  name='courseUnitsCode'
                  value={formData.courseUnitsCode}
                  onChange={handleInputChange}
                />
                {errors.courseUnitsCode && <span className={styles.error}>{errors.courseUnitsCode}</span>}
              </div>

              <div className={styles.buttonContainer}> {/* Button Container */}
                <button type='submit' className={styles.btnPrimary}>Submit</button>
                {successMessage && <p className={styles.success}>{successMessage}</p>}
                {errors.server && <span className={styles.error}>{errors.server}</span>}
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
      );
}

      export default RegCourse;
