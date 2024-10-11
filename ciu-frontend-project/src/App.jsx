import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import RegForm from './components/admin/RegForm';
import Registration from "./pages/admin/Registration.jsx";
<<<<<<< HEAD
import Users from './components/admin/Users.jsx'; // Import the User List Page
import EditUser from './components/admin/EditUser.jsx'; // Import the Edit User Page
=======
import Dashboard from "./pages/admin/Dashboard.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import Header from "./components/admin/Header.jsx";
>>>>>>> 0f4dddae9c508f4407a68f67b115403066717cca

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Login />} />  {/* Login Route */}
        <Route path="/register" element={<RegForm />} />  {/* Registration Form Route */}
        <Route path="/registers" element={<Registration />} />  {/* Admin Registration Route */}
        <Route path="/users" element={<Users />} />  {/* User List Route */}
        <Route path="/edit/:id" element={<EditUser />} />  {/* Edit User Route */}
=======
        <Route path="/registers" element={<Registration />} />  {/* Registration Route */}
        <Route path="/" element={<Login />} /> 
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
        <Route path="/register" element={<RegForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manage" element={<ManageUsers />} />
        <Route path="/header" element={<Header/>} />
>>>>>>> 0f4dddae9c508f4407a68f67b115403066717cca
      </Routes>
    </Router>
  );
}

export default App;
