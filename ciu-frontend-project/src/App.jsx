import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import RegForm from './components/admin/RegForm';
import Registration from "./pages/admin/Registration.jsx";
import ManageUsers from './pages/admin/ManageUsers.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import MainContent from "./components/student/MainContent.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registers" element={<Registration />} />  {/* Registration Route */}
        <Route path="/" element={<Login />} /> 
        <Route path="/register" element={<RegForm />} />
        <Route path="/manage"  element={<ManageUsers  /> } /> 
        <Route path="/dashboard" element={<Dashboard  /> } /> 
        <Route path="/student" element={<MainContent />} />
      </Routes>
    </Router>
  );
}

export default App;
