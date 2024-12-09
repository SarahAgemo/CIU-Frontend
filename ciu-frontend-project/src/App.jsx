// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import StudentExamPage from './pages/StudentExamPage';
// import LecturerProctorPage from './pages/LecturerProctorPage';
// import React from 'react';

// // Authentication
// import Login from "./pages/loginoriginal.jsx";
// import ResetPassword from "./components/admin/ResetPassword.jsx";
// import RequestToken from "./components/admin/RequestToken.jsx";
// // import ProtectedRoute from './components/student/ProtectedRoute.jsx';

// // Admin
// import RegForm from "./components/admin/RegForm.jsx";
// import Registration from "./pages/admin/Admin-LecturerRegistration.jsx";
// import Dashboard from "./pages/admin/AdminDashboard.jsx";
// import ManageUsers from "./pages/admin/ManageUsers.jsx";
// import Users from "./components/admin/Users.jsx";
// import EditUser from "./components/admin/EditLecturer.jsx";
// import Layout from "./components/admin/Layout.jsx";
// import Students from "./components/admin/Students.jsx";
// import EditStudent from "./components/admin/EditStudent.jsx";
// import Adminuser from "./components/admin/AdminList.jsx";
// import Editadmin from "./components/admin/Editadmin.jsx";
// import ResetAdminPassword from "./components/admin/ResetAdminPassword.jsx";
// import ResetLecturerPassword from "./components/admin/ResetLecturerPassword.jsx";
// import RequestAdminToken from "./components/admin/RequestAdminToken.jsx";
// import RequestLecturerToken from "./components/admin/RequestLecturerToken.jsx";
// import RegCourse from "./pages/lecturer/CourseRegistration.jsx";
// import AdminCourses from "./pages/admin/AdminCourses.jsx";
// import EditCourse from "./pages/lecturer/EditCourses.jsx";
// import Lecturers from "./pages/admin/LecturerManagement.jsx";
// import StudentsManage from "./pages/admin/StudentManagement.jsx";
// import Create from "./pages/admin/CreateFAQPg.jsx";
// import { SidebarProvider1 } from "./components/admin/SidebarContext.jsx";
// import TokenPasswordPage from "./components/admin/TokenPasswordPage";
// import AdminExamPaperPreview from "./pages/admin/AdminExamPaperPreview.jsx";
// import AdminQuestionsPreview from "./pages/admin/AdminAssessmentQuestionsPreview.jsx";
// import AdminLogin from "./pages/admin/AdminLogin.jsx"
// import LandingPage from "./pages/admin/LandingPage.jsx";
// import StudenttokenPassword from "./components/admin/StudenttokenPassword.jsx";

// // Lecturer
// import ScheduleUploadExams from "./pages/lecturer/UploadExampaper.jsx";
// import ScheduleCreateExams from "./pages/lecturer/ManualCreateExams.jsx";
// import AddQuestions from "./pages/lecturer/AddQuestions.jsx";
// import ExamPaperPreview from "./pages/lecturer/ExamPaperPreview.jsx";
// import ExamList from "./pages/lecturer/ExampaperList.jsx";
// import QuestionsPreview from "./pages/lecturer/AssessmentQuestionsPreview.jsx";
// import EditExamPaper from "./pages/lecturer/EditExamPaperQuestions.jsx";
// import EditExamInterface from "./pages/lecturer/EditExampaper.jsx";
// import PublishedExamList from "./pages/lecturer/PublishedExamList.jsx";
// import LecturerDashboard from "./components/lecturer/LecturerDashboard.jsx";
// import { SidebarProvider2 } from "./components/lecturer/SidebarContext2.jsx";
// import LectCourses from "./pages/lecturer/LecturerCourses.jsx";
// import QuestionBankPreview from "./components/lecturer/QuestionBankPreview.jsx";
// import LecLogin from "./pages/lecturer/LecturerLogin.jsx"
// import ResultsTable from "./pages/lecturer/studentResults.jsx"
// import AdmintokenPassword from "./components/admin/AdmintokenPassword.jsx";


