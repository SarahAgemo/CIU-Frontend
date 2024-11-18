import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import uploadExam from "./UploadExamContent.module.css"; // Import the updated CSS module
import moment from "moment"; // Import moment for date/time formatting
import Header from "../../components/lecturer/HeaderPop";
import Sidebar from "../../components/lecturer/SideBarPop";
import MobileMenu from "../../components/lecturer/MobileMenu";
import Dash from "../../components/lecturer/LecturerDashboard.module.css";
import BackButton from "../../components/lecturer/BackButton";

export default function ScheduleUploadExams() {
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
    isDraft: false, // Ensure isDraft is a boolean
  });

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

  // Fetch course units when a course is selected

  useEffect(() => {
    if (examData.courseId) {
      const fetchCourseUnits = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/exam-paper/courses/${examData.courseId}/units`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch course units");
          }
          const data = await response.json();
          console.log("Received course units:", data); // Debug log

          // Ensure we're setting an array, even if empty
          setCourseUnits(data.courseUnits || []);
        } catch (err) {
          console.error("Error fetching course units:", err);
          setError("Error fetching course units: " + err.message);
          setCourseUnits([]); // Reset to empty array on error
        }
      };
      fetchCourseUnits();
    } else {
      setCourseUnits([]); // Reset when no course is selected
    }
  }, [examData.courseId]);




  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    if (name === "scheduledDate") {
      const selectedDateTime = moment(value);
      const now = moment();
      const minimumAllowedTime = now.add(24, 'hours');
      
      if (selectedDateTime.isBefore(minimumAllowedTime)) {
        setValidationError("Exam must be scheduled at least 24 hours in advance");
        return; // Don't update the state if validation fails
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
          const endTime = moment(dateTime).add(durationMinutes, 'minutes').format("HH:mm:ss");
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
    } else if (name === "courseUnit") {
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

  const [csvFile, setCsvFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamData({ ...examData, [name]: value });
  };

  const handleFileUpload = (e) => {
    setCsvFile(e.target.files[0]);
  };

  // const formatTime = (time) => {
  //   const [hours, minutes] = time.split(":");
  //   return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:00`;
  // };

   const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");


    const selectedDateTime = moment(examData.scheduledDate);
    const now = moment();
    const minimumAllowedTime = now.add(24, 'hours');

    if (selectedDateTime.isBefore(minimumAllowedTime)) {
      setError("Exam must be scheduled at least 24 hours in advance");
      return;
    }
    const formData = new FormData();
    formData.append("file", csvFile);

    // Format dates and times for submission
    const formattedScheduledDate = moment(examData.scheduledDate).format("YYYY-MM-DD HH:mm:ss");
    const formattedStartTime = moment(examData.startTime, "HH:mm:ss").format("HH:mm:ss");
    const formattedEndTime = moment(examData.endTime, "HH:mm:ss").format("HH:mm:ss");

    // Create submission data with the original duration format (HH:MM)
    const submissionData = {
      ...examData,
      scheduledDate: formattedScheduledDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      // Keep the duration in HH:MM format instead of converting to minutes
      duration: examData.duration,
      isDraft: Boolean(examData.isDraft)
    };

    // Append all data to FormData
    Object.keys(submissionData).forEach((key) => {
      formData.append(key, submissionData[key]);
    });
    try {
      const response = await fetch("http://localhost:3000/exam-paper/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to upload exam paper");
      const data = await response.json();
      setSuccess("Exam paper uploaded successfully!");
      navigate("/schedule-upload-exams/exam-list", {
        state: { examData: data },
      });
    } catch (error) {
      setError("Error uploading exam paper: " + error.message);
    }
  };

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
            <BackButton
              targetPath="/lecturerdashboard"
              size={30}
              color="#106053"
            />
          </div>
          <div className={uploadExam["uploadExam-form-container"]}>
            <h2 className={uploadExam["uploadExam-form-title"]}>
              Upload Exams
            </h2>
            {error && (
              <div className={uploadExam["uploadExam-alert-danger"]}>
                {error}
              </div>
            )}
            {success && (
              <div className={uploadExam["uploadExam-alert-success"]}>
                {success}
              </div>
            )}
            <form
              className={uploadExam["uploadExam-form"]}
              onSubmit={handleSubmit}
            >
              <div className={uploadExam["uploadExam-form-group"]}>
                <label className={uploadExam["uploadExam-label"]}>
                  Exam Title
                </label>
                <input
                  type="text"
                  name="title"
                  className={uploadExam["uploadExam-form-control"]}
                  value={examData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={uploadExam["uploadExam-form-group"]}>
                <label className={uploadExam["uploadExam-label"]}>
                  Instructions
                </label>
                <textarea
                  name="description"
                  className={uploadExam["uploadExam-form-control"]}
                  value={examData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className={uploadExam["uploadExam-form-group"]}>
                <label className={uploadExam["uploadExam-label"]}>
                  Select Course
                </label>
                <select
                  name="courseId"
                  className={uploadExam["uploadExam-form-control"]}
                  value={examData.courseId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a course</option>
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.courseName}
                      </option>
                    ))
                  ) : (
                    <option disabled>No courses available</option>
                  )}
                </select>
              </div>

              <div className={uploadExam["uploadExam-form-group"]}>
                <label className={uploadExam["uploadExam-label"]}>
                  Course Unit
                </label>
                <select
                  name="courseUnit"
                  className={uploadExam["uploadExam-form-control"]}
                  value={examData.courseUnit}
                  onChange={handleInputChange}
                  required
                  disabled={!examData.courseId}
                >
                  <option value="">Select a course unit</option>
                  {Array.isArray(courseUnits) && courseUnits.length > 0 ? (
                    courseUnits.map((unit) => (
                      <option key={unit.id} value={unit.unitName}>
                        {unit.unitName}
                      </option>
                    ))
                  ) : (
                    <option disabled>No course units available</option>
                  )}
                </select>
              </div>

              <div className={uploadExam["uploadExam-form-group"]}>
                <label className={uploadExam["uploadExam-label"]}>
                  Course Unit Code
                </label>
                <input
                  type="text"
                  name="courseUnitCode"
                  className={uploadExam["uploadExam-form-control"]}
                  value={examData.courseUnitCode}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={uploadExam["uploadExam-form-group"]}>
          <label className={uploadExam["uploadExam-label"]}>
            Scheduled Date & Time
          </label>
          <input
            type="datetime-local"
            name="scheduledDate"
            className={uploadExam["uploadExam-form-control"]}
            value={examData.scheduledDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={uploadExam["uploadExam-form-group"]}>
      <label className={uploadExam["uploadExam-label"]}>
        Duration (HH:mm)
      </label>
      <input
        type="text"
        name="duration"
        className={uploadExam["uploadExam-form-control"]}
        value={examData.duration}
        onChange={handleInputChange}
        placeholder="HH:MM"
        
        required
      />
      <small className={uploadExam["uploadExam-form-text"]}>
        Format: hours:minutes (e.g., 02:30 for 2 hours and 30 minutes)
      </small>
    </div>
        <div className={uploadExam["uploadExam-form-group"]}>
          <label className={uploadExam["uploadExam-label"]}>
            Start Time
          </label>
          <input
            type="time"
            name="startTime"
            className={uploadExam["uploadExam-form-control"]}
            value={examData.startTime}
            readOnly
          />
        </div>

        <div className={uploadExam["uploadExam-form-group"]}>
          <label className={uploadExam["uploadExam-label"]}>
            End Time
          </label>
          <input
            type="time"
            name="endTime"
            className={uploadExam["uploadExam-form-control"]}
            value={examData.endTime}
            readOnly
          />
        </div>

              <div className={uploadExam["uploadExam-form-group"]}>
                <label className={uploadExam["uploadExam-label"]}>
                  Created By
                </label>
                <input
                  type="text"
                  name="createdBy"
                  className={uploadExam["uploadExam-form-control"]}
                  value={examData.createdBy}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={uploadExam["uploadExam-form-group"]}>
                <label className={uploadExam["uploadExam-label"]}>
                  Upload CSV File
                </label>
                <input
                  type="file"
                  className={uploadExam["uploadExam-form-control"]}
                  accept=".csv"
                  onChange={handleFileUpload}
                  required
                />
              </div>

              <button
                type="submit"
                className={uploadExam["uploadExam-btn-primary"]}
              >
                Upload Exam Paper
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

