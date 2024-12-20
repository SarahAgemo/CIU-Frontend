import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { FaEye, FaEdit, FaTrash, FaCheck, FaPaperPlane, FaUndo } from "react-icons/fa";
import CloseIcon from '@mui/icons-material/Close';
import EditExamInterface from "./EditExamPaper";

function ExamPaperPreview({ id, onClose }) {
  const [examData, setExamData] = useState(null);
  const [isDraft, setIsDraft] = useState(true);
  const [status, setStatus] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [publishDialog, setPublishDialog] = useState(false);
  const [unpublishDialog, setUnpublishDialog] = useState(false);
  const [approvalDialog, setApprovalDialog] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await fetch(`https://c-i-u-backend.onrender.com/exam-paper/${id}`);
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
  }, [id, refreshTrigger]);

  const handleSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleEdit = () => {
    if (!isDraft) {
      handleSnackbar("You cannot edit an already published exam.", "error");
      return;
    }
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setRefreshTrigger(prev => prev + 1);
  };

  const handlePreviewQuestions = () => {
    navigate(`/exam-paper/${id}/questions`);
  };

  const handleDelete = () => {
    if (!isDraft) {
      handleSnackbar("You cannot delete an already published exam.", "error");
      return;
    }
    setDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`https://c-i-u-backend.onrender.com/exam-paper/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      handleSnackbar("Exam paper deleted successfully", "success");
      onClose();
    } catch (error) {
      handleSnackbar("Error deleting exam paper: " + error.message, "error");
    } finally {
      setDeleteDialog(false);
    }
  };

  const handlePublish = () => {
    if (!isDraft) {
      handleSnackbar("This exam is already published.", "warning");
      return;
    }
    if (status !== "approved") {
      handleSnackbar("You can only publish approved assessments.", "warning");
      return;
    }
    setPublishDialog(true);
  };

  const confirmPublish = async () => {
    try {
      const response = await fetch(`https://c-i-u-backend.onrender.com/exam-paper/${id}/publish`, {
        method: "PATCH",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const updatedExamData = await response.json();
      handleSnackbar("Exam paper published successfully", "success");
      setExamData(updatedExamData);
      setIsDraft(false);
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
      const response = await fetch(`https://c-i-u-backend.onrender.com/exam-paper/${id}/unpublish`, {
        method: "PATCH",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const updatedExamData = await response.json();
      handleSnackbar("Exam paper unpublished successfully", "success");
      setExamData(updatedExamData);
      setIsDraft(true);
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
      const response = await fetch(`https://c-i-u-backend.onrender.com/exam-paper/${id}/request-approval`, {
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
      setStatus("pending");
    } catch (error) {
      handleSnackbar("Error requesting approval: " + error.message, "error");
    } finally {
      setApprovalDialog(false);
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
        <Tooltip title="Edit Exam Paper">
          <IconButton onClick={handleEdit} size="large">
            <FaEdit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Request Approval">
          <IconButton onClick={handleRequestApproval} size="large">
            <FaCheck />
          </IconButton>
        </Tooltip>
        <Tooltip title="Publish">
          <IconButton onClick={handlePublish} size="large">
            <FaPaperPlane />
          </IconButton>
        </Tooltip>
        <Tooltip title="Unpublish">
          <IconButton onClick={handleUnpublish} size="large">
            <FaUndo />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete} size="large" color="error">
            <FaTrash />
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

      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this exam paper? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={publishDialog} onClose={() => setPublishDialog(false)}>
        <DialogTitle>Confirm Publish</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to publish this exam paper?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPublishDialog(false)}>Cancel</Button>
          <Button onClick={confirmPublish} color="primary" variant="contained">Publish</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={unpublishDialog} onClose={() => setUnpublishDialog(false)}>
        <DialogTitle>Confirm Unpublish</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to unpublish this exam paper?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUnpublishDialog(false)}>Cancel</Button>
          <Button onClick={confirmUnpublish} color="primary" variant="contained">Unpublish</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={approvalDialog} onClose={() => setApprovalDialog(false)}>
        <DialogTitle>Confirm Request Approval</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to request approval for this exam paper?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApprovalDialog(false)}>Cancel</Button>
          <Button onClick={confirmRequestApproval} color="primary" variant="contained">Request Approval</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isEditModalOpen} onClose={handleCloseEditModal} maxWidth="md" fullWidth>
        <DialogTitle>
          Edit Exam Paper
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
          <EditExamInterface id={id} onClose={handleCloseEditModal} onExamDataChange={(updatedData) => setExamData(updatedData)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ExamPaperPreview;