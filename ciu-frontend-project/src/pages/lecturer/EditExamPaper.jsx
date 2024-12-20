import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function EditExamInterface({ id, onClose }) {
  const [courses, setCourses] = useState([]);
  const [courseUnits, setCourseUnits] = useState([]);
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
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("https://c-i-u-backend.onrender.com/exam-paper/courses");
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError("Error fetching courses: " + err.message);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    if (examData.courseId) {
      const fetchCourseUnits = async () => {
        try {
          const response = await fetch(`https://c-i-u-backend.onrender.com/exam-paper/courses/${examData.courseId}/units`);
          if (!response.ok) throw new Error("Failed to fetch course units");
          const data = await response.json();
          setCourseUnits(data.courseUnits || []);
        } catch (err) {
          console.error("Error fetching course units:", err);
          setError("Error fetching course units: " + err.message);
          setCourseUnits([]);
        }
      };
      fetchCourseUnits();
    }
  }, [examData.courseId]);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await fetch(`https://c-i-u-backend.onrender.com/exam-paper/${id}`);
        if (!response.ok) throw new Error("Failed to fetch exam paper");
        const data = await response.json();

        if (data.startTime) {
          data.startTime = moment(data.startTime).format("HH:mm");
        }
        if (data.endTime) {
          data.endTime = moment(data.endTime).format("HH:mm");
        }
        if (data.scheduledDate) {
          data.scheduledDate = moment(data.scheduledDate).format("YYYY-MM-DDTHH:mm");
        }

        setExamData(data);
      } catch (error) {
        setError("Error fetching exam paper: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "courseUnit") {
      const selectedUnit = courseUnits.find((unit) => unit.unitName === value);
      if (selectedUnit) {
        setExamData((prevData) => ({
          ...prevData,
          courseUnitCode: selectedUnit.unitCode,
        }));
      }
    }

    if (name === 'scheduledDate') {
      const selectedDateTime = moment(value);
      const currentTime = moment();

      if (selectedDateTime.isBefore(currentTime.add(24, 'hours'))) {
        //handleSnackbar('Scheduled date and time must be at least 24 hours from the current time.', 'error');
        return;
      }
      const startTime = selectedDateTime.format('HH:mm');
      setExamData((prevData) => ({
        ...prevData,
        startTime
      }));


      if (examData.duration) {
        const [durationHours, durationMinutes] = examData.duration.split(':').map(Number);
        const endTime = selectedDateTime
          .add(durationHours, 'hours')
          .add(durationMinutes, 'minutes')
          .format('HH:mm');
        setExamData((prevData) => ({
          ...prevData,
          endTime
        }));
      }
    } else if (name === 'duration' && examData.startTime) {
      const startTimeMoment = moment(examData.scheduledDate);
      const [durationHours, durationMinutes] = value.split(':').map(Number);
      const endTime = startTimeMoment
        .add(durationHours, 'hours')
        .add(durationMinutes, 'minutes')
        .format('HH:mm');
      setExamData((prevData) => ({
        ...prevData,
        endTime
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...examData,
        duration: examData.duration,
        scheduledDate: moment(examData.scheduledDate).format("YYYY-MM-DD HH:mm:ss"),
        startTime: moment(examData.startTime, "HH:mm").format("HH:mm:ss"),
        endTime: moment(examData.endTime, "HH:mm").format("HH:mm:ss"),
      };

      const response = await fetch(`https://c-i-u-backend.onrender.com/exam-paper/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) throw new Error("Failed to update exam paper");
      onClose();
    } catch (error) {
      setError("Error updating exam paper: " + error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Edit Exam Paper
        <IconButton
          aria-label="close"
          onClick={onClose}
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
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={examData.title}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={examData.description}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel>Select Course</InputLabel>
              <Select
                name="courseId"
                value={examData.courseId}
                onChange={handleChange}
                required
              >
                <MenuItem value="">Select a course</MenuItem>
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.courseName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Course Unit</InputLabel>
              <Select
                name="courseUnit"
                value={examData.courseUnit}
                onChange={handleChange}
                required
                disabled={!examData.courseId}
              >
                <MenuItem value="">Select a course unit</MenuItem>
                {Array.isArray(courseUnits) &&
                  courseUnits.map((unit) => (
                    <MenuItem key={unit.id} value={unit.unitName}>
                      {unit.unitName}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Course Unit Code"
              name="courseUnitCode"
              value={examData.courseUnitCode}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              type="datetime-local"
              label="Scheduled Date"
              name="scheduledDate"
              value={examData.scheduledDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              type="text"
              label="Duration (HH:MM)"
              name="duration"
              value={examData.duration}
              onChange={handleChange}
              placeholder="HH:MM"
              required
            />
            <Box display="flex" gap={2}>
              <TextField
                fullWidth
                type="time"
                label="Start Time"
                name="startTime"
                value={examData.startTime}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                fullWidth
                type="time"
                label="End Time"
                name="endTime"
                value={examData.endTime}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <TextField
              fullWidth
              label="Created By"
              name="createdBy"
              value={examData.createdBy}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#106053',
              '&:hover': {
                backgroundColor: '#0d4d42'
              }
            }}
          >
            Update Exam Paper
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}


export default EditExamInterface;

