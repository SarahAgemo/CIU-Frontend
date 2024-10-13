import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import ResetPassword from './components/admin/ResetPassword';
import RegForm from './components/admin/RegForm';
import Registration from "./pages/admin/Registration.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import Header from "./components/admin/Header.jsx";
import Chat from './components/chat.jsx';

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
        <Route path="/header" element={<Header/>} />
        <Route path="/chat" element={<Chat/>} />
      </Routes>
    </Router>

    
  );
}

export default App;
