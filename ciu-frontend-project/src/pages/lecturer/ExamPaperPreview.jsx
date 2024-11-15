import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ExamPaperPreview.css";
import Header from "../../components/lecturer/HeaderPop";
import Sidebar from "../../components/lecturer/SideBarPop";
import MobileMenu from "../../components/lecturer/MobileMenu";
import Dash from "../../components/lecturer/LecturerDashboard.module.css";
import BackButton from "../../components/lecturer/BackButton";
import { Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { FaEye, FaEdit, FaTrash, FaCheck, FaPaperPlane, FaUndo } from "react-icons/fa";




function ExamPaperPreview() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [examData, setExamData] = useState(null);
  const [isDraft, setIsDraft] = useState(true);
  const [status, setStatus] = useState(true);

  // Dialog states
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [publishDialog, setPublishDialog] = useState(false);
  const [unpublishDialog, setUnpublishDialog] = useState(false);
  const [approvalDialog, setApprovalDialog] = useState(false);

  // Snackbar state
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

  const handleEdit = () => {
    if (!isDraft) {
      handleSnackbar("You cannot edit an already published exam.", "error");
      return;
    }
    navigate(`/exam-paper/${id}/edit`);
  };

  const handlePreviewQuestions = () => {
    navigate(`/exam-paper/${id}/questions`);
  };

  const handleDelete = async () => {
    if (!isDraft) {
      handleSnackbar("You cannot delete an already published exam.", "error");
      return;
    }
    setDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/exam-paper/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      handleSnackbar("Exam paper deleted successfully", "success");
      navigate("/schedule-upload-exams/exam-list");
    } catch (error) {
      handleSnackbar("Error deleting exam paper: " + error.message, "error");
    } finally {
      setDeleteDialog(false);
    }
  };

  const handlePublish = () => {
   
    if (isDraft === false) {
      handleSnackbar("This exam is already published.", "warning");
      return;
    }
    if (examData.status !== "approved") {
      handleSnackbar("You can only publish approved assessments.", "warning");
      return;
    }
    setPublishDialog(true);
  };

  const confirmPublish = async () => {
    try {
      const response = await fetch(`http://localhost:3000/exam-paper/${id}/publish`, {
        method: "PATCH",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const updatedExamData = await response.json();
      handleSnackbar("Exam paper published successfully", "success");
      setExamData(updatedExamData);
      navigate("/published-exam-papers");
    } catch (error) {
      handleSnackbar("Error publishing exam paper: " + error.message, "error");
    } finally {
      setPublishDialog(false);
    }
  };

  const handleUnpublish = () => {
    if (isDraft) {
      handleSnackbar("This exam is not published.", "warning");
      return;
    }
    setUnpublishDialog(true);
  };

  const confirmUnpublish = async () => {
    try {
      const response = await fetch(`http://localhost:3000/exam-paper/${id}/unpublish`, {
        method: "PATCH",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const updatedExamData = await response.json();
      handleSnackbar("Exam paper unpublished successfully", "success");
      setExamData(updatedExamData);
    } catch (error) {
      handleSnackbar("Error unpublishing exam paper: " + error.message, "error");
    } finally {
      setUnpublishDialog(false);
    }
  };

  const handleRequestApproval = () => {
    if (status === "approved") {
      handleSnackbar("Exam is already approved.", "warning");
      return;
    }
    setApprovalDialog(true);
  };

  const confirmRequestApproval = async () => {
    try {
      const response = await fetch(`http://localhost:3000/exam-paper/${id}/request-approval`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "pending" }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const updatedExamData = await response.json();
      handleSnackbar("Approval requested successfully. Status set to pending.", "success");
      setExamData(updatedExamData);
      navigate("/schedule-upload-exams/exam-list");
    } catch (error) {
      handleSnackbar("Error requesting approval: " + error.message, "error");
    } finally {
      setApprovalDialog(false);
    }
  };

  if (!examData) return <div>Loading...</div>;

  return (
    <div className={Dash.lecturerDashboard}>
      {/* Snackbar Component */}
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this exam paper? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Publish Confirmation Dialog */}
      <Dialog
        open={publishDialog}
        onClose={() => setPublishDialog(false)}
      >
        <DialogTitle>Confirm Publish</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to publish this exam paper?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPublishDialog(false)}>Cancel</Button>
          <Button onClick={confirmPublish} color="primary" variant="contained">
            Publish
          </Button>
        </DialogActions>
      </Dialog>

      {/* Unpublish Confirmation Dialog */}
      <Dialog
        open={unpublishDialog}
        onClose={() => setUnpublishDialog(false)}
      >
        <DialogTitle>Confirm Unpublish</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to unpublish this exam paper?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUnpublishDialog(false)}>Cancel</Button>
          <Button onClick={confirmUnpublish} color="primary" variant="contained">
            Unpublish
          </Button>
        </DialogActions>
      </Dialog>

      {/* Request Approval Dialog */}
      <Dialog
        open={approvalDialog}
        onClose={() => setApprovalDialog(false)}
      >
        <DialogTitle>Confirm Request Approval</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to request approval for this exam paper?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApprovalDialog(false)}>Cancel</Button>
          <Button 
          onClick={confirmRequestApproval} 
          variant="contained"
            sx={{
              backgroundColor: '#106053',
              '&:hover': {
                backgroundColor: '#0b3f37' 
              }
            }}
          >
            Request Approval
          </Button>
        </DialogActions>
      </Dialog>

      <div className={Dash.dashboard}>
        <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
        <div className={Dash["dashboard-content"]}>
          {!isMobile && <Sidebar />}
          {isMobile && (
            <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
          )}
          <div className={Dash.backButtonContainer}>
            <BackButton targetPath="/schedule-upload-exams/exam-list" size={30} color="#106053" />
          </div>

          {/* Rest of your existing JSX remains the same */}
          <div className="exam-preview__container mt-5">
            <h3 className="exam-preview__title">Exam Paper Preview</h3>

            <div className="exam-preview__table-container">
              <table className="exam-preview__table table-bordered">
                <tbody>
                  <tr>
                    <td>
                      <strong>Title</strong>
                    </td>
                    <td>{examData.title}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Description</strong>
                    </td>
                    <td>{examData.description}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Course ID</strong>
                    </td>
                    <td>{examData.courseId}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Course Unit</strong>
                    </td>
                    <td>{examData.courseUnit}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Course Unit Code</strong>
                    </td>
                    <td>{examData.courseUnitCode}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Scheduled Date</strong>
                    </td>
                    <td>{examData.scheduledDate}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Duration</strong>
                    </td>
                    <td>{examData.duration}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Start Time</strong>
                    </td>
                    <td>{examData.startTime}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>End Time</strong>
                    </td>
                    <td>{examData.endTime}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Created By</strong>
                    </td>
                    <td>{examData.createdBy}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Questions</strong>
                    </td>
                    <td>
                      {examData.questions && examData.questions.length > 0
                        ? `${examData.questions.length}`
                        : "(No questions added)"}
                    </td>

                  </tr>
                </tbody>
              </table>
            </div>

            <div className="exam-preview__btn-container">
              <button onClick={handlePreviewQuestions} className="exam-preview__icon-btn" data-tooltip="Preview Questions">
                <FaEye />
              </button>
              <button onClick={handleEdit} className="exam-preview__icon-btn" data-tooltip="Edit Exam Paper">
                <FaEdit />
              </button>
              <button onClick={handleRequestApproval} className="exam-preview__icon-btn" data-tooltip="Request Approval">
                <FaCheck />
              </button>
              <button onClick={handlePublish} className="exam-preview__icon-btn" data-tooltip="Publish">
                <FaPaperPlane />
              </button>
              <button onClick={handleUnpublish} className="exam-preview__icon-btn" data-tooltip="Unpublish">
                <FaUndo />
              </button>
              <button onClick={handleDelete} className="exam-preview__delete-icon-btn" data-tooltip="Delete">
                <FaTrash />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamPaperPreview;