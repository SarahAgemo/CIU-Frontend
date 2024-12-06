import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import "./EditExamInterface.css";
import Header from "../../components/lecturer/HeaderPop";
import Sidebar from "../../components/lecturer/SideBarPop";
import MobileMenu from "../../components/lecturer/MobileMenu";
import Dash from '../../components/lecturer/LecturerDashboard.module.css';
import BackButton from "../../components/lecturer/BackButton";

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
    createdBy: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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
    
    if (name === "scheduledDate") {
      const selectedDateTime = moment(value);
      const now = moment();
      const minimumAllowedTime = now.add(24, 'hours');

      if (selectedDateTime.isBefore(minimumAllowedTime)) {
        setError('Scheduled date and time must be at least 24 hours from the current time.');
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
      // Remove any non-digit characters except colon
      let cleaned = value.replace(/[^\d:]/g, '');
      
      // Handle colon input
      if (cleaned.includes(':')) {
        let [hours, minutes] = cleaned.split(':');
        
        // Allow natural typing of hours (no padding)
        hours = hours || '';
        
        // Handle minutes
        if (minutes !== undefined) {
          // Ensure minutes don't exceed 59
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
        // If no colon, treat as either hours or minutes based on length
        if (cleaned.length > 2) {
          // Split into hours and minutes
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
  
        // Only update end time if we have valid hours and minutes
        if (prevData.scheduledDate && cleaned.includes(':')) {
          const [hours, minutes] = cleaned.split(':').map(num => parseInt(num) || 0);
          const durationMinutes = (hours * 60) + minutes;
          const startDateTime = moment(prevData.scheduledDate);
          const endTime = moment(startDateTime).add(durationMinutes, 'minutes').format("HH:mm:ss");
          newData.endTime = endTime;
        }
  
        return newData;
      });
    }
    else if (name === "courseUnit") {
      const selectedUnit = courseUnits.find((unit) => unit.unitName === value);
      setExamData(prevData => ({
        ...prevData,
        [name]: value,
        courseUnitCode: selectedUnit ? selectedUnit.unitCode : ""
      }));
    }
    else {
      setExamData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedDateTime = moment(examData.scheduledDate);
      const now = moment();
      const minimumAllowedTime = now.add(24, 'hours');

      if (selectedDateTime.isBefore(minimumAllowedTime)) {
        setError('Exam must be scheduled at least 24 hours in advance');
        return;
      }

      const formattedData = {
        ...examData,
        scheduledDate: moment(examData.scheduledDate).format("YYYY-MM-DD HH:mm:ss"),
        startTime: moment(examData.startTime, "HH:mm:ss").format("HH:mm:ss"),
        endTime: moment(examData.endTime, "HH:mm:ss").format("HH:mm:ss"),
        duration: examData.duration // Keep original duration format
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
          Duration (HH:mm)
        </label>
        <input
          type="text"
          name="duration"
          value={examData.duration}
          onChange={handleChange}
          placeholder="HH:MM"
          className="edit-exam-interface__form-control"
          required
        />
        <small className="edit-exam-interface__form-text">
          Format: hours:minutes (e.g., 02:30 for 2 hours and 30 minutes)
        </small>
      </div>

      <div className="edit-exam-interface__form-group">
        <label className="edit-exam-interface__label">
          Start Time
        </label>
        <input
          type="time"
          name="startTime"
          value={examData.startTime}
          className="edit-exam-interface__form-control"
          readOnly
        />
      </div>

      <div className="edit-exam-interface__form-group">
        <label className="edit-exam-interface__label">
          End Time
        </label>
        <input
          type="time"
          name="endTime"
          value={examData.endTime}
          className="edit-exam-interface__form-control"
          readOnly
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