// // Student
// import StudentDashboard from "./pages/student/StudentDashboard";
// import DoExam from "./pages/student/DoExam";
// import SupportPage from "./pages/student/SupportPage";
// import FAQpage from "./pages/student/FAQpage";
// import ReportIssue from "./pages/student/ReportIssue";
// import ExamInstructions from "./pages/student/ExamInstructions";
// import Proctoring from "./pages/student/Proctoring";
// import Quiz from "./pages/student/Quiz";
// import MessageSupp from "./pages/student/MessageSupportPg.jsx";
// import Questions from "./pages/student/FAQpagepop.jsx";
// import { SidebarProvider } from "./components/student/SidebarContext.jsx";
// import QuestionBankPage from "./components/lecturer/QuestionBankPage.jsx";
// import PassedExamsQuestionsPage from "./components/lecturer/PassedExamsQuestionsPage.jsx";
// import AdminExamList from "./pages/admin/AdminExamList.jsx";
// import StudentNotifications from "./pages/student/notifications.jsx";
// import StudentLogin from "./pages/StudentLogin.jsx";
// import CompletedAssessmentsTable from "./pages/lecturer/completedAssessments.jsx"
// import SampleComponent from "./pages/student/Submit.jsx";
// import ResultComponent from "./pages/student/Result.jsx";


// import "./App.css";

// function App() {
//   return (
//     <Router>
//       <SidebarProvider>
//         {" "}
//         {/* Student */}
//         <SidebarProvider1>
//           {" "}
//           {/* Admin */}
//           <SidebarProvider2>
//             {" "}
//             {/* lecturer */}
//             <Routes>

//               {/* livestream proctoring */}
//               <Route path="/student-exam" element={<StudentExamPage />} />
//               <Route path="/lecturer-proctor" element={<LecturerProctorPage />} />

//               {/* Authentication */}
//               <Route path="/" element={<LandingPage />} />
//               <Route path="/reset-password" element={<ResetPassword />} />
//               <Route path="/request-token" element={<RequestToken />} />

//               {/* Admin */}
//               <Route path="/" element={<LandingPage />} />
//               <Route path="/admin-exam-paper/:id/questions" element={<AdminQuestionsPreview />}/>
//               <Route path="/admin-exam-paper/:id" element={<AdminExamPaperPreview/>} />
//               <Route path="/registers" element={<Registration />} />
//               <Route path="/manage" element={<ManageUsers />} />
//               <Route path="/register" element={<RegForm />} />
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/admin" element={<Dashboard />} />
//               <Route path="/admin/manage-users" element={<ManageUsers />} />
//               <Route path="/manage" element={<ManageUsers />} />
//               <Route path="/users" element={<Users />} />
//               <Route path="/edit/:id" element={<EditUser />} />
//               <Route path="/layout" element={<Layout />} />
//               <Route path="/request-token" element={<RequestToken />} />
//               <Route path="/table" element={<Students />} />
//               <Route path="/edit-student/:id" element={<EditStudent />} />
//               <Route path="/adminuser" element={<Adminuser />} />
//               <Route path="/editadmin/:id" element={<Editadmin />} />
//               <Route path="/adminPassword" element={<ResetAdminPassword />} />
//               <Route path="/landingPage" element={<LandingPage />} />
//               <Route
//                 path="/lecturerPassword"
//                 element={<ResetLecturerPassword />}
//               />
//               <Route
//                 path="/RequestAdminToken"
//                 element={<RequestAdminToken />}
//               />
//               <Route
//                 path="/RequestLecturerToken"
//                 element={<RequestLecturerToken />}
//               />
//               <Route path="/regCourse" element={<RegCourse />} />
//               <Route path="/lect-courses" element={<LectCourses />} />
//               <Route path="/editcourse/:id" element={<EditCourse />} />
//               <Route
//                 path="/admin/manage-users/lecturers"
//                 element={<Lecturers />}
//               />
//               <Route
//                 path="/admin/manage-users/students"
//                 element={<StudentsManage />}
//               />
//               <Route path="/admin/create-faqs" element={<Create />} />
//               <Route
//                 path="/token-password-reset"
//                 element={<TokenPasswordPage />}
//               />

