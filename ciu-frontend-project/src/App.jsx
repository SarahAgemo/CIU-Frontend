import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Authentication
import Login from "./pages/login";
import ResetPassword from "./components/admin/ResetPassword";
import RequestToken from "./components/admin/RequestToken";
import ProtectedRoute from './components/student/ProtectedRoute';
// Admin
import RegForm from "./components/admin/RegForm";
import Registration from "./pages/admin/Registration";
import Dashboard from "./pages/admin/Dashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import Users from "./components/admin/Users";
import EditUser from "./components/admin/EditUser";
import Layout from "./components/admin/Layout";
import Students from "./components/admin/Students";
import EditStudent from "./components/admin/EditStudent";
import Adminuser from "./components/admin/Adminuser";
import Editadmin from "./components/admin/Editadmin";
import ResetAdminPassword from "./components/admin/ResetAdminPassword";
import RequestAdminToken from "./components/admin/RequestAdminToken";
import RequestLecturerToken from "./components/admin/RequestLecturerToken";
import RegCourse from "./pages/lecturer/RegCourse";
import Courses from "./pages/lecturer/Courses";
import EditCourse from "./pages/lecturer/EditCourses";

// Lecturer
import ScheduleUploadExams from "./pages/lecturer/ScheduleUploadExams";
import ScheduleCreateExams from "./pages/lecturer/ScheduleCreateExams";
import AddQuestions from "./pages/lecturer/AddQuestions";
import ExamPaperPreview from "./pages/lecturer/ExamPaperPreview";
import ExamList from "./pages/lecturer/ExamList";
import QuestionsPreview from "./pages/lecturer/QuestionsPreview";
import EditExamPaper from "./pages/lecturer/EditExamPaper";
import EditExamInterface from "./pages/lecturer/EditExamInterface";

// Student
import StudentDashboard from "./pages/student/StudentDashboard";
import DoExam from "./pages/student/DoExam";
import SupportPage from "./pages/student/SupportPage";
import FAQpage from "./pages/student/FAQpage";
import ReportIssue from "./pages/student/ReportIssue";
import ExamInstructions from "./pages/student/ExamInstructions";
import Proctoring from "./pages/student/Proctoring";
import Quiz from "./pages/student/Quiz";

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/request-token" element={<RequestToken />} />
        
        {/* Admin */}
        <Route path="/register" element={<RegForm />} />
        
        <Route path="/registers" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/manage-users" element={<ManageUsers />} />
        <Route path="/users" element={<Users />} />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path="/layout" element={<Layout />} />
        <Route path="/table" element={<Students />} />
        <Route path="/edit-student/:id" element={<EditStudent />} />
        <Route path="/adminuser" element={<Adminuser />} />
        <Route path="/editadmin/:id" element={<Editadmin />} />
        <Route path="/adminPassword" element={<ResetAdminPassword />} />
        <Route path="/RequestAdminToken" element={<RequestAdminToken />} />
        <Route path="/RequestLecturerToken" element={<RequestLecturerToken />} />
        <Route path="/regCourse" element={<RegCourse />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/editcourse/:id" element={<EditCourse />} />
          
        {/* Lecturer */}
        <Route path="/schedule-upload-exams" element={<ScheduleUploadExams />} />
        <Route path="/schedule-create-exams" element={<ScheduleCreateExams />} />
        <Route path="/add-questions" element={<AddQuestions />} />
        <Route path="/exam-paper/:id" element={<ExamPaperPreview />} />
        <Route path="/schedule-upload-exams/exam-list" element={<ExamList />} />
        <Route path="/exam-paper/:id/questions" element={<QuestionsPreview />} />
        <Route path="/exam-paper/:id/question/:questionId" element={<EditExamPaper />} />
        <Route path="/exam-paper/:id/edit" element={<EditExamInterface />} />
          
        {/* Student */}
        <Route path="/student" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
        <Route path="/student/do-exam" element={<ProtectedRoute><DoExam /></ProtectedRoute>} />
        <Route path="/student/support" element={<ProtectedRoute><SupportPage /></ProtectedRoute>} />
        <Route path="/student/support/faqs" element={<ProtectedRoute><FAQpage /></ProtectedRoute>} />
        <Route path="/student/support/report-issue" element={<ProtectedRoute><ReportIssue /></ProtectedRoute>} />
        <Route path="/instructions" element={<ExamInstructions />} />
        <Route path="/proctoring" element={<Proctoring />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
