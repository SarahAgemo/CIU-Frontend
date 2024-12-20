import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import uploadExam from "./UploadExampaperContent.module.css";
import moment from "moment";
import { Snackbar, Alert, IconButton } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CloseIcon from '@mui/icons-material/Close';

export default function UploadExampaperModal({ onClose }) {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const lecturerName = `${storedUser?.first_name} ${storedUser?.last_name}`;

  const [examData, setExamData] = useState({
    title: "",
    description: "",
    courseId: "",
    courseUnit: "",
    courseUnitCode: "",
    scheduledDate: "",
    duration: "",
    startTime: "",
    endTime: "",
    createdBy: lecturerName,
    isDraft: false,
  });

  const [courses, setCourses] = useState([]);
  const [courseUnits, setCourseUnits] = useState([]);
  const [csvFile, setCsvFile] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("https://c-i-u-backend.onrender.com/exam-paper/courses");
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        handleSnackbar("Error fetching courses: " + err.message, 'error');
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    if (examData.courseId) {
      const fetchCourseUnits = async () => {
        try {
          const response = await fetch(`https://c-i-u-backend.onrender.com/exam-paper/courses/${examData.courseId}/units`);
          if (!response.ok) {
            throw new Error("Failed to fetch course units");
          }
          const data = await response.json();
          setCourseUnits(data.courseUnits || []);
        } catch (err) {
          console.error("Error fetching course units:", err);
          handleSnackbar("Error fetching course units: " + err.message, 'error');
          setCourseUnits([]);
        }
      };
      fetchCourseUnits();
    } else {
      setCourseUnits([]);
    }
  }, [examData.courseId]);

  const handleSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "scheduledDate") {
      const selectedDateTime = moment(value);
      const now = moment();
      const minimumAllowedTime = now.add(24, 'hours');

      if (selectedDateTime.isBefore(minimumAllowedTime)) {
        handleSnackbar('Scheduled date and time must be at least 24 hours from the current time.', 'error');
        return;
      }

      const extractedTime = selectedDateTime.format("HH:mm:ss");

      setExamData(prevData => {
        const newData = {
          ...prevData,
          scheduledDate: value,
          startTime: extractedTime,
        };

        if (prevData.duration) {
          const [hours, minutes] = prevData.duration.split(':').map(Number);
          const durationMinutes = (hours * 60) + minutes;
          const endTime = moment(selectedDateTime).add(durationMinutes, 'minutes').format("HH:mm:ss");
          newData.endTime = endTime;
        }

        return newData;
      });
    }
    else if (name === "duration") {
      let cleaned = value.replace(/[^\d:]/g, '');

      if (cleaned.includes(':')) {
        let [hours, minutes] = cleaned.split(':');
        hours = hours || '';

        if (minutes !== undefined) {
          if (minutes.length > 0) {
            const minutesNum = parseInt(minutes);
            if (!isNaN(minutesNum) && minutesNum > 59) {
              minutes = '59';
            }
          }
          minutes = minutes.slice(0, 2);
        } else {
          minutes = '';
        }

        cleaned = hours + (cleaned.includes(':') ? ':' : '') + minutes;
      } else {
        if (cleaned.length > 2) {
          const hours = cleaned.slice(0, cleaned.length - 2);
          const minutes = cleaned.slice(-2);
          cleaned = `${hours}:${minutes}`;
        }
      }

      setExamData(prevData => {
        const newData = {
          ...prevData,
          duration: cleaned
        };

        if (prevData.scheduledDate && cleaned.includes(':')) {
          const [hours, minutes] = cleaned.split(':').map(num => parseInt(num) || 0);
          const durationMinutes = (hours * 60) + minutes;
          const startDateTime = moment(prevData.scheduledDate);
          const endTime = moment(startDateTime).add(durationMinutes, 'minutes').format("HH:mm:ss");
          newData.endTime = endTime;
        }

        return newData;
      });
    } else if (name === "courseUnit") {
      const selectedUnit = courseUnits.find((unit) => unit.unitName === value);
      setExamData(prevData => ({
        ...prevData,
        [name]: value,
        courseUnitCode: selectedUnit ? selectedUnit.unitCode : ""
      }));
    } else {
      setExamData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleFileUpload = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedDateTime = moment(examData.scheduledDate);
    const now = moment();
    const minimumAllowedTime = now.add(24, 'hours');

    if (selectedDateTime.isBefore(minimumAllowedTime)) {
      handleSnackbar('Exam must be scheduled at least 24 hours in advance', 'error');
      return;
    }

    const formData = new FormData();
    formData.append("file", csvFile);

    const formattedScheduledDate = moment(examData.scheduledDate).format("YYYY-MM-DD HH:mm:ss");
    const formattedStartTime = moment(examData.startTime, "HH:mm:ss").format("HH:mm:ss");
    const formattedEndTime = moment(examData.endTime, "HH:mm:ss").format("HH:mm:ss");

    const submissionData = {
      ...examData,
      scheduledDate: formattedScheduledDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      duration: examData.duration,
      isDraft: Boolean(examData.isDraft)
    };

    Object.keys(submissionData).forEach((key) => {
      formData.append(key, submissionData[key]);
    });

    try {
      const response = await fetch("https://c-i-u-backend.onrender.com/exam-paper/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to upload exam paper");
      const data = await response.json();
      handleSnackbar('Exam paper uploaded successfully!', 'success');
      onClose();
      navigate("/schedule-upload-exams/exam-list", {
        state: { examData: data },
      });
    } catch (error) {
      handleSnackbar('Error uploading exam paper: ' + error.message, 'error');
    }
  };

  return (
    <div className={uploadExam.formWrapper_uploadExam}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{
            backgroundColor: snackbarSeverity === 'error' ? '#FFF4E5' : '#FFF4E5',
            color: '#000',
            display: 'flex',
            alignItems: 'center'
          }}
          icon={snackbarSeverity === 'error' ? <WarningAmberIcon /> : undefined}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <div className={uploadExam.formHeader}>
        <h2 className={uploadExam.heading_uploadExam}>Upload Exam</h2>
        <IconButton onClick={onClose} size="small" aria-label="close">
          <CloseIcon />
        </IconButton>
      </div>
      <form className={uploadExam.form_uploadExam} onSubmit={handleSubmit}>
        <div className={uploadExam.formGroup_uploadExam}>
          <label className={uploadExam.label_uploadExam}>Exam Title</label>
          <input
            type="text"
            name="title"
            className={uploadExam.formControl_uploadExam}
            value={examData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={uploadExam.formGroup_uploadExam}>
          <label className={uploadExam.label_uploadExam}>Instructions</label>
          <textarea
            name="description"
            className={uploadExam.formControl_uploadExam}
            value={examData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className={uploadExam.formGroup_uploadExam}>
          <label className={uploadExam.label_uploadExam}>Select Course</label>
          <select
            name="courseId"
            className={uploadExam.formControl_uploadExam}
            value={examData.courseId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.courseName}
              </option>
            ))}
          </select>
        </div>
        <div className={uploadExam.formGroup_uploadExam}>
          <label className={uploadExam.label_uploadExam}>Course Unit</label>
          <select
            name="courseUnit"
            className={uploadExam.formControl_uploadExam}
            value={examData.courseUnit}
            onChange={handleInputChange}
            required
            disabled={!examData.courseId}
          >
            <option value="">Select a course unit</option>
            {courseUnits.map((unit) => (
              <option key={unit.id} value={unit.unitName}>
                {unit.unitName}
              </option>
            ))}
          </select>
        </div>
        <div className={uploadExam.formGroup_uploadExam}>
          <label className={uploadExam.label_uploadExam}>Course Unit Code</label>
          <input
            type="text"
            name="courseUnitCode"
            className={uploadExam.formControl_uploadExam}
            value={examData.courseUnitCode}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={uploadExam.formGroup_uploadExam}>
          <label className={uploadExam.label_uploadExam}>Scheduled Date & Time</label>
          <input
            type="datetime-local"
            name="scheduledDate"
            className={uploadExam.formControl_uploadExam}
            value={examData.scheduledDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={uploadExam.formGroup_uploadExam}>
          <label className={uploadExam.label_uploadExam}>Duration (HH:mm)</label>
          <input
            type="text"
            name="duration"
            className={uploadExam.formControl_uploadExam}
            value={examData.duration}
            onChange={handleInputChange}
            placeholder="HH:MM"
            required
          />
          <small className={uploadExam.formText_uploadExam}>
            Format: hours:minutes (e.g., 02:30 for 2 hours and 30 minutes)
          </small>
        </div>
        <div className={uploadExam.formGroup_uploadExam}>
          <label className={uploadExam.label_uploadExam}>Start Time</label>
          <input
            type="time"
            name="startTime"
            className={uploadExam.formControl_uploadExam}
            value={examData.startTime}
            readOnly
          />
        </div>
        <div className={uploadExam.formGroup_uploadExam}>
          <label className={uploadExam.label_uploadExam}>End Time</label>
          <input
            type="time"
            name="endTime"
            className={uploadExam.formControl_uploadExam}
            value={examData.endTime}
            readOnly
          />
        </div>
        <div className={uploadExam.formGroup_uploadExam}>
          <label className={uploadExam.label_uploadExam}>Upload CSV File</label>
          <input
            type="file"
            className={uploadExam.formControl_uploadExam}
            accept=".csv"
            onChange={handleFileUpload}
            required
          />
        </div>
        <button type="submit" className={uploadExam.btnPrimary_uploadExam}>
          Upload Exam Paper
        </button>
      </form>
    </div>
  );
}