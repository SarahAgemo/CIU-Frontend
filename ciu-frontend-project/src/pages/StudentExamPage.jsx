import React from 'react';
import StudentCameraFeed from '../components/StudentCameraFeed';

const StudentExamPage = () => {
  const roomId = 'exam-room';  // Unique room identifier for the exam

  return (
    <div>
      <h2>Student Exam Feed</h2>
      <StudentCameraFeed roomId={roomId} />  {/* Using the StudentCameraFeed component */}
    </div>
  );
};

export default StudentExamPage;
