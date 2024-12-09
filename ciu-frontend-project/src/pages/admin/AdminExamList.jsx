// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../../pages/lecturer/ExampaperList.css";
// import Header from "../../components/admin/Headerpop";
// import Sidebar from "../../components/admin/SideBarpop";
// import MobileMenu from "../../components/admin/MobileMenu";
// import Dash from "../../components/lecturer/LecturerDashboard.module.css";
// import BackButton from "../../components/lecturer/BackButton";
// import { FiEye } from "react-icons/fi";

// function AdminExamList() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [examPapers, setExamPapers] = useState([]);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredExams, setFilteredExams] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 991);
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const fetchExamPapers = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/exam-paper");
//         if (!response.ok) throw new Error("Failed to fetch exam papers");
//         const data = await response.json();
//         setExamPapers(data);
//         setFilteredExams(data);
//       } catch (error) {
//         setError("Error fetching exam papers: " + error.message);
//       }
//     };

//     fetchExamPapers();
//   }, []);

//   useEffect(() => {
//     const filtered = examPapers.filter((exam) =>
//       Object.values(exam)
//         .join(" ")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     );
//     setFilteredExams(filtered);
//   }, [searchTerm, examPapers]);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const handlePreview = (examId) => {
//     navigate(`/admin-exam-paper/${examId}`);
//   };

//   const searchContainerStyles = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "20px 0",
//     gap: "0px",
//   };

//   const searchButtonStyles = {
//     backgroundColor: "#0F533D",
//     color: "white",
//     padding: "12px 24px",
//     border: "none",
//     cursor: "pointer",
//     minWidth: "200px",
//     fontSize: "16px",
//     marginLeft: "500px",
//   };

//   const searchInputStyles = {
//     padding: "12px 16px",
//     border: "1px solid #ddd",
//     borderRadius: "2px",
//     fontSize: "16px",
//     width: "300px",
//     color: "#666",
//   };

//   if (error) return <div className="E-alert alert-danger">{error}</div>;
//   if (!examPapers.length) return <div>Loading...</div>;

//   return (
//     <div className={Dash.lecturerDashboard}>
//       <div className={Dash.dashboard}>
//         <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
//         <div className={Dash["dashboard-content"]}>
//           {!isMobile && <Sidebar />}
//           {isMobile && (
//             <>
//               <div
//                 className={`${AdminDash["overlay"]} ${
//                   isMobileMenuOpen ? AdminDash["active"] : ""
//                 }`}
//                 onClick={toggleMobileMenu}
//               ></div>
//               <MobileMenu
//                 isOpen={isMobileMenuOpen}
//                 toggleMenu={toggleMobileMenu}
//               />
//             </>
//           )}
//           <div className={Dash.backButtonContainer}>
//             <BackButton targetPath="/dashboard" size={30} color="#106053" />
//           </div>
//           <div className="E-exam-list-container">
//             {/* Search Container */}
//             <div style={searchContainerStyles}>
//               <button style={searchButtonStyles} onClick={() => navigate("#")}>
//                 View Exam Paper
//               </button>
//               <input
//                 type="text"
//                 placeholder="Search by exam status..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 style={searchInputStyles}
//               />
//             </div>
//             <h2 style={{ marginRight: "800px" }}>Exam Papers</h2>
//             <table className="E-glass-table">
//               <thead>
//                 <tr>
//                   <th>Course Unit</th>
//                   <th>Title</th>
//                   <th>Instructions</th>
//                   <th>Status</th>
//                   <th>Phase</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredExams.map((exam) => (
//                   <tr key={exam.id}>
//                     <td>{exam.courseUnit}</td>
//                     <td>{exam.title}</td>
//                     <td>{exam.description}</td>
//                     <td>
//                       <span
//                         className={`E-status-text ${
//                           exam.isDraft ? "draft" : "published"
//                         }`}
//                       >
//                         {exam.isDraft ? "Draft" : "Published"}
//                       </span>
//                     </td>
//                     <td>
//                       <span
//                         className={`E-status-text ${
//                           exam.status === "draft"
//                             ? "draft"
//                             : exam.status === "pending"
//                             ? "pending"
//                             : exam.status === "approved"
//                             ? "approved"
//                             : exam.status === "rejected"
//                             ? "rejected"
//                             : exam.status === "published"
//                             ? "published"
//                             : exam.status === "unpublished"
//                             ? "unpublished"
//                             : ""
//                         }`}
//                       >
//                         {exam.status}
//                       </span>
//                     </td>
//                     <td>
//                       <button
//                         className="E-preview-button"
//                         onClick={() => handlePreview(exam.id)}
//                       >
//                         <FiEye />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminExamList;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminExamList.css";
import Header from "../../components/admin/Headerpop";
import Sidebar from "../../components/admin/SideBarpop";
import MobileMenu from "../../components/admin/MobileMenu";
import Dash from "../../components/lecturer/LecturerDashboard.module.css";
import BackButton from "../../components/lecturer/BackButton";
import { FiEye } from "react-icons/fi";