//               <Route
//                 path="/studenttoken-password-reset"
//                 element={<StudenttokenPassword />}
//               />

//                 <Route
//                 path="/admintoken-password-reset"
//                 element={<AdmintokenPassword/>}
//               />
//               <Route path="/admin-courses" element={<AdminCourses />} />
//               <Route path="/admin-exam-list" element={<AdminExamList />} />
//               <Route
//                 path="/Adminlogin"
//                 element={<AdminLogin />}
//               />


//               {/* Lecturer */}
//               <Route
//                 path="/schedule-upload-exams"
//                 element={<ScheduleUploadExams />}
//               />
//               <Route
//                 path="/schedule-create-exams"
//                 element={<ScheduleCreateExams />}
//               />
//               <Route path="/exam-paper/:id/questions/add-question" element={<AddQuestions />} />
//               <Route path="/exam-paper/:id" element={<ExamPaperPreview />} />
//               <Route
//                 path="/schedule-upload-exams/exam-list"
//                 element={<ExamList />}
//               />
//               <Route
//                 path="/exam-paper/:id/questions"
//                 element={<QuestionsPreview />}
//               />
//               <Route
//                 path="/exam-paper/:id/question/:questionId"
//                 element={<EditExamPaper />}
//               />
//               <Route
//                 path="/exam-paper/:id/edit"
//                 element={<EditExamInterface />}
//               />
            
              
//               <Route
//                 path="/published-exam-papers"
//                 element={<PublishedExamList />}
//               />
              
//               <Route
//                 path="/lecturerdashboard"
//                 element={<LecturerDashboard />}
//               />
//               <Route path="/question-bank" element={<QuestionBankPage />} />
//               <Route
//                 path="/passed-exams-questions"
//                 element={<PassedExamsQuestionsPage />}
//               />

//               <Route
//                 path="/question-bank/:bankId/preview"
//                 element={<QuestionBankPreview />}
//               />

//               <Route
//                 path="/lecturerlogin"
//                 element={<LecLogin />}
//               />
//               <Route
//                 path="/student-results/:id"
//                 element={<ResultsTable />}
//               />
//               <Route
//                 path="/completed-Assessments"
//                 element={<CompletedAssessmentsTable />}
//               />

             

//               {/* Student - Protected route*/}

//               {/* <Route path="/student" element={
//             <ProtectedRoute>
//             <StudentDashboard />
//             </ProtectedRoute>
//             } />
//           <Route path="/student/do-exam" element={<ProtectedRoute>
//             <DoExam />
//             </ProtectedRoute>
//             } />
//           <Route path="/student/support" element={
//             <ProtectedRoute>
//             <SupportPage />
//             </ProtectedRoute>
//           } 
//             />
//           <Route path="/student/support/faqs" element={
//             <ProtectedRoute>
//             <FAQpage />
//             </ProtectedRoute>} />
//           <Route path="/student/support/report-issue" element={
//             <ProtectedRoute>
//             <ReportIssue />
//             </ProtectedRoute>
//             } /> */}

//               {/* Student */}
//               <Route path="/StudentLogin" element={<StudentLogin />} />
//               <Route path="student/results" element={<ResultComponent />} />
//               <Route path="/student" element={<StudentDashboard />} />
//               <Route path="/student/do-exam" element={<DoExam />} />
//               <Route path="/student/support" element={<SupportPage />} />
//               <Route path="/student/support/faqs" element={<FAQpage />} />
//               <Route
//                 path="/student/support/report-issue"
//                 element={<ReportIssue />}
//               />
//               <Route path="/instructions" element={<ExamInstructions />} />
//               <Route path="/submit" element={< SampleComponent />} />
              

