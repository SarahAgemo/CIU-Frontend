import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import RegForm from './components/admin/RegForm';
import Registration from "./pages/admin/Registration.jsx";
import Users from './components/admin/Users.jsx'; // Import the User List Page
import EditUser from './components/admin/EditUser.jsx'; // Import the Edit User Page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Login Route */}
        <Route path="/register" element={<RegForm />} />  {/* Registration Form Route */}
        <Route path="/registers" element={<Registration />} />  {/* Admin Registration Route */}
        <Route path="/users" element={<Users />} />  {/* User List Route */}
        <Route path="/edit/:id" element={<EditUser />} />  {/* Edit User Route */}
      </Routes>
    </Router>
  );
}

export default App;
