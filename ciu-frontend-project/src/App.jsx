
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExamSchedule from './pages/student/ExamSchedule';
import ExamInstructions from './pages/student/ExamInstructions';
import Proctoring from './pages/student/Proctoring';
import Quiz from './pages/student/Quiz';
import SystemOutage from './pages/student/SystemOutage';
import TimeOut from './pages/student/TimeOut';

import Results from './pages/student/Results';
import Support from './pages/student/Support';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExamSchedule />} />
        <Route path="/instructions" element={<ExamInstructions />} />
        <Route path="/proctoring" element={<Proctoring />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/systemoutage" element={<SystemOutage />} />
        <Route path="/timeout" element={<TimeOut />} />
       
        <Route path="/results" element={<Results />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </Router>
  );
};

export default App;
