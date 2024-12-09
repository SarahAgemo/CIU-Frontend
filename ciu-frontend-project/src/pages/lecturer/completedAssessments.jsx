// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Header from "../../components/lecturer/HeaderPop";
// import Sidebar from "../../components/lecturer/SideBarPop";
// import MobileMenu from "../../components/lecturer/MobileMenu";
// import Dash from "../../components/lecturer/LecturerDashboard.module.css";
// import { useParams } from "react-router-dom";

// function CompletedAssessmentsTable() {
//   const [completedAssessments, setCompletedAssessments] = useState([]);
//   const navigate = useNavigate();
//   const [isMobile, setIsMobile] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const {id} = useParams() ;


//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   useEffect(() => {
//     async function fetchCompletedAssessments() {
//       try {
//         const response = await axios.get("http://localhost:3000/exam-paper/completedAssessments");
//         console.log("Fetched Assessments:", response.data); // Debug log
        
//         setCompletedAssessments(response.data);
//       } catch (error) {
//         console.error("Error fetching completed assessments:", error);
//       }
//     }
  
//     fetchCompletedAssessments();
//   }, []);
  

//   const handlePreview = (id) => {
//     navigate(`/student-results/${id}`);
//   };

//   const handlePublish = async (id) => {
//     try {
//       console.log("Publishing results for ID:", id);
//       const response = await axios.patch(`http://localhost:3000/exam-paper/${id}/publishResults`, {
//         isPublished: true,
//       });
  
//       console.log("Response:", response.data);
  
//       // Refetch the completed assessments
//       const updatedData = await axios.get("http://localhost:3000/exam-paper/completedAssessments");
//       setCompletedAssessments(updatedData.data);
  
//       // Update the state to reflect the published status locally (optional)
//       setCompletedAssessments((prev) =>
//         prev.map((assessment) =>
//           assessment.id === id
//             ? { ...assessment, isPublished: true }
//             : assessment
//         )
//       );
//     } catch (error) {
//       if (error.response) {
//         console.error("Error Response Data:", error.response.data);
//         console.error("Error Response Status:", error.response.status);
//       } else {
//         console.error("Error Message:", error.message);
//       }
//     }
//   };
  
//   return (
//     <div className={Dash.overall}>
//     <div className={Dash.dashboard}>
//       <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
//       <div className={Dash["dashboard-content"]}>
//         {!isMobile && <Sidebar />}
//         {isMobile && (
//           <MobileMenu
//             isOpen={isMobileMenuOpen}
//             toggleMenu={toggleMobileMenu}
//           />
//         )}
//     <div>
//       <h1>Completed Assessments</h1>
//       <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
//         <thead>
//           <tr>
//             <th>Course Unit</th>
//             <th>Title</th>
//             <th>End Time</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {completedAssessments.map((assessment, index) => (
//             <tr key={index}>
//               <td>{assessment.courseUnit || "N/A"}</td>
//               <td>{assessment.title || "N/A"}</td>
//               <td>
//                 {assessment.endTime
//                   ? new Date(assessment.endTime).toLocaleString()
//                   : "N/A"}
//               </td>
//               <td>
//                 <button onClick={() => handlePreview(assessment.id)}>
//                   Preview
//                 </button>
//                 <button
//                   onClick={() => handlePublish(assessment.id)}
//                   disabled={assessment.isPublished}
//                 >
//                   {assessment.isPublished ? "Published" : "Publish"}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </div>
//     </div>
//     </div>
//   );
// }

// export default CompletedAssessmentsTable;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/lecturer/HeaderPop";
import Sidebar from "../../components/lecturer/SideBarPop";
import MobileMenu from "../../components/lecturer/MobileMenu";
import Dash from "./completedAssessments.module.css";
import BackButton from "../../components/lecturer/BackButton";
import { useParams } from "react-router-dom";
import './completedAssessments.css'

function CompletedAssessmentsTable() {
  const [completedAssessments, setCompletedAssessments] = useState([]);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {id} = useParams();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    async function fetchCompletedAssessments() {
      try {
        const response = await axios.get("http://localhost:3000/exam-paper/completedAssessments");
        console.log("Fetched Assessments:", response.data); // Debug log
        setCompletedAssessments(response.data);
      } catch (error) {
        console.error("Error fetching completed assessments:", error);
      }
    }
  
    fetchCompletedAssessments();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePreview = (id) => {
    navigate(`/student-results/${id}`);
  };

  const handlePublish = async (id) => {
    try {
      console.log("Publishing results for ID:", id);
      const response = await axios.patch(`http://localhost:3000/exam-paper/${id}/publishResults`, {
        isPublished: true,
      });
  
      console.log("Response:", response.data);
  
      // Refetch the completed assessments
      const updatedData = await axios.get("http://localhost:3000/exam-paper/completedAssessments");
      setCompletedAssessments(updatedData.data);
  
      // Update the state to reflect the published status locally (optional)
      setCompletedAssessments((prev) =>
        prev.map((assessment) =>
          assessment.id === id
            ? { ...assessment, isPublished: true }
            : assessment
        )
      );
    } catch (error) {
      console.error("Error publishing results:", error);
    }
  };

  return (
    <div className={Dash.lecturerDashboard}>
      <div className={Dash.dashboard}>
        <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
        <div className={Dash["dashboard-content"]}>
        {!isMobile && <Sidebar />}
          {isMobile && (
            <>
              <div 
                className={`${Dash["overlay"]} ${isMobileMenuOpen ? Dash["active"] : ""}`} 
                onClick={toggleMobileMenu}
              ></div>
              <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
            </>
          )}
          <div className={`${Dash.mainContentWrapper} ${isMobileMenuOpen ? Dash.dimmed : ''}`}>
            <div className={Dash.backButtonContainer}>
              <BackButton targetPath="/exam-management" size={30} color="#106053" />
            </div>
            <h2>Completed Assessments</h2>
            <div className={Dash.dashboardCards}>
              <table className={Dash.completedAssessmentsTable}>
                <thead>
                  <tr>
                    <th>Course Unit</th>
                    <th>Title</th>
                    <th>End Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {completedAssessments.map((assessment, index) => (
                    <tr key={index}>
                      <td>{assessment.courseUnit || "N/A"}</td>
                      <td>{assessment.title || "N/A"}</td>
                      <td>
                        {assessment.endTime
                          ? new Date(assessment.endTime).toLocaleString()
                          : "N/A"}
                      </td>
                      <td>
                        <button onClick={() => handlePreview(assessment.id)}>
                          Preview
                        </button>
                        <button
                          onClick={() => handlePublish(assessment.id)}
                          disabled={assessment.isPublished}
                        >
                          {assessment.isPublished ? "Published" : "Publish"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompletedAssessmentsTable;