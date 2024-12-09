// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Button,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import "./AssessmentQuestionsPreview.css";
// import Header from "../../components/lecturer/HeaderPop";
// import Sidebar from "../../components/lecturer/SideBarPop";
// import MobileMenu from "../../components/lecturer/MobileMenu";
// import Dash from "../../components/lecturer/LecturerDashboard.module.css";
// import BackButton from "../../components/lecturer/BackButton";

// function QuestionsPreview() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [isDraft, setIsDraft] = useState(true);
//   const [status, setStatus] = useState(true);

//   // New states for delete dialog and snackbar
//   const [deleteDialog, setDeleteDialog] = useState({
//     open: false,
//     questionId: null,
//   });
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "info",
//   });

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 991);
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleSnackbar = (message, severity = "info") => {
//     setSnackbar({
//       open: true,
//       message,
//       severity,
//     });
//   };

//   const closeSnackbar = () => {
//     setSnackbar((prev) => ({
//       ...prev,
//       open: false,
//     }));
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   useEffect(() => {
//     const fetchExamData = async () => {
//       try {
//         const response = await fetch(`https://c-i-u-backend.onrender.com/exam-paper/${id}`);
//         if (!response.ok) throw new Error("Failed to fetch exam paper");
//         const data = await response.json();
//         setIsDraft(data.isDraft);
//         setStatus(data.status);
//       } catch (error) {
//         handleSnackbar("Error fetching exam paper: " + error.message, "error");
//       }
//     };

//     fetchExamData();
//   }, [id]);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await fetch(
//           `https://c-i-u-backend.onrender.com/exam-paper/${id}/questions`
//         );
//         if (!response.ok) throw new Error("Failed to fetch questions");

//         const data = await response.json();
//         if (Array.isArray(data)) {
//           setQuestions(data);
//         } else {
//           throw new Error("Unexpected data format");
//         }
//       } catch (error) {
//         handleSnackbar("Error fetching questions: " + error.message, "error");
//       }
//     };

//     fetchQuestions();
//   }, [id]);

//   const handleDeleteQuestion = (questionId) => {
//     if (!isDraft || status === 'approved') {
//       handleSnackbar("You cannot delete questions from an already approved or published exam.", "error");
//       return;
//     }
//     if (status === 'pending') {
//       handleSnackbar("You cannot delete questions in an exam pending approval.", "error");
//       return;
//     }
//     setDeleteDialog({
//       open: true,
//       questionId,
//     });
//   };

//   const confirmDelete = async () => {
//     try {
//       const response = await fetch(
//         `https://c-i-u-backend.onrender.com/exam-paper/${id}/question/${deleteDialog.questionId}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || response.statusText);
//       }

//       setQuestions(questions.filter((q) => q.id !== deleteDialog.questionId));
//       handleSnackbar("Question deleted successfully", "success");
//     } catch (error) {
//       handleSnackbar("Error deleting question: " + error.message, "error");
//     } finally {
//       setDeleteDialog({ open: false, questionId: null });
//     }
//   };

//   const handleEditQuestion = (questionId) => {
//     if (!isDraft || status === "approved") {
//       handleSnackbar("You cannot edit questions in an already approved or published exam.", "error");
//       return;
//     }
//     if (status === 'pending') {
//       handleSnackbar("You cannot edit questions in an exam pending approval.", "error");
//       return;
//     }
//     navigate(`/exam-paper/${id}/question/${questionId}`);
//   };

//   const handleOptionChange = (questionId, selectedOption) => {
//     setSelectedAnswers((prev) => ({
//       ...prev,
//       [questionId]: selectedOption,
//     }));
//   };

//   if (!questions.length) return <div>No questions found.</div>;

//   return (
//     <div className={Dash.lecturerDashboard}>
//       {/* Snackbar Component */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={closeSnackbar}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//         sx={{ width: "50%" }}
//       >
//         <Alert onClose={closeSnackbar} severity={snackbar.severity}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>

//       {/* Delete Confirmation Dialog */}
//       <Dialog
//         open={deleteDialog.open}
//         onClose={() => setDeleteDialog({ open: false, questionId: null })}
//       >
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete this question? This action cannot be
//             undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={() => setDeleteDialog({ open: false, questionId: null })}
//           >
//             Cancel
//           </Button>
//           <Button onClick={confirmDelete} color="error" variant="contained">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <div className={Dash.dashboard}>
//         <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
//         <div className={Dash["dashboard-content"]}>
//           {!isMobile && <Sidebar />}
//           {isMobile && (
//             <MobileMenu
//               isOpen={isMobileMenuOpen}
//               toggleMenu={toggleMobileMenu}
//             />
//           )}
//           <div className={Dash.backButtonContainer}>
//             <BackButton
//               targetPath={`/exam-paper/${id}`}
//               size={30}
//               color="#106053"
//             />
//           </div>
//           <div className="questions-preview-container mt-5">
//             <h3 className="questions-preview-header">Questions Preview</h3>
//             <p className="total-questions">
//               Total Questions: {questions.length}
//             </p>
//             {questions.map((question) => (
//               <div key={question.id} className="question-card mb-3">
//                 <div className="question-content">
//                   <strong>Q{question.questionNumber}: </strong>{" "}
//                   {question.content}
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
//                 <div className="question-actions">
//                   <button
//                     onClick={() => handleEditQuestion(question.id)}
//                     className="btn btn-warning me-1 icon-button"
//                   >
//                     <FaEdit className="icon-edit" />
//                   </button>
//                   <button
//                     onClick={() => handleDeleteQuestion(question.id)}
//                     className="btn btn-warning me-1 icon-button"
//                   >
//                     <FaTrash className="icon-trash" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//             <div>
//             <button
//                 type="button"
//                 onClick={() => {
//                   if (!isDraft || status === 'approved') {
//                     handleSnackbar("You cannot add questions to an already approved or published exam.", "error");
//                     return;
//                   }
//                   if (status === 'pending') {
//                     handleSnackbar("You cannot add questions to an exam pending approval.", "error");
//                     return;
//                   }
//                   navigate(`/exam-paper/${id}/questions/add-question`);
//                 }}
//                 className= 'add-quest'
//             >
//                 + Question
//             </button>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default QuestionsPreview;


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Snackbar, Alert, CircularProgress, IconButton } from '@mui/material';
import "./AssessmentQuestionsPreview.css";
import Header from "../../components/lecturer/HeaderPop";
import Sidebar from "../../components/lecturer/SideBarPop";
import MobileMenu from "../../components/lecturer/MobileMenu";
import Dash from "../../components/lecturer/LecturerDashboard.module.css";
import BackButton from "../../components/lecturer/BackButton";
import EditExamPaper from "./EditExamPaperQuestions";
import AddQuestions from "./AddQuestions";
import CloseIcon from '@mui/icons-material/Close';

function QuestionsPreview() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isDraft, setIsDraft] = useState(true);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    questionId: null
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState(null);

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
    const fetchExamData = async () => {
      try {
        const response = await fetch(`https://c-i-u-backend.onrender.com/exam-paper/${id}`);
        if (!response.ok) throw new Error("Failed to fetch exam paper");
        const data = await response.json();
        setIsDraft(data.isDraft);
      } catch (error) {
        handleSnackbar("Error fetching exam paper: " + error.message, "error");
      }
    };

    fetchExamData();
  }, [id]);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://c-i-u-backend.onrender.com/exam-paper/${id}/questions`
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

  const handleDeleteQuestion = (questionId) => {
    if (!isDraft) {
      handleSnackbar("You cannot delete questions from an already published exam.", "error");
      return;
    }
    setDeleteDialog({
      open: true,
      questionId
    });
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `https://c-i-u-backend.onrender.com/exam-paper/${id}/question/${deleteDialog.questionId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || response.statusText);
      }

      setQuestions(questions.filter((q) => q.id !== deleteDialog.questionId));
      handleSnackbar("Question deleted successfully", "success");
    } catch (error) {
      handleSnackbar("Error deleting question: " + error.message, "error");
    } finally {
      setDeleteDialog({ open: false, questionId: null });
    }
  };

  const handleEditQuestion = (questionId) => {
    if (!isDraft) {
      handleSnackbar("You cannot edit questions in an already published exam.", "error");
      return;
    }
    setEditingQuestionId(questionId);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditingQuestionId(null);
  };

  const handleAddQuestion = () => {
    if (!isDraft) {
      handleSnackbar("You cannot add questions to an already published exam.", "error");
      return;
    }
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const handleOptionChange = (questionId, selectedOption) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleQuestionUpdate = (updatedQuestion) => {
    setQuestions(questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
    handleCloseEditModal();
    handleSnackbar("Question updated successfully", "success");
  };

  const handleQuestionAdd = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
    handleCloseAddModal();
    handleSnackbar("Question added successfully", "success");
  };

  return (
    <div className={Dash.lecturerDashboard}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ width: '50%' }}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, questionId: null })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this question? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, questionId: null })}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

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
            <BackButton targetPath={`/schedule-upload-exams/exam-list/`} size={30} color="#106053" />
          </div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <CircularProgress />
            </div>
          ) : !questions.length ? (
            <div>No questions found.</div>
          ) : (
            <div className="questions-preview-container mt-5">
              <h3 className="questions-preview-header">Questions Preview</h3>
              <p className="total-questions">
                Total Questions: {questions.length}
              </p>
              {questions.map((question) => (
                <div key={question.id} className="question-card mb-3">
                  <div className="question-content">
                    <strong>Q{question.questionNumber}: </strong> {question.content}
                  </div>
                  <form className="question-options">
                    {question.options.map((option, index) => (
                      <div key={index} className="form-check">
                        <input
                          className="form-check-input me-1"
                          type="radio"
                          name={`question-${question.id}`}
                          id={`question-${question.id}-option-${index}`}
                          value={option}
                          checked={selectedAnswers[question.id] === option}
                          onChange={() => handleOptionChange(question.id, option)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`question-${question.id}-option-${index}`}
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </form>
                  <div className="question-answer">
                    <strong>Correct Answer:</strong> {question.answer}
                  </div>
                  <div className="question-actions">
                    <span
                      onClick={() => handleEditQuestion(question.id)}
                      type="button"
                      className="btn btn-warning me-1 icon-button"
                    >
                      <FaEdit className="btn-secondary" />
                    </span>
                    <span
                      onClick={() => handleDeleteQuestion(question.id)}
                      type="button"
                      className="btn-danger"
                    >
                      <FaTrash className="icon-trash" />
                    </span>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddQuestion}
                className="add-quest"
              >
                <FaPlus /> Add Question
              </button>
            </div>
          )}
        </div>
      </div>
      <Dialog open={editModalOpen} onClose={handleCloseEditModal} maxWidth="md" fullWidth>
        <DialogTitle>
          Edit Question
          <IconButton
            aria-label="close"
            onClick={handleCloseEditModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {editingQuestionId && (
            <EditExamPaper
              id={id}
              questionId={editingQuestionId}
              onClose={handleCloseEditModal}
              onQuestionUpdate={handleQuestionUpdate}
            />
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={addModalOpen} onClose={handleCloseAddModal} maxWidth="md" fullWidth>
        <DialogTitle>
          Add Question
          <IconButton
            aria-label="close"
            onClick={handleCloseAddModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <AddQuestions
            id={id}
            onClose={handleCloseAddModal}
            onQuestionAdd={handleQuestionAdd}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default QuestionsPreview;

