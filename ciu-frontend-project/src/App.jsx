import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Authentication
import Login from "./pages/login.jsx";
import ResetPassword from "./components/admin/ResetPassword.jsx";
import RequestToken from "./components/admin/RequestToken.jsx";
// import ProtectedRoute from './components/student/ProtectedRoute.jsx';

// Admin
import RegForm from "./components/admin/RegForm.jsx";
import Registration from "./pages/admin/Registration.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import Users from "./components/admin/Users.jsx";
import EditUser from "./components/admin/EditUser.jsx";
import Layout from "./components/admin/Layout.jsx";
import Students from "./components/admin/students.jsx";
import EditStudent from "./components/admin/EditStudent.jsx";
import Adminuser from "./components/admin/Adminuser.jsx";
import Editadmin from "./components/admin/Editadmin.jsx";
import ResetAdminPassword from "./components/admin/ResetAdminPassword.jsx";
import ResetLecturerPassword from "./components/admin/ResetLecturerPassword.jsx";
import RequestAdminToken from "./components/admin/RequestAdminToken.jsx";
import RequestLecturerToken from "./components/admin/RequestLecturerToken.jsx";
import RegCourse from "./pages/lecturer/RegCourse.jsx";
import AdminCourses from "./pages/admin/Courses.jsx";
import EditCourse from "./pages/lecturer/EditCourses.jsx";
import Lecturers from "./pages/admin/ManageLecturersPg.jsx";
import StudentsManage from "./pages/admin/ManageStudentsPg.jsx";
import Create from "./pages/admin/CreateFAQPg.jsx";
import { SidebarProvider1 } from "./components/admin/SidebarContext.jsx";
import TokenPasswordPage from "./components/admin/TokenPasswordPage";

// Lecturer
import ScheduleUploadExams from "./pages/lecturer/ScheduleUploadExams.jsx";
import ScheduleCreateExams from "./pages/lecturer/ScheduleCreateExams.jsx";
import AddQuestions from "./pages/lecturer/AddQuestions.jsx";
import ExamPaperPreview from "./pages/lecturer/ExamPaperPreview.jsx";
import ExamList from "./pages/lecturer/ExamList.jsx";
import QuestionsPreview from "./pages/lecturer/QuestionsPreview.jsx";
import EditExamPaper from "./pages/lecturer/EditExamPaper.jsx";
import EditExamInterface from "./pages/lecturer/EditExamInterface.jsx";
import PublishedExamList from "./pages/lecturer/PublishedExamList.jsx";
import ManualExamPaperPreview from "./pages/lecturer/ManualExamPaperPreview.jsx";
import ManualExamList from "./pages/lecturer/ManualExamList.jsx";
import ManualQuestionsPreview from "./pages/lecturer/ManualQuestionsPreview.jsx";
import ManualEditExamPaper from "./pages/lecturer/ManualEditExamPaper.jsx";
import ManualEditExamInterface from "./pages/lecturer/ManualEditExamInterface.jsx";
import ManualPublishedExamList from "./pages/lecturer/ManualPublishedExamList.jsx";
import LecturerDashboard from "./components/lecturer/LecturerDashboard.jsx";
import { SidebarProvider2 } from "./components/lecturer/SidebarContext2.jsx";
import LectCourses from "./pages/lecturer/LectCourses.jsx";

// Student
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import DoExam from "./pages/student/DoExam.jsx";
import SupportPage from "./pages/student/SupportPage.jsx";
import FAQpage from "./pages/student/FAQpage.jsx";
import ReportIssue from "./pages/student/ReportIssue.jsx";
import ExamInstructions from "./pages/student/ExamInstructions";
import Proctoring from "./pages/student/Proctoring";
import Quiz from "./pages/student/Quiz";
import MessageSupp from "./pages/student/MessageSupportPg.jsx";
import Questions from "./pages/student/FAQpagepop.jsx";
import { SidebarProvider } from "./components/student/SidebarContext.jsx";
import QuestionBankPage from "./components/lecturer/QuestionBankPage.jsx";
import PassedExamsQuestionsPage from "./components/lecturer/PassedExamsQuestionsPage.jsx";

import "./App.css";

