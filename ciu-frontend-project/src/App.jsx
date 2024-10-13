import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import RegForm from './components/admin/RegForm';
import Registration from "./pages/admin/Registration.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import Header from "./components/admin/Header.jsx";
import Users from './components/admin/Users.jsx'; // Import the User List Page
import EditUser from './components/admin/EditUser.jsx'; // Import the Edit User Page
import Layout from "./components/admin/Layout.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registers" element={<Registration />} />  {/* Registration Route */}
        <Route path="/" element={<Login />} /> 
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
        <Route path="/register" element={<RegForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manage" element={<ManageUsers />} />
        <Route path="/header" element={<Header/>} />
        <Route path="/users" element={<Users />} />  {/* User List Route */}
        <Route path="/edit/:id" element={<EditUser />} />  {/* Edit User Route */}
        <Route path="/layout" element={<Layout />} /> {/* Layout Page */}
      </Routes>
    </Router>
  );
}

export default App;
