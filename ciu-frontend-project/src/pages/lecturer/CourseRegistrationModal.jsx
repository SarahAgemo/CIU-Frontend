import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from './CourseRegistrationModal.module.css';

const CourseRegistration = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    facultyName: '',
    courseName: '',
    courseUnits: '',
    courseUnitsCode: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        facultyName: initialData.facultyName || '',
        courseName: initialData.courseName || '',
        courseUnits: Array.isArray(initialData.courseUnits) ? initialData.courseUnits.join(', ') : initialData.courseUnits || '',
        courseUnitsCode: Array.isArray(initialData.courseUnitCode) ? initialData.courseUnitCode.join(', ') : initialData.courseUnitsCode || ''
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let errors = {};
    if (!formData.facultyName.trim()) errors.facultyName = 'Faculty Name is required';
    if (!formData.courseName.trim()) errors.courseName = 'Course Name is required';
    if (!formData.courseUnits.trim()) errors.courseUnits = 'Course Units are required';
    if (!formData.courseUnitsCode.trim()) errors.courseUnitsCode = 'Course Unit Code is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const payload = {
        facultyName: formData.facultyName,
        courseName: formData.courseName,
        courseUnits: formData.courseUnits.split(',').map(item => item.trim()),
        courseUnitCode: formData.courseUnitsCode.split(',').map(item => item.trim()),
      };
      onSubmit(payload);
    } else {
      setErrors(validationErrors);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{initialData ? 'Edit Course' : 'Register Course'}</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor='facultyName'>Faculty Name</label>
            <input
              type="text"
              className={styles.formControl}
              placeholder='Enter Faculty Name'
              name='facultyName'
              value={formData.facultyName}
              onChange={handleInputChange}
            />
            {errors.facultyName && <span className={styles.error}>{errors.facultyName}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor='courseName'>Course Name</label>
            <input
              type="text"
              className={styles.formControl}
              placeholder='Enter Course Name'
              name='courseName'
              value={formData.courseName}
              onChange={handleInputChange}
            />
            {errors.courseName && <span className={styles.error}>{errors.courseName}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor='courseUnits'>Course Units</label>
            <input
              type="text"
              className={styles.formControl}
              placeholder='Enter multiple course units separated by commas'
              name='courseUnits'
              value={formData.courseUnits}
              onChange={handleInputChange}
            />
            {errors.courseUnits && <span className={styles.error}>{errors.courseUnits}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor='courseUnitsCode'>Course Units Code</label>
            <input
              type="text"
              className={styles.formControl}
              placeholder='Enter multiple course unit codes separated by commas'
              name='courseUnitsCode'
              value={formData.courseUnitsCode}
              onChange={handleInputChange}
            />
            {errors.courseUnitsCode && <span className={styles.error}>{errors.courseUnitsCode}</span>}
          </div>

          <div className={styles.buttonContainer}>
            <button type='submit' className={styles.btnPrimary}>
              {initialData ? 'Update' : 'Submit'}
            </button>
            {/* <button type='button' onClick={onClose} className={styles.btnSecondary}>
              Cancel
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CourseRegistration;