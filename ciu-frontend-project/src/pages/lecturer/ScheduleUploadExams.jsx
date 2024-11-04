import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import uploadExam from "./UploadExamContent.module.css"; // Import the updated CSS module
import moment from "moment"; // Import moment for date/time formatting
import Header from "../../components/lecturer/HeaderPop";
import Sidebar from "../../components/lecturer/SideBarPop";
import MobileMenu from "../../components/lecturer/MobileMenu";
import Dash from "../../components/lecturer/LecturerDashboard.module.css";

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

  // Handle input change for dropdowns
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setExamData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Automatically update course unit code when course unit changes
    if (name === "courseUnit") {
      const selectedUnit = courseUnits.find((unit) => unit.unitName === value);
      if (selectedUnit) {
        setExamData((prevData) => ({
          ...prevData,
          courseUnitCode: selectedUnit.unitCode, // Assuming `unitCode` is part of the unit object
        }));
      }
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

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:00`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("file", csvFile);

    // Convert `isDraft` to Boolean if necessary
    examData.isDraft = examData.isDraft === "true" || examData.isDraft === true;

    // Append exam data to formData

    Object.keys(examData).forEach((key) => {
      let value = examData[key];
      if (key === "startTime" || key === "endTime") {
        // Format start and end times as HH:mm:ss
        value = moment(value, "HH:mm").format("HH:mm:ss");
      }
      if (key === "scheduledDate") {
        // Format scheduledDate as YYYY-MM-DD HH:mm:ss
        value = moment(value).format("YYYY-MM-DD HH:mm:ss");
      }
      formData.append(key, value);
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

  // return (
  //     <div className={uploadExam["form-container"]}>
  //         <h2 className={uploadExam["form-title"]}>Schedule Upload Exams</h2>
  //         {error && <div className="alert alert-danger">{error}</div>}
  //         {success && <div className="alert alert-success">{success}</div>}
  //         <form onSubmit={handleSubmit}>
  //             {/* Exam Title, Description */}
  //             <div className={uploadExam["form-group"]}>
  //                 <label>Exam Title</label>
  //                 <input
  //                     type="text"
  //                     name="title"
  //                     className={uploadExam["form-control"]}
  //                     value={examData.title}
  //                     onChange={handleChange}
  //                     required
  //                 />
  //             </div>
  //             <div className={uploadExam["form-group"]}>
  //                 <label>Instructions</label>
  //                 <textarea
  //                     name="description"
  //                     className={uploadExam["form-control"]}
  //                     value={examData.description}
  //                     onChange={handleChange}
  //                     required
  //                 ></textarea>
  //             </div>

  //            {/* Course Selection Dropdown */}
  //            <div className={uploadExam["form-group"]}>
  //                 <label>Select Course</label>
  //                 <select
  //                     name="courseId"
  //                     className={uploadExam["form-control"]}
  //                     value={examData.courseId}
  //                     onChange={handleInputChange}
  //                     required
  //                 >
  //                     <option value="">Select a course</option>
  //                     {courses.length > 0 ? (
  //                         courses.map((course) => (
  //                             <option key={course.id} value={course.id}>
  //                                 {course.courseName}
  //                             </option>
  //                         ))
  //                     ) : (
  //                         <option disabled>No courses available</option>
  //                     )}
  //                 </select>
  //             </div>

  //           {/* Course Unit Dropdown */}

  // <div className={uploadExam["form-group"]}>
  //     <label>Course Unit</label>
  //     <select
  //         name="courseUnit"
  //         className={uploadExam["form-control"]}
  //         value={examData.courseUnit}
  //         onChange={handleInputChange}
  //         required
  //         disabled={!examData.courseId}
  //     >
  //         <option value="">Select a course unit</option>
  //         {Array.isArray(courseUnits) && courseUnits.length > 0 ? (
  //             courseUnits.map((unit) => (
  //                 <option key={unit.id} value={unit.unitName}>
  //                     {unit.unitName}
  //                 </option>
  //             ))
  //         ) : (
  //             <option disabled>No course units available</option>
  //         )}
  //     </select>
  // </div>

  //             <div className={uploadExam["form-group"]}>
  //                 <label>Course Unit Code</label>
  //                 <input
  //                     type="text"
  //                     name="courseUnitCode"
  //                     className={uploadExam["form-control"]}
  //                     value={examData.courseUnitCode}
  //                     onChange={handleChange}
  //                     required
  //                 />
  //             </div>

  //             {/* Exam Date, Duration, Start Time, End Time */}
  //             <div className={uploadExam["form-group"]}>
  //                 <label>Scheduled Date</label>
  //                 <input
  //                     type="datetime-local" // Use datetime-local for date and time input
  //                     name="scheduledDate"
  //                     className={uploadExam["form-control"]}
  //                     value={moment(examData.scheduledDate).format('YYYY-MM-DDTHH:mm')}
  //                     onChange={handleChange}
  //                     required
  //                 />
  //             </div>
  //             <div className={uploadExam["form-group"]}>
  //                 <label>Duration (minutes)</label>
  //                 <input
  //                     type="number"
  //                     name="duration"
  //                     className={uploadExam["form-control"]}
  //                     value={examData.duration}
  //                     onChange={handleChange}
  //                     required
  //                 />
  //             </div>
  //             <div className={uploadExam["form-group"]}>
  //                 <label>Start Time</label>
  //                 <input
  //                     type="time"
  //                     name="startTime"
  //                     className={uploadExam["form-control"]}
  //                     value={examData.startTime}
  //                     onChange={handleChange}
  //                     required
  //                 />
  //             </div>
  //             <div className={uploadExam["form-group"]}>
  //                 <label>End Time</label>
  //                 <input
  //                     type="time"
  //                     name="endTime"
  //                     className={uploadExam["form-control"]}
  //                     value={examData.endTime}
  //                     onChange={handleChange}
  //                     required
  //                 />
  //             </div>

  //             {/* Created By */}
  //             <div className={uploadExam["form-group"]}>
  //                 <label>Created By</label>
  //                 <input
  //                     type="text"
  //                     name="createdBy"
  //                     className={uploadExam["form-control"]}
  //                     value={examData.createdBy}
  //                     onChange={handleChange}
  //                     required
  //                 />
  //             </div>

  //             {/* File Upload */}
  //             <div className={uploadExam["form-group"]}>
  //                 <label>Upload CSV File</label>
  //                 <input
  //                     type="file"
  //                     className={uploadExam["form-control"]}
  //                     accept=".csv"
  //                     onChange={handleFileUpload}
  //                     required
  //                 />
  //             </div>

  //             <button type="submit" className={uploadExam["btn-primary"]}>
  //                 Upload Exam Paper
  //             </button>
  //         </form>
  //     </div>
  // );

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

          <div className={uploadExam["uploadExam-form-container"]}>
            <h2 className={uploadExam["uploadExam-form-title"]}>
              Schedule Upload Exams
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
            <form className={uploadExam["uploadExam-form"]} onSubmit={handleSubmit}>
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
                  Scheduled Date
                </label>
                <input
                  type="datetime-local"
                  name="scheduledDate"
                  className={uploadExam["uploadExam-form-control"]}
                  value={moment(examData.scheduledDate).format(
                    "YYYY-MM-DDTHH:mm"
                  )}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={uploadExam["uploadExam-form-group"]}>
                <label className={uploadExam["uploadExam-label"]}>
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  name="duration"
                  className={uploadExam["uploadExam-form-control"]}
                  value={examData.duration}
                  onChange={handleChange}
                  required
                />
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
                  onChange={handleChange}
                  required
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
                  onChange={handleChange}
                  required
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

//  export default ScheduleUploadExam;
