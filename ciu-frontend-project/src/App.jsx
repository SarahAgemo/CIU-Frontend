import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import ResetPassword from './components/admin/ResetPassword'; // Incoming change
import RegForm from './components/admin/RegForm';
import Registration from "./pages/admin/Registration.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import Header from "./components/admin/Header.jsx";
import Users from './components/admin/Users.jsx'; // Your change
import EditUser from './components/admin/EditUser.jsx'; // Your change
import Layout from "./components/admin/Layout.jsx"; // Your change
import RequestToken from "./components/admin/RequestToken.jsx"; // Incoming change
import ScheduleUploadExams from "./pages/lecturer/ScheduleUploadExams.jsx";
import ScheduleCreateExams from "./pages/lecturer/ScheduleCreateExams.jsx";
import AddQuestions from "./pages/lecturer/AddQuestions.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import DoExam from "./pages/student/DoExam.jsx";
import SupportPage from "./pages/student/SupportPage.jsx";
import Questions from "./pages/student/FAQpage.jsx";
import ReportIssue from "./pages/student/ReportIssue.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registers" element={<Registration />} />  {/* Registration Route */}
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={<RegForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manage" element={<ManageUsers />} />
        <Route path="/header" element={<Header />} />
        <Route path="/users" element={<Users />} />  {/* User List Route */}
        <Route path="/edit/:id" element={<EditUser />} />  {/* Edit User Route */}
        <Route path="/layout" element={<Layout />} /> {/* Layout Page */}
        <Route path="/request-token" element={<RequestToken />} /> {/* Incoming change */}
        <Route path="schedule-upload-exams" element={<ScheduleUploadExams />} />
        <Route path="schedule-create-exams" element={<ScheduleCreateExams />} />
        <Route path="add-questions" element={<AddQuestions />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/manage-users" element={<ManageUsers />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/do-exam" element={<DoExam/>} />
        <Route path="/student/support" element={<SupportPage/>} />
        <Route path="/student/support/faqs" element={<Questions/>} />
        <Route path="/student/support/report-issue" element={<ReportIssue/>} />
      </Routes>
    </Router>
  );
}

export default App;
