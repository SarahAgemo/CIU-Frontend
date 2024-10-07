import React from 'react';
import './App.css';
import Registration from './pages/admin/Registration';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/admin/Dashboard'
import ManageUsers from './pages/admin/ManageUsers'
import StudentDashboard from './pages/student/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Registration />} />
        <Route path='/admin' element={<Dashboard />} />
        <Route path='/admin/manage-users' element={<ManageUsers />} />
        <Route path='/student' element={<StudentDashboard />} />
      </Routes>      
    </BrowserRouter>
  )
}

export default App;


// Original Code
// function App() {
//   return (
//     <div>
//       <Registration/>
//     </div>
//   );
// }