//               <Route path="/proctoring" element={<Proctoring />} />
//               <Route path="/notifications" element={<StudentNotifications />} />
//               <Route path="/quiz/:id" element={<Quiz />} />
//               <Route
//                 path="/student/support/message-support"
//                 element={<MessageSupp />}
//               />
//               <Route path="/student/support/FAQ" element={<Questions />} />
//             </Routes>
//           </SidebarProvider2>
//         </SidebarProvider1>
//       </SidebarProvider>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentExamPage from './pages/StudentExamPage';
import LecturerProctorPage from './pages/LecturerProctorPage';
import React from 'react';

// Authentication
// import Login from "./pages/loginoriginal.jsx";
import ResetPassword from "./components/admin/ResetPassword.jsx";
import RequestToken from "./components/admin/RequestToken.jsx";
// import ProtectedRoute from './components/student/ProtectedRoute.jsx';

// Admin
import RegForm from "./components/admin/RegForm.jsx";
import Registration from "./pages/admin/Admin-LecturerRegistration.jsx";
import Dashboard from "./pages/admin/AdminDashboard.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import Users from "./components/admin/UsersContent.jsx";
import EditUser from "./components/admin/EditLecturer.jsx";
import Layout from "./components/admin/Layout.jsx";
import Students from "./components/admin/Students.jsx";
import EditStudent from "./components/admin/EditStudent.jsx";
import Adminuser from "./components/admin/AdminList.jsx";
import Editadmin from "./components/admin/Editadmin.jsx";
import ResetAdminPassword from "./components/admin/ResetAdminPassword.jsx";
import ResetLecturerPassword from "./components/admin/ResetLecturerPassword.jsx";
import RequestAdminToken from "./components/admin/RequestAdminToken.jsx";
import RequestLecturerToken from "./components/admin/RequestLecturerToken.jsx";
import RegCourse from "./pages/lecturer/CourseRegistration.jsx";
import AdminCourses from "./pages/admin/AdminCourses.jsx";
import EditCourse from "./pages/lecturer/EditCourses.jsx";
import Lecturers from "./pages/admin/LecturerManagement.jsx";
import StudentsManage from "./pages/admin/StudentManagement.jsx";
import Create from "./pages/admin/CreateFAQPg.jsx";
import { SidebarProvider1 } from "./components/admin/SidebarContext.jsx";
import TokenPasswordPage from "./components/admin/TokenPasswordPage";
import AdminExamPaperPreview from "./pages/admin/AdminExamPaperPreview.jsx";
import AdminQuestionsPreview from "./pages/admin/AdminAssessmentQuestionsPreview.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx"
import LandingPage from "./pages/admin/LandingPage.jsx";
import StudenttokenPassword from "./components/admin/StudenttokenPassword.jsx";

// Lecturer
import ScheduleUploadExams from "./pages/lecturer/UploadExampaper.jsx";
import ScheduleCreateExams from "./pages/lecturer/ManualCreateExams.jsx";
import AddQuestions from "./pages/lecturer/AddQuestions.jsx";
import ExamPaperPreview from "./pages/lecturer/ExamPaperPreview.jsx";
import ExamList from "./pages/lecturer/ExampaperList.jsx";
import QuestionsPreview from "./pages/lecturer/AssessmentQuestionsPreview.jsx";
import EditExamPaper from "./pages/lecturer/EditExamPaperQuestions.jsx";
import EditExamInterface from "./pages/lecturer/EditExamPaper.jsx";
import PublishedExamList from "./pages/lecturer/PublishedExamList.jsx";
import LecturerDashboard from "./components/lecturer/LecturerDashboardContent.jsx";
import { SidebarProvider2 } from "./components/lecturer/SidebarContext2.jsx";
import LectCourses from "./pages/lecturer/LecturerCourses.jsx";
import QuestionBankPreview from "./components/lecturer/QuestionBankPreview.jsx";
import LecLogin from "./pages/lecturer/LecturerLogin.jsx"
import ResultsTable from "./pages/lecturer/studentResults.jsx"
import ManageExams from './pages/lecturer/ManageExams.jsx'
import AdmintokenPassword from "./components/admin/AdmintokenPassword.jsx";
import OngoingAssessments from "./pages/lecturer/OngoingAssessments.jsx"


