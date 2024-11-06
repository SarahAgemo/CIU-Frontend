// src/CourseCard.jsx
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  const [showUnits, setShowUnits] = useState(false);

  const toggleUnits = () => setShowUnits(!showUnits);

  return (
    <div className="course-card">
      <div className="course-header" onClick={toggleUnits}>
        <h2>{course.name}</h2>
        {showUnits ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {showUnits && (
        <ul className="units-list">
          {course.units.map((unit, index) => (
            <li key={index}>{unit}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseCard;
