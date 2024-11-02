import React, { useState } from 'react';
import './QuestionBankPage.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const QuestionBankPage = () => {
  const [expandedCourse, setExpandedCourse] = useState(null);

  const courses = [
    {
      id: 1,
      name: 'Computer Science',
      units: ['Data Structures', 'Algorithms', 'Databases'],
    },
    {
      id: 2,
      name: 'Software Engineering',
      units: ['Software Design', 'Project Management', 'System Testing'],
    },
    {
      id: 3,
      name: 'Information Systems',
      units: ['Business Analytics', 'MIS', 'IT Governance'],
    },
  ];

  const toggleCourse = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  return (
    <div className="question-bank-container">
      <h1 className="page-title">Question Bank</h1>

      
      <div className="main-card">
        <div className="course-list">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-header" onClick={() => toggleCourse(course.id)}>
                <h2>{course.name}</h2>
                {expandedCourse === course.id ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {expandedCourse === course.id && (
                <ul className="units-list">
                  {course.units.map((unit, index) => (
                    <li key={index}>{unit}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionBankPage;
