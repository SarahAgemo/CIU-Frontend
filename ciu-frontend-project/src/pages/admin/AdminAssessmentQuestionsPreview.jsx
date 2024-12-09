// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for edit and delete
// import "../../pages/lecturer/AssessmentQuestionsPreview.css";
// import Header from "../../components/admin/Headerpop";
// import Sidebar from "../../components/admin/SideBarpop";
// import MobileMenu from "../../components/admin/MobileMenu";
// import Dash from "../../components/lecturer/LecturerDashboard.module.css";
// import BackButton from "../../components/lecturer/BackButton";

// function AdminQuestionsPreview() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 991);
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]);
//   const [error, setError] = useState("");
//   const [selectedAnswers, setSelectedAnswers] = useState({}); // Track selected answers

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         console.log("Fetching questions for exam paper ID:", id);
//         const response = await fetch(
//           `http://localhost:3000/exam-paper/${id}/questions`
//         );
//         if (!response.ok) throw new Error("Failed to fetch questions");

//         const data = await response.json();
//         console.log("Fetched questions:", data);

//         if (Array.isArray(data)) {
//           setQuestions(data);
//         } else {
//           throw new Error("Unexpected data format");
//         }
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//         setError("Error fetching questions: " + error.message);
//       }
//     };

//     fetchQuestions();
//   }, [id]);



//   const handleOptionChange = (questionId, selectedOption) => {
//     setSelectedAnswers((prevSelectedAnswers) => ({
//       ...prevSelectedAnswers,
//       [questionId]: selectedOption,
//     }));
//   };

//   if (error) return <div className="alert alert-danger">{error}</div>;
//   if (!questions.length) return <div>No questions found.</div>;

//   return (
//     <div className={Dash.lecturerDashboard}>
//       <div className={Dash.dashboard}>
//         <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
//         <div className={Dash["dashboard-content"]}>
//           {!isMobile && <Sidebar />}
//           {isMobile && (
//             <>
//               <div 
//                 className={`${AdminDash["overlay"]} ${isMobileMenuOpen ? AdminDash["active"] : ""}`} 
//                 onClick={toggleMobileMenu}
//               ></div>
//               <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
//             </>
//           )}
//           <div className={Dash.backButtonContainer}>
//             <BackButton targetPath={`/admin-exam-list`} size={30} color="#106053" />
//           </div>
//           <div className="questions-preview-container mt-5">
//             <h3 className="questions-preview-header">Questions Preview</h3>
//             <p className="total-questions">
//               Total Questions: {questions.length}
//             </p>
//             {questions.map((question) => (
//               <div key={question.id} className="question-card mb-3">
//                 <div className="question-content">
//                   <strong>Q{question.id}: </strong> {question.content}
//                 </div>
//                 <form className="question-options">
//                   {question.options.map((option, index) => (
//                     <div key={index} className="form-check">
//                       <input
//                         className="form-check-input me-1"
//                         type="radio"
//                         name={`question-${question.id}`}
//                         id={`question-${question.id}-option-${index}`}
//                         value={option}
//                         checked={selectedAnswers[question.id] === option}
//                         onChange={() => handleOptionChange(question.id, option)}
//                       />
//                       <label
//                         className="form-check-label"
//                         htmlFor={`question-${question.id}-option-${index}`}
//                       >
//                         {option}
//                       </label>
//                     </div>
//                   ))}
//                 </form>
//                 <div className="question-answer">
//                   <strong>Correct Answer:</strong> {question.answer}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminQuestionsPreview;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Snackbar, Alert, CircularProgress } from '@mui/material';
import styles from "./AdminAssessmentQuestionsPreview.module.css";
import Header from "../../components/admin/Headerpop";
import Sidebar from "../../components/admin/SideBarpop";
import MobileMenu from "../../components/admin/MobileMenu";
import Dash from "../../components/lecturer/LecturerDashboard.module.css";
import BackButton from "../../components/lecturer/BackButton";

function AdminQuestionsPreview() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSnackbar = (message, severity = 'info') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const closeSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/exam-paper/${id}/questions`
        );
        if (!response.ok) throw new Error("Failed to fetch questions");

        const data = await response.json();
        if (Array.isArray(data)) {
          setQuestions(data);
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (error) {
        handleSnackbar("Error fetching questions: " + error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [id]);

  const handleOptionChange = (questionId, selectedOption) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  return (
    <div className={Dash.lecturerDashboard}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <div className={Dash.dashboard}>
        <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
        <div className={Dash["dashboard-content"]}>
          {!isMobile && <Sidebar />}
          {isMobile && (
            <MobileMenu
              isOpen={isMobileMenuOpen}
              toggleMenu={toggleMobileMenu}
            />
          )}
          <div className={Dash.backButtonContainer}>
            <BackButton targetPath={`/admin-exam-list`} size={30} color="#106053" />
          </div>
          {loading ? (
            <div className={styles.spinnerContainer}>
              <CircularProgress />
            </div>
          ) : !questions.length ? (
            <div className={styles.noQuestions}>No questions found.</div>
          ) : (
            <div className={styles.questionsPreviewContainer}>
              <h3 className={styles.questionsPreviewHeader}>Questions Preview</h3>
              <p className={styles.totalQuestions}>
                Total Questions: {questions.length}
              </p>
              {questions.map((question) => (
                <div key={question.id} className={styles.questionCard}>
                  <div className={styles.questionContent}>
                    <strong>Q{question.questionNumber}: </strong> {question.content}
                  </div>
                  <form className={styles.questionOptions}>
                    {question.options.map((option, index) => (
                      <div key={index} className={styles.formCheck}>
                        <input
                          className={styles.formCheckInput}
                          type="radio"
                          name={`question-${question.id}`}
                          id={`question-${question.id}-option-${index}`}
                          value={option}
                          checked={selectedAnswers[question.id] === option}
                          onChange={() => handleOptionChange(question.id, option)}
                        />
                        <label
                          className={styles.formCheckLabel}
                          htmlFor={`question-${question.id}-option-${index}`}
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </form>
                  <div className={styles.questionAnswer}>
                    <strong>Correct Answer:</strong> {question.answer}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminQuestionsPreview;

