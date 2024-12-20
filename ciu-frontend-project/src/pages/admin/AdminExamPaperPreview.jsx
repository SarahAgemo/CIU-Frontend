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
      const response = await fetch(`https://c-i-u-backend.onrender.com/exam-paper/${id}${endpoint}`, { method: "PATCH" });

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

