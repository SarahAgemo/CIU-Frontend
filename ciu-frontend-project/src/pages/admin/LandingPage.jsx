import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <div className="landing-page-content">
        {/* Left Section: Image */}
        <div className="landing-page-image">
          <img
            src="./src/assets/images/ciu-logo-2.png"
            alt="Online Examination"
          />
        </div>

        {/* Right Section: Role Selection */}
        <div className="landing-page-right">
          <div className="landing-page-header">
            <h1>ONLINE EXAMINATION SYSTEM</h1>
            {/* <h2>Select Your Role</h2> */}
          </div>
          <div className="landing-buttons-section">
        <div className="landing-button-group">
        <p className="landing-description">
          Are you a CIU admin?<br />Click the button below to continue.
        </p>
        <button className="landing-button">Admin</button>
      </div>

      <div className="landing-button-group">
        <p className="landing-description">
          Are you a CIU Lecturer?<br />Click the button below to continue.
        </p>
        <button className="landing-button">Lecturer</button>
      </div>

      <div className="landing-button-group">
        <p className="landing-description">
          Are you a Student or an Applicant?<br />Click the button below to continue.
        </p>
        <button className="landing-button">Student</button>
      </div>
    </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import './LandingPage.css';

// function Landing() {
//   return (
//     <div className="landing-container">
//       Header Section
//       <div className="landing-header">
          
//       <h2 className="landing-system-title">CIU ONLINE EXAMINATION SYSTEM</h2>


//         <h2 className="landing-welcome-text">Welcome to the CIU</h2>
//       </div>

//       Buttons Section
//       <div className="landing-buttons-section">
//         <div className="landing-button-group">
//           <p className="landing-description">
//             Are you a CIU admin?<br />Click the button below to continue.
//           </p>
//           <button className="landing-button">Admin</button>
//         </div>

//         <div className="landing-button-group">
//           <p className="landing-description">
//             Are you a CIU Lecturer?<br />Click the button below to continue.
//           </p>
//           <button className="landing-button">Lecturer</button>
//         </div>

//         <div className="landing-button-group">
//           <p className="landing-description">
//             Are you a Student or an Applicant?<br />Click the button below to continue.
//           </p>
//           <button className="landing-button">Student</button>
//         </div>
//       </div>
//     </div>
   
//   );
// }

// export default Landing;

