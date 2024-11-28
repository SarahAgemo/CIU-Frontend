import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterCourseContent.module.css';
import Header from '../../components/admin/Headerpop';
import Sidebar from '../../components/admin/SideBarpop';
import MobileMenu from "../../components/admin/MobileMenu";
import AdminDash from '../admin/AdminDashboard.module.css';

const RegCourse = () => {
  const navigate = useNavigate();
  
  // Mobile responsiveness states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Form data and error states
  const [formData, setFormData] = useState({
    facultyName: '',
    courseName: '',
    courseUnits: '',
    courseUnitsCode: ''
  });
  const [errors, setErrors] = useState({});
  const [specificError, setSpecificError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mobile responsiveness effect
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear specific errors when user starts typing
    if (specificError) {
      setSpecificError('');
    }
  };

  // Form validation
  const validate = () => {
    const newErrors = {};
    
    // Trim and validate each field
    const requiredFields = [
      'facultyName', 
      'courseName', 
      'courseUnits', 
      'courseUnitsCode'
    ];

    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`;
      }
    });

    // Additional validation for course units and codes
    if (formData.courseUnits) {
      const units = formData.courseUnits.split(',').map(u => u.trim());
      if (units.some(u => !u)) {
        newErrors.courseUnits = 'Invalid course units format';
      }
    }

    if (formData.courseUnitsCode) {
      const codes = formData.courseUnitsCode.split(',').map(c => c.trim());
      if (codes.some(c => !c)) {
        newErrors.courseUnitsCode = 'Invalid course unit codes format';
      }
    }

    return newErrors;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpecificError('');
    setErrors({});
    setIsSubmitting(true);

    // Validate form
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare payload
      const payload = {
        facultyName: formData.facultyName.trim(),
        courseName: formData.courseName.trim(),
        courseUnits: formData.courseUnits.split(',').map(item => item.trim()),
        courseUnitCode: formData.courseUnitsCode.split(',').map(item => item.trim()),
      };

      // Submit to backend
      const response = await fetch('http://localhost:3000/coursesAdd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Handle response
      if (response.ok) {
        // Success scenario
        navigate('/admin-courses', { 
          state: { 
            successMessage: 'Course successfully registered!' 
          } 
        });
      } else {
        // Error handling
        const errorData = await response.json();
        
        if (response.status === 409) {
          // Conflict error (duplicate course)
          setSpecificError(
            errorData.message || 
            'A course with this name already exists in the specified faculty'
          );
        } else {
          // Other validation errors
          setErrors(errorData.errors || {});
        }
      }
    } catch (error) {
      console.error('Error registering course:', error);
      setSpecificError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={AdminDash["overall"]}>
      <div className={`${AdminDash["dashboard"]} ${isMobileMenuOpen ? AdminDash["menu-open"] : ""}`}>
        <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
        <div className={AdminDash["dashboard-content"]}>
          {!isMobile && <Sidebar />}
          {isMobile && (
            <>
              <div 
                className={`${AdminDash["overlay"]} ${isMobileMenuOpen ? AdminDash["active"] : ""}`} 
                onClick={toggleMobileMenu}
              ></div>
              <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
            </>
          )}
          <div className={`${styles.mainContentWrapper} ${isMobileMenuOpen ? styles.dimmed : ''}`}>
            <div className={styles.formContainer}>
              <h2 className={styles.formTitle}>Register Course</h2>
              
              {/* Specific Error Display */}
              {specificError && (
                <div className={`${styles.error} ${styles.globalError}`}>
                  {specificError}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Faculty Name Input */}
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor='facultyName'>Faculty Name</label>
                  <input
                    type="text"
                    className={`${styles.formControl} ${errors.facultyName ? styles.errorInput : ''}`}
                    placeholder='Enter Faculty Name'
                    name='facultyName'
                    value={formData.facultyName}
                    onChange={handleInputChange}
                  />
                  {errors.facultyName && (
                    <span className={styles.error}>{errors.facultyName}</span>
                  )}
                </div>

                {/* Course Name Input */}
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor='courseName'>Course Name</label>
                  <input
                    type="text"
                    className={`${styles.formControl} ${errors.courseName ? styles.errorInput : ''}`}
                    placeholder='Enter Course Name'
                    name='courseName'
                    value={formData.courseName}
                    onChange={handleInputChange}
                  />
                  {errors.courseName && (
                    <span className={styles.error}>{errors.courseName}</span>
                  )}
                </div>

                {/* Course Units Input */}
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor='courseUnits'>Course Units</label>
                  <input
                    type="text"
                    className={`${styles.formControl} ${errors.courseUnits ? styles.errorInput : ''}`}
                    placeholder='Enter multiple course units (comma-separated)'
                    name='courseUnits'
                    value={formData.courseUnits}
                    onChange={handleInputChange}
                  />
                  {errors.courseUnits && (
                    <span className={styles.error}>{errors.courseUnits}</span>
                  )}
                </div>

                {/* Course Units Code Input */}
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor='courseUnitsCode'>Course Units Code</label>
                  <input
                    type="text"
                    className={`${styles.formControl} ${errors.courseUnitsCode ? styles.errorInput : ''}`}
                    placeholder='Enter multiple course unit codes (comma-separated)'
                    name='courseUnitsCode'
                    value={formData.courseUnitsCode}
                    onChange={handleInputChange}
                  />
                  {errors.courseUnitsCode && (
                    <span className={styles.error}>{errors.courseUnitsCode}</span>
                  )}
                </div>

                {/* Submit Button */}
                <div className={styles.buttonContainer}>
                  <button 
                    type='submit' 
                    className={styles.btnPrimary}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegCourse;