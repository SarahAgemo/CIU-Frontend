import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import RegForm from './components/admin/RegForm.jsx';
import Registration from "./pages/admin/Registration.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import Users from './components/admin/Users.jsx';
import EditUser from './components/admin/EditUser.jsx';
import Layout from "./components/admin/Layout.jsx";
import RequestToken from "./components/admin/RequestToken.jsx";
import ScheduleUploadExams from "./pages/lecturer/ScheduleUploadExams.jsx";
import ScheduleCreateExams from "./pages/lecturer/ScheduleCreateExams.jsx";
import AddQuestions from "./pages/lecturer/AddQuestions.jsx";
import RegCourse from "./pages/lecturer/RegCourse.jsx";  // New import for RegCourse
import Courses from "./pages/lecturer/Courses.jsx";  // New import for Courses
import ResetPassword from './components/admin/ResetPassword.jsx';
import Students from './components/admin/students.jsx';
import EditStudent from './components/admin/EditStudent.jsx';
import Adminuser from "./components/admin/Adminuser.jsx";
import Editadmin from "./components/admin/Editadmin.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import DoExam from "./pages/student/DoExam.jsx";
import SupportPage from "./pages/student/SupportPage.jsx";
import Questions from "./pages/student/FAQpage.jsx";
import ReportIssue from "./pages/student/ReportIssue.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegForm />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/manage-users" element={<ManageUsers />} />
        <Route path="/registers" element={<Registration />} />
        <Route path="/manage" element={<ManageUsers />} />
        <Route path="/users" element={<Users />} />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path="/layout" element={<Layout />} />
        <Route path="/request-token" element={<RequestToken />} />
        <Route path="/table" element={<Students />} />
        <Route path="/edit-student/:id" element={<EditStudent />} />
        <Route path="/adminuser" element={<Adminuser />} />
        <Route path="/editadmin/:id" element={<Editadmin />} />

        {/* Lecturer */}
        <Route path="/schedule-upload-exams" element={<ScheduleUploadExams />} />
        <Route path="/schedule-create-exams" element={<ScheduleCreateExams />} />
        <Route path="/add-questions" element={<AddQuestions />} />
        <Route path="/regCourse" element={<RegCourse />} /> {/* New RegCourse Route */}
        <Route path="/courses" element={<Courses />} /> {/* New Courses Route */}

        {/* Student */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/do-exam" element={<DoExam />} />
        <Route path="/student/support" element={<SupportPage />} />
        <Route path="/student/support/faqs" element={<Questions />} />
        <Route path="/student/support/report-issue" element={<ReportIssue />} />
      </Routes>
    </Router>
  );
}

export default App;