function App() {
  return (
    <Router>
      <SidebarProvider>
        {" "}
        {/* Student */}
        <SidebarProvider1>
          {" "}
          {/* Admin */}
          <SidebarProvider2>
            {" "}
            {/* lecturer */}
            <Routes>
              {/* Authentication */}
              <Route path="/" element={<Login />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/request-token" element={<RequestToken />} />

              {/* Admin */}
              <Route path="/registers" element={<Registration />} />
              <Route path="/manage" element={<ManageUsers />} />
              <Route path="/register" element={<RegForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/manage-users" element={<ManageUsers />} />
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
              <Route
                path="/lecturerPassword"
                element={<ResetLecturerPassword />}
              />
              <Route
                path="/RequestAdminToken"
                element={<RequestAdminToken />}
              />
              <Route
                path="/RequestLecturerToken"
                element={<RequestLecturerToken />}
              />
              <Route path="/regCourse" element={<RegCourse />} />
              <Route path="/lect-courses" element={<LectCourses />} />
              <Route path="/editcourse/:id" element={<EditCourse />} />
              <Route
                path="/admin/manage-users/lecturers"
                element={<Lecturers />}
              />
              <Route
                path="/admin/manage-users/students"
                element={<StudentsManage />}
              />
              <Route path="/admin/create-faqs" element={<Create />} />
              <Route
                path="/token-password-reset"
                element={<TokenPasswordPage />}
              />
              <Route path="/admin-courses" element={<AdminCourses />} />

              {/* Lecturer */}
              <Route
                path="/schedule-upload-exams"
                element={<ScheduleUploadExams />}
              />
              <Route
                path="/schedule-create-exams"
                element={<ScheduleCreateExams />}
              />
              <Route path="/add-questions" element={<AddQuestions />} />
              <Route path="/exam-paper/:id" element={<ExamPaperPreview />} />
              <Route
                path="/schedule-upload-exams/exam-list"
                element={<ExamList />}
              />
              <Route
                path="/exam-paper/:id/questions"
                element={<QuestionsPreview />}
              />
              <Route
                path="/exam-paper/:id/question/:questionId"
                element={<EditExamPaper />}
              />
              <Route
                path="/exam-paper/:id/edit"
                element={<EditExamInterface />}
              />
              <Route
                path="/published-exam-papers"
                element={<PublishedExamList />}
              />
              <Route
                path="/manual-exam-paper/:id"
                element={<ManualExamPaperPreview />}
              />
              <Route
                path="/schedule-create-exams/exam-list"
                element={<ManualExamList />}
              />
              <Route
                path="/manual-exam-paper/:id/questions"
                element={<ManualQuestionsPreview />}
              />
              <Route
                path="/manual-exam-paper/:id/question/:questionId"
                element={<ManualEditExamPaper />}
              />
              <Route
                path="/manual-exam-paper/:id/edit"
                element={<ManualEditExamInterface />}
              />
              <Route
                path="/manual-published-exam-papers"
                element={<ManualPublishedExamList />}
              />
              <Route
                path="/lecturerdashboard"
                element={<LecturerDashboard />}
              />
              <Route path="/question-bank" element={<QuestionBankPage />} />
              <Route
                path="/passed-exams-questions"
                element={<PassedExamsQuestionsPage />}
              />

              {/* Student - Protected route*/}

              {/* <Route path="/student" element={
            <ProtectedRoute>
            <StudentDashboard />
            </ProtectedRoute>
            } />
          <Route path="/student/do-exam" element={<ProtectedRoute>
            <DoExam />
            </ProtectedRoute>
            } />
          <Route path="/student/support" element={
            <ProtectedRoute>
            <SupportPage />
            </ProtectedRoute>
          } 
            />
          <Route path="/student/support/faqs" element={
            <ProtectedRoute>
            <FAQpage />
            </ProtectedRoute>} />
          <Route path="/student/support/report-issue" element={
            <ProtectedRoute>
            <ReportIssue />
            </ProtectedRoute>
            } /> */}

              {/* Student */}
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/student/do-exam" element={<DoExam />} />
              <Route path="/student/support" element={<SupportPage />} />
              <Route path="/student/support/faqs" element={<FAQpage />} />
              <Route
                path="/student/support/report-issue"
                element={<ReportIssue />}
              />
              <Route path="/instructions" element={<ExamInstructions />} />
              <Route path="/proctoring" element={<Proctoring />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route
                path="/student/support/message-support"
                element={<MessageSupp />}
              />
              <Route path="/student/support/FAQ" element={<Questions />} />
            </Routes>
          </SidebarProvider2>
        </SidebarProvider1>
      </SidebarProvider>
    </Router>
  );
}

export default App;
