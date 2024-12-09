// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Snackbar, Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
// import { FaEye, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import "../../pages/lecturer/ExamPaperPreview.css";
// import Header from "../../components/admin/Headerpop";
// import Sidebar from "../../components/admin/SideBarpop";
// import MobileMenu from "../../components/admin/MobileMenu";
// import Dash from "../../components/lecturer/LecturerDashboard.module.css";
// import BackButton from "../../components/lecturer/BackButton";
// import moment from 'moment';


// function AdminExamPaperPreview() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [dialogType, setDialogType] = useState(""); // "approve" or "reject"

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
//   const { id } = useParams(); // Get the exam paper ID from the URL
//   const navigate = useNavigate(); // Initialize useNavigate
//   const [examData, setExamData] = useState(null);
//   const [error, setError] = useState("");
//   const [isDraft, setIsDraft] = useState(true);
//   const [status, setStatus] = useState(true);

//   useEffect(() => {
//     const fetchExamData = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/exam-paper/${id}`);
//         if (!response.ok) throw new Error("Failed to fetch exam paper");
//         const data = await response.json();
//         setExamData(data);
//         setIsDraft(data.isDraft);
//         setStatus(data.status);
//       } catch (error) {
//         setError("Error fetching exam paper: " + error.message);
//       }
//     };

//     fetchExamData();
//   }, [id]);

//   const handlePreviewQuestions = () => {
//     navigate(`/admin-exam-paper/${id}/questions`);
//   };

//   const handleApproval = async () => {
//     if (!isDraft) {
//       setSnackbarMessage("You cannot approve an already published exam.");
//       setSnackbarSeverity("warning");
//       setOpenSnackbar(true);
//       return;
//     }

//     if (status === "approved") {
//       setSnackbarMessage("Exam is already approved.");
//       setSnackbarSeverity("info");
//       setOpenSnackbar(true);
//       return;
//     }
//     setDialogType("approve");
//     setDialogOpen(true);
//   };

//   const handleRejection = async () => {
//     if (!isDraft) {
//       setSnackbarMessage("You cannot reject an already published exam.");
//       setSnackbarSeverity("warning");
//       setOpenSnackbar(true);
//       return;
//     }

//     if (status === "rejected") {
//       setSnackbarMessage("Exam is already rejected.");
//       setSnackbarSeverity("info");
//       setOpenSnackbar(true);
//       return;
//     }
//     setDialogType("reject");
//     setDialogOpen(true);
//   };

//   const confirmAction = async () => {
//     setDialogOpen(false);
//     try {
//       const endpoint = dialogType === "approve" ? "/approve" : "/reject";
//       const response = await fetch(`http://localhost:3000/exam-paper/${id}${endpoint}`, { method: "PATCH" });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message);
//       }

//       const updatedExamData = await response.json();
//       setExamData(updatedExamData);
//       setSnackbarMessage(`Exam ${dialogType}d successfully`);
//       setSnackbarSeverity("success");
//       setOpenSnackbar(true);
//       navigate(`/admin-exam-list`);
//     } catch (error) {
//       setSnackbarMessage(`Error ${dialogType}ing exam: ` + error.message);
//       setSnackbarSeverity("error");
//       setOpenSnackbar(true);
//     }
//   };

//   if (error) return <div className="alert alert-danger">{error}</div>;
//   if (!examData) return <div>Loading...</div>;

//   return (
//     <div className={Dash.lecturerDashboard}>
//       <div className={Dash.dashboard}>
//         <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
//         <div className={Dash["dashboard-content"]}>
//           {!isMobile && <Sidebar />}
//           {isMobile && (
//             <>
//               <div 
//                 className={`${Dash["overlay"]} ${isMobileMenuOpen ? Dash["active"] : ""}`} 
//                 onClick={toggleMobileMenu}
//               ></div>
//               <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
//             </>
//           )}
//           <div className={Dash.backButtonContainer}>
//             <BackButton targetPath="/admin-exam-list" size={30} color="#106053" />
//           </div>
//           <div className="exam-preview__container mt-5">
//             <h3 className="exam-preview__title">Exam Paper Preview</h3>
//             <div className="exam-preview__table-container">
//               <table className="exam-preview__table table-bordered">
//                 <tbody>
//                   <tr>
//                     <td><strong>Title</strong></td>
//                     <td>{examData.title}</td>
//                   </tr>
//                   <tr>
//                     <td><strong>Description</strong></td>
//                     <td>{examData.description}</td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <strong>Course ID</strong>
//                     </td>
//                     <td>{examData.courseId}</td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <strong>Course Unit</strong>
//                     </td>
//                     <td>{examData.courseUnit}</td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <strong>Course Unit Code</strong>
//                     </td>
//                     <td>{examData.courseUnitCode}</td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <strong>Scheduled Date</strong>
//                     </td>
//                     <td>{moment(examData.scheduledDate).format('Do MMMM YYYY, h:mm A')}</td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <strong>Duration</strong>
//                     </td>
//                     <td>{examData.duration}</td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <strong>Start Time</strong>
//                     </td>
//                     <td>{moment(examData.startTime).format('h:mm A')}</td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <strong>End Time</strong>
//                     </td>
//                     <td>{moment(examData.endTime).format('h:mm A')}</td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <strong>Created By</strong>
//                     </td>
//                     <td>{examData.createdBy}</td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <strong>Questions</strong>
//                     </td>
//                     <td>
//                       {examData.questions.length}{" "}
//                       {examData.questions.length === 0
//                         ? "(No questions added)"
//                         : ""}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//             <div className="exam-preview__btn-container">
//               <button onClick={handlePreviewQuestions} className="exam-preview__icon-btn" data-tooltip="Preview Questions">
//                 <FaEye />
//               </button>
//               <button onClick={handleApproval} className="exam-preview__icon-btn" data-tooltip="Approve Exam">
//                 <FaCheckCircle />
//               </button>
//               <button onClick={handleRejection} className="exam-preview__reject-icon-btn" data-tooltip="Reject Exam">
//                 <FaTimesCircle />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Snackbar 
//         open={openSnackbar} 
//         autoHideDuration={6000} 
//         onClose={() => setOpenSnackbar(false)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//         sx={{ width: '50%' }}
//         >  
//         <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//       <Dialog
//         open={dialogOpen}
//         onClose={() => setDialogOpen(false)}
//         aria-labelledby="confirmation-dialog-title"
//         aria-describedby="confirmation-dialog-description"
//       >
//         <DialogTitle id="confirmation-dialog-title">
//           {dialogType === "approve" ? "Approve Exam" : "Reject Exam"}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="confirmation-dialog-description">
//             Are you sure you want to {dialogType} this exam?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDialogOpen(false)} color="primary">
//             Cancel
//           </Button>
//           <Button 
//           onClick={confirmAction}
//             variant="contained"
//             sx={{
//               backgroundColor: '#106053',
//               '&:hover': {
//                 backgroundColor: '#0b3f37'
//               }
//             }}
           
