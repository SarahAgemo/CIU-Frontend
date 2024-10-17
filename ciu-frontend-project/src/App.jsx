// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import RegForm from './components/admin/RegForm.jsx';
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
import ManageUsers from './pages/admin/ManageUsers.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import MainContent from "./components/student/MainContent.jsx";
import ResetPassword from './components/admin/ResetPassword';
import Header from "./components/admin/Header.jsx";
import Users from './components/admin/Users.jsx'; 
import EditUser from './components/admin/EditUser.jsx'; 
import Layout from "./components/admin/Layout.jsx"; 
import RequestToken from "./components/admin/RequestToken.jsx"; 
import Students from './components/admin/students.jsx'; 
 import './components/admin/users.css';
 import EditStudent from './components/admin/EditStudent.jsx'; 
 import Adminuser from "./components/admin/Adminuser.jsx";
 import Editadmin from "./components/admin/Editadmin.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
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
        <Route path="/registers" element={<Registration />} />  
        <Route path="/manage" element={<ManageUsers />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/student" element={<MainContent />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/header" element={<Header />} />
        <Route path="/users" element={<Users />} />  
        <Route path="/edit/:id" element={<EditUser />} />  
        <Route path="/layout" element={<Layout />} /> 
        <Route path="/table" element={<Students />} />
        <Route path="/request-token" element={<RequestToken />} /> 
        <Route path="/edit-student/:id" element={<EditStudent />} /> 
        <Route path="/adminuser" element={<Adminuser />} />
        <Route path="/editadmin/:id" element={<Editadmin />} />

      </Routes>
    </Router>
  );
}

export default App;