// Student
import StudentDashboard from "./pages/student/StudentDashboard";
import DoExam from "./pages/student/DoExam";
import SupportPage from "./pages/student/SupportPage";
import FAQpage from "./pages/student/FAQpage";
import ReportIssue from "./pages/student/ReportIssue";
import ExamInstructions from "./pages/student/ExamInstructions";
import Proctoring from "./pages/student/Proctoring";
import Quiz from "./pages/student/Quiz";
import MessageSupp from "./pages/student/MessageSupportPg.jsx";
import Questions from "./pages/student/FAQpagepop.jsx";
import { SidebarProvider } from "./components/student/SidebarContext.jsx";
import QuestionBankPage from "./components/lecturer/QuestionBankPage.jsx";
import PassedExamsQuestionsPage from "./components/lecturer/PassedExamsQuestionsPage.jsx";
import AdminExamList from "./pages/admin/AdminExamList.jsx";
import StudentNotifications from "./pages/student/notifications.jsx";
import StudentLogin from "./pages/StudentLogin.jsx";
import CompletedAssessmentsTable from "./pages/lecturer/completedAssessments.jsx"
import SampleComponent from "./pages/student/Submit.jsx";
import ResultComponent from "./pages/student/Result.jsx";



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

              {/* livestream proctoring */}
              <Route path="/student-exam" element={<StudentExamPage />} />
              <Route path="/lecturer-proctor" element={<LecturerProctorPage />} />

              {/* Authentication */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/request-token" element={<RequestToken />} />

              {/* Admin */}
              <Route path="/admin-exam-paper/:id/questions" element={<AdminQuestionsPreview />}/>
              <Route path="/admin-exam-paper/:id" element={<AdminExamPaperPreview/>} />
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
              <Route path="/landingPage" element={<LandingPage />} />
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
              <Route path="/admin-exam-list" element={<AdminExamList />} />
              <Route
                path="/Adminlogin"
                element={<AdminLogin />}
              />

              <Route
                path="/admintoken-password-reset"
                element={<AdmintokenPassword/>}
              />

              <Route
                path="/studenttoken-password-reset"
                element={<StudenttokenPassword />}
              />

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
                path="/proctoring/ongoing-exams"
                element={<OngoingAssessments />}
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
                path="/lecturerdashboard"
                element={<LecturerDashboard />}
              />
              <Route path="/question-bank" element={<QuestionBankPage />} />
              <Route
                path="/passed-exams-questions"
                element={<PassedExamsQuestionsPage />}
              />

              <Route
                path="/question-bank/:bankId/preview"
                element={<QuestionBankPreview />}
              />

              <Route
                path="/lecturerlogin"
                element={<LecLogin />}
              />

              <Route
                path="/exam-management"
                element={<ManageExams />}
              />

              <Route
                path="/completed-Assessments"
                element={<CompletedAssessmentsTable />}
              />

              <Route
                path="/student-results/:id"
                element={<ResultsTable />}
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
              <Route path="/StudentLogin" element={<StudentLogin />} />
              <Route path="student/results" element={<ResultComponent />} />
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/student/do-exam" element={<DoExam />} />
              <Route path="/student/support" element={<SupportPage />} />
              <Route path="/student/support/faqs" element={<FAQpage />} />
              <Route
                path="/student/support/report-issue"
                element={<ReportIssue />}
              />
              <Route path="/instructions" element={<ExamInstructions />} />
              <Route path="/submit" element={< SampleComponent />} />
              

              <Route path="/proctoring" element={<Proctoring />} />
              <Route path="/notifications" element={<StudentNotifications />} />
              <Route path="/quiz/:id" element={<Quiz />} />
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
