import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Authentication
import Login from "./pages/login.jsx";
import ResetPassword from "./components/admin/ResetPassword.jsx";
import RequestToken from "./components/admin/RequestToken.jsx";

// Admin
import RegForm from "./components/admin/RegForm.jsx";
import Registration from "./pages/admin/Registration.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import Users from "./components/admin/Users.jsx";
import EditUser from "./components/admin/EditUser.jsx";
import Layout from "./components/admin/Layout.jsx";
import Students from "./components/admin/Students.jsx";
import EditStudent from "./components/admin/EditStudent.jsx";
import Adminuser from "./components/admin/Adminuser.jsx";
import Editadmin from "./components/admin/Editadmin.jsx";
import ResetAdminPassword from "./components/admin/ResetAdminPassword.jsx";
import ResetLecturerPassword from "./components/admin/ResetLecturerPassword.jsx";
import RequestAdminToken from "./components/admin/RequestAdminToken.jsx";
import RequestLecturerToken from "./components/admin/RequestLecturerToken.jsx";
import RegCourse from "./pages/lecturer/RegCourse.jsx";
import Courses from "./pages/lecturer/Courses.jsx";
import EditCourse from "./pages/lecturer/EditCourses.jsx";

// Lecturer
import ScheduleUploadExams from "./pages/lecturer/ScheduleUploadExams.jsx";
import ScheduleCreateExams from "./pages/lecturer/ScheduleCreateExams.jsx";
import AddQuestions from "./pages/lecturer/AddQuestions.jsx";
import ExamPaperPreview from "./pages/lecturer/ExamPaperPreview.jsx";
import ExamList from "./pages/lecturer/ExamList.jsx";
import QuestionsPreview from "./pages/lecturer/QuestionsPreview.jsx";
import EditExamPaper from "./pages/lecturer/EditExamPaper.jsx";
import EditExamInterface from "./pages/lecturer/EditExamInterface.jsx";
import PublishedExamList from './pages/lecturer/PublishedExamList.jsx';

// Student
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import DoExam from "./pages/student/DoExam.jsx";
import SupportPage from "./pages/student/SupportPage.jsx";
import FAQpage from "./pages/student/FAQpage.jsx";
import ReportIssue from "./pages/student/ReportIssue.jsx";
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
        <Route path="/manage" element={<ManageUsers />} /> 
        <Route path="/register" element={<RegForm />} />
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
        <Route path="/adminPassword" element={<ResetAdminPassword />} />
        <Route path="/lecturerPassword" element={<ResetLecturerPassword />} />
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
        <Route path="/published-exam-papers" element={<PublishedExamList />} />
          
        {/* Student */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/do-exam" element={<DoExam />} />
        <Route path="/student/support" element={<SupportPage />} />
        <Route path="/student/support/faqs" element={<FAQpage />} />
        <Route path="/student/support/report-issue" element={<ReportIssue />} />
        <Route path="/instructions" element={<ExamInstructions />} />
        <Route path="/proctoring" element={<Proctoring />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