function AdminExamList() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [examPapers, setExamPapers] = useState([]);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredExams, setFilteredExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 991);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchExamPapers = async () => {
            try {
                const response = await fetch("http://localhost:3000/exam-paper");
                if (!response.ok) throw new Error("Failed to fetch exam papers");
                const data = await response.json();
                setExamPapers(data);
                setFilteredExams(data);
            } catch (error) {
                setError("Error fetching exam papers: " + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchExamPapers();
    }, []);

    useEffect(() => {
        const filtered = examPapers.filter((exam) =>
            Object.values(exam)
                .join(" ")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
        setFilteredExams(filtered);
    }, [searchTerm, examPapers]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handlePreview = (examId) => {
        navigate(`/admin-exam-paper/${examId}`);
    };

    const searchContainerStyles = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 0",
        gap: "0px"
    };

    const searchButtonStyles = {
        backgroundColor: "#0F533D",
        color: "white",
        padding: "12px 24px",
        border: "none",
        cursor: "pointer",
        minWidth: "200px",
        fontSize: "16px",
        marginLeft: "500px"
    };

    const searchInputStyles = {
        padding: "12px 16px",
        border: "1px solid #ddd",
        borderRadius: "2px",
        fontSize: "16px",
        width: "300px",
        color: "#666"
    };

    if (error) return <div className="E-alert alert-danger">{error}</div>;

    return (
        <div className={Dash.lecturerDashboard}>
            <div className={`${Dash["dashboard"]} ${isMobileMenuOpen ? Dash["menu-open"] : ""}`}>
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
                            <BackButton targetPath="/dashboard" size={30} color="#106053" />
                        </div>
                        <div className="E-exam-list-container">
                            {loading ? (
                                <div className="E-spinner-container">
                                    <div className="E-spinner"></div>
                                </div>
                            ) : (
                                <>
                                    <div style={searchContainerStyles}>
                                        <button 
                                            style={searchButtonStyles}
                                            onClick={() => navigate('#')}
                                        >
                                            View Exam Paper
                                        </button>
                                        <input
                                            type="text"
                                            placeholder="Search by exam status..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            style={searchInputStyles}
                                        />
                                    </div>
                                    <h2 style={{ marginRight: "800px" }}>Exam Papers</h2>
                                    <table className="E-glass-table">
                                        <thead>
                                            <tr>
                                                <th>Course Unit</th>
                                                <th>Title</th>
                                                <th>Instructions</th>
                                                <th>Status</th>
                                                <th>Phase</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredExams.map((exam) => (
                                                <tr key={exam.id}>
                                                    <td>{exam.courseUnit}</td>
                                                    <td>{exam.title}</td>
                                                    <td>{exam.description}</td>
                                                    <td>
                                                        <span
                                                            className={`E-status-text ${
                                                                exam.isDraft ? "draft" : "published"
                                                            }`}
                                                        >
                                                            {exam.isDraft ? "Draft" : "Published"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span
                                                            className={`E-status-text ${
                                                                exam.status === "draft"
                                                                ? "draft"
                                                                : exam.status === "pending"
                                                                ? "pending"
                                                                : exam.status === "approved"
                                                                ? "approved"
                                                                : exam.status === "rejected"
                                                                ? "rejected"
                                                                : exam.status === "published"
                                                                ? "published"
                                                                : exam.status === "unpublished"
                                                                ? "unpublished"
                                                                : ""
                                                            }`}
                                                        >
                                                            {exam.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="E-preview-button"
                                                            onClick={() => handlePreview(exam.id)}
                                                        >
                                                            <FiEye />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminExamList;

