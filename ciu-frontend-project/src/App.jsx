import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
// import ResetPassword from './components/admin/ResetPassword';
import RegForm from './components/admin/RegForm';
import Registration from "./pages/admin/Registration.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registers" element={<Registration />} />  {/* Registration Route */}
        <Route path="/" element={<Login />} /> 
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
        <Route path="/register" element={<RegForm />} />
      </Routes>
    </Router>
  );
}

export default App;
