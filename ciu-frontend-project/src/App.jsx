// import React from 'react';
// import ResetPassword from './components/admin/ResetPassword';


// function App() {
//   return (
//     <div className="App">
//       <ResetPassword />
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegForm from './components/admin/RegForm';
import ResetPassword from './components/admin/ResetPassword';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ResetPassword />} />
        <Route path="/register" element={<RegForm />} />
      </Routes>
    </Router>
  );
};

export default App;
