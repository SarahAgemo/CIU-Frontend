import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
// import ResetPassword from './components/admin/ResetPassword';
import RegForm from "./components/admin/RegForm";
import Registration from "./pages/admin/Registration.jsx";
import React from "react";
import ExamInstructions from "./pages/student/ExamInstructions";
import Proctoring from "./pages/student/Proctoring";
import Quiz from "./pages/student/Quiz";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registers" element={<Registration />} />{" "}
        {/* Registration Route */}
        <Route path="/" element={<Login />} />
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
        <Route path="/register" element={<RegForm />} />
        {/* <Route path="/examschedule" element={<ExamSchedule />} /> */}
        <Route path="/instructions" element={<ExamInstructions />} />
        <Route path="/proctoring" element={<Proctoring />} />
        <Route path="/quiz" element={<Quiz />} />
        {/* <Route path="/systemoutage" element={<SystemOutage />} />
        <Route path="/timeout" element={<TimeOut />} />
        <Route path="/results" element={<Results />} />
        <Route path="/support" element={<Support />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
