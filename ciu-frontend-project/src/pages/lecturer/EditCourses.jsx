import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./EditCourse.module.css";
import Header from "../../components/admin/Headerpop";
import Sidebar from "../../components/admin/SideBarpop";
import MobileMenu from "../../components/admin/MobileMenu";
import Dash from "../../components/lecturer/LecturerDashboard.module.css";
// import BackButton from "../../components/lecturer/BackButton";

function EditCourse() {
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
  const [formData, setFormData] = useState({
    facultyName: "",
    courseName: "",
    courseUnits: "",
    courseUnitCode: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3000/coursesAdd/${id}`)
      .then((response) => response.json())
      .then((data) => setFormData(data))
      .catch((error) => console.error("Error fetching course data:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/coursesAdd/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/admin-courses");
        } else {
          throw new Error("Failed to update course");
        }
      })
      .catch((error) => console.error("Error updating course:", error));
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
              <div className={styles.usersContent}>
                <div className={styles.container}>
                  <h2>Edit Course</h2>
                  <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                      <label>Faculty Name</label>
                      <input
                        type="text"
                        name="facultyName"
                        className={styles.formControl}
                        value={formData.facultyName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Course Name</label>
                      <input
                        type="text"
                        name="courseName"
                        className={styles.formControl}
                        value={formData.courseName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Course Units</label>
                      <input
                        type="text"
                        name="courseUnits"
                        className={styles.formControl}
                        value={formData.courseUnits}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Course Unit Code</label>
                      <input
                        type="text"
                        name="courseUnitCode"
                        className={styles.formControl}
                        value={formData.courseUnitCode}
                        onChange={handleChange}
                      />
                    </div>
                    <button type="submit" className={styles.btn}>
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
     
  );
}

export default EditCourse;
