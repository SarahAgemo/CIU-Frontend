import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import ResetPassword from './components/admin/ResetPassword';
import RegForm from './components/admin/RegForm';
import RequestToken from './components/admin/RequestToken';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={<RegForm />} />
        <Route path="/request-token" element={<RequestToken />} />
      </Routes>
    </Router>
  );
}

export default App;
