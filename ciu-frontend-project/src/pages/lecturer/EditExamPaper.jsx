import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import "./EditExampaper.css";
import Header from "../../components/lecturer/HeaderPop";
import Sidebar from "../../components/lecturer/SideBarPop";
import MobileMenu from "../../components/lecturer/MobileMenu";
import Dash from '../../components/lecturer/LecturerDashboard.module.css';
import BackButton from "../../components/lecturer/BackButton";
import { Snackbar, Alert } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

function EditExamInterface() {
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');


  // Fetch courses when component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/exam-paper/courses"
        );
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError("Error fetching courses: " + err.message);
      }
    };
    fetchCourses();
  }, []);

  // Fetch course units when courseId changes
  useEffect(() => {
    if (examData.courseId) {
      const fetchCourseUnits = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/exam-paper/courses/${examData.courseId}/units`
          );
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

  // Fetch exam data
  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/exam-paper/${id}`);
        if (!response.ok) throw new Error("Failed to fetch exam paper");
        const data = await response.json();

        // Format the dates and times
        if (data.startTime) {
          data.startTime = moment(data.startTime).format("HH:mm");
        }
        if (data.endTime) {
          data.endTime = moment(data.endTime).format("HH:mm");
        }
        if (data.scheduledDate) {
          data.scheduledDate = moment(data.scheduledDate).format(
            "YYYY-MM-DDTHH:mm"
          );
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

    // Update course unit code when course unit changes
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
          handleSnackbar('Scheduled date and time must be at least 24 hours from the current time.', 'error');
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
                scheduledDate: moment(examData.scheduledDate).format('YYYY-MM-DD HH:mm:ss'),
                startTime: moment(examData.startTime, 'HH:mm').format('HH:mm:ss'),
                endTime: moment(examData.endTime, 'HH:mm:ss'),
      };

      const response = await fetch(`http://localhost:3000/exam-paper/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) throw new Error("Failed to update exam paper");
      navigate(`/exam-paper/${id}`);
    } catch (error) {
      setError("Error updating exam paper: " + error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  

  return (
    <div className={Dash.lecturerDashboard}>
                  <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{
                    width: '50%'
                }} 

            >
                <Alert onClose={() => setSnackbarOpen(false)} 
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
            <BackButton targetPath={`/exam-paper/${id}`} size={30} color="#106053" />
          </div>
          <div className="edit-exam-interface__container mt-5">
      <h3 className="edit-exam-interface__header">Edit Exam Paper</h3>
        <form onSubmit={handleSubmit}>
          <div className="edit-exam-interface__form-group">
            <label className="edit-exam-interface__label">Title</label>
            <input
              type="text"
              name="title"
              value={examData.title}
              onChange={handleChange}
              className="edit-exam-interface__form-control"
            />
          </div>

          <div className="edit-exam-interface__form-group">
            <label className="edit-exam-interface__label">Description</label>
            <textarea
              name="description"
              value={examData.description}
              onChange={handleChange}
              className="edit-exam-interface__form-control"
            ></textarea>
          </div>

          <div className="edit-exam-interface__form-group">
            <label className="edit-exam-interface__label">Select Course</label>
            <select
              name="courseId"
              className="edit-exam-interface__form-control"
              value={examData.courseId}
              onChange={handleChange}
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

          <div className="edit-exam-interface__form-group">
            <label className="edit-exam-interface__label">Course Unit</label>
            <select
              name="courseUnit"
              className="edit-exam-interface__form-control"
              value={examData.courseUnit}
              onChange={handleChange}
              required
              disabled={!examData.courseId}
            >
              <option value="">Select a course unit</option>
              {Array.isArray(courseUnits) &&
                courseUnits.map((unit) => (
                  <option key={unit.id} value={unit.unitName}>
                    {unit.unitName}
                  </option>
                ))}
            </select>
          </div>

          <div className="edit-exam-interface__form-group">
            <label className="edit-exam-interface__label">
              Course Unit Code
            </label>
            <input
              type="text"
              name="courseUnitCode"
              value={examData.courseUnitCode}
              onChange={handleChange}
              className="edit-exam-interface__form-control"
            />
          </div>

          <div className="edit-exam-interface__form-group">
            <label className="edit-exam-interface__label">Scheduled Date</label>
            <input
              type="datetime-local"
              name="scheduledDate"
              value={examData.scheduledDate}
              onChange={handleChange}
              className="edit-exam-interface__form-control"
            />
          </div>

          <div className="edit-exam-interface__form-group">
            <label className="edit-exam-interface__label">
              Duration (minutes)
            </label>
            <input
              type="text"
              name="duration"
              value={examData.duration}
              onChange={handleChange}
              className="edit-exam-interface__form-control"
              placeholder="HH:MM"
                         required
            />
          </div>

          <div className="edit-exam-interface__form-group">
            <label className="edit-exam-interface__label">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={examData.startTime}
              onChange={handleChange}
              className="edit-exam-interface__form-control"
            />
          </div>

          <div className="edit-exam-interface__form-group">
            <label className="edit-exam-interface__label">End Time</label>
            <input
              type="time"
              name="endTime"
              value={examData.endTime}
              onChange={handleChange}
              className="edit-exam-interface__form-control"
            />
          </div>

          <div className="edit-exam-interface__form-group">
            <label className="edit-exam-interface__label">Created By</label>
            <input
              type="text"
              name="createdBy"
              value={examData.createdBy}
              onChange={handleChange}
              className="edit-exam-interface__form-control"
            />
          </div>

          <button type="submit" className="edit-exam-interface__submit-button">
            Update Exam Paper
          </button>
        </form>
      </div>
        </div>
      </div>
    </div>
  );
}

export default EditExamInterface;