//            >
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default AdminExamPaperPreview;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableRow, 
  Paper, 
  Button, 
  Snackbar, 
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton, 
  Tooltip
} from '@mui/material';
import { FaEye, FaCheck, FaTimesCircle } from "react-icons/fa";

function AdminExamPaperPreview({ id, onClose }) {
  const [examData, setExamData] = useState(null);
  const [isDraft, setIsDraft] = useState(true);
  const [status, setStatus] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/exam-paper/${id}`);
        if (!response.ok) throw new Error("Failed to fetch exam paper");
        const data = await response.json();
        setExamData(data);
        setIsDraft(data.isDraft);
        setStatus(data.status);
      } catch (error) {
        handleSnackbar("Error fetching exam paper: " + error.message, "error");
      }
    };

    fetchExamData();
  }, [id]);

  const handleSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handlePreviewQuestions = () => {
    navigate(`/admin-exam-paper/${id}/questions`);
  };

  const handleApproval = () => {
    if (!isDraft) {
      handleSnackbar("You cannot approve an already published exam.", "warning");
      return;
    }
    if (status === "approved") {
      handleSnackbar("Exam is already approved.", "info");
      return;
    }
    setDialogType("approve");
    setDialogOpen(true);
  };

  const handleRejection = () => {
    if (!isDraft) {
      handleSnackbar("You cannot reject an already published exam.", "warning");
      return;
    }
    if (status === "rejected") {
      handleSnackbar("Exam is already rejected.", "info");
      return;
    }
    setDialogType("reject");
    setDialogOpen(true);
  };

  const confirmAction = async () => {
    setDialogOpen(false);
    try {
      const endpoint = dialogType === "approve" ? "/approve" : "/reject";
      const response = await fetch(`http://localhost:3000/exam-paper/${id}${endpoint}`, { method: "PATCH" });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const updatedExamData = await response.json();
      setExamData(updatedExamData);
      handleSnackbar(`Exam ${dialogType}d successfully`, "success");
      onClose();
    } catch (error) {
      handleSnackbar(`Error ${dialogType}ing exam: ` + error.message, "error");
    }
  };

  if (!examData) return <div>Loading...</div>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell>{examData.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell>{examData.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Course ID</strong></TableCell>
              <TableCell>{examData.courseId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Course Unit</strong></TableCell>
              <TableCell>{examData.courseUnit}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Course Unit Code</strong></TableCell>
              <TableCell>{examData.courseUnitCode}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Scheduled Date</strong></TableCell>
              <TableCell>{moment(examData.scheduledDate).format('Do MMMM YYYY, h:mm A')}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Duration</strong></TableCell>
              <TableCell>{examData.duration}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Start Time</strong></TableCell>
              <TableCell>{moment(examData.startTime).format('h:mm A')}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>End Time</strong></TableCell>
              <TableCell>{moment(examData.endTime).format('h:mm A')}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Created By</strong></TableCell>
              <TableCell>{examData.createdBy}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Questions</strong></TableCell>
              <TableCell>
                {examData.questions && examData.questions.length > 0
                  ? `${examData.questions.length}`
                  : "(No questions added)"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        <Tooltip title="Preview Questions">
          <IconButton onClick={handlePreviewQuestions} size="large">
            <FaEye />
          </IconButton>
        </Tooltip>
        <Tooltip title="Approve Exam">
          <IconButton onClick={handleApproval} size="large">
            <FaCheck />
          </IconButton>
        </Tooltip>
        <Tooltip title="Reject Exam">
          <IconButton onClick={handleRejection} size="large" color="error">
            <FaTimesCircle />
          </IconButton>
        </Tooltip>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
      >
        <DialogTitle id="confirmation-dialog-title">
          {dialogType === "approve" ? "Approve Exam" : "Reject Exam"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirmation-dialog-description">
            Are you sure you want to {dialogType} this exam?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={confirmAction}
            variant="contained"
            color={dialogType === "approve" ? "primary" : "error"}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AdminExamPaperPreview;

