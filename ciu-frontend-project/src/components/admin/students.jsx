import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/admin/Headerpop";
import Sidebar from "../../components/admin/SideBarpop";
import MobileMenu from "../../components/admin/MobileMenu";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./students.css";

// Table component
function Table(props) {
  return (
    <table className="table shadow-lg table-hover">{props.children}</table>
  );
}

// TableHead component
function TableHead({ cols }) {
  const printCols = cols.map((colName, index) => (
    <th scope="col" key={index}>
      {colName}
    </th>
  ));
  return (
    <thead>
      <tr>{printCols}</tr>
    </thead>
  );
}

// TableBody component
function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

// StudentList component
function StudentList({ students, deleteStudent }) {
  const cols = ["#", "First Name", "Last Name", "Email", "Program", "Actions"];
  const navigate = useNavigate();

  const studentList = students.map((student, index) => (
    <tr key={student.id}>
      <th scope="row">{index + 1}</th>
      <td>{student.first_name}</td>
      <td>{student.last_name}</td>
      <td>{student.email}</td>

      <td>{student.program}</td>
      <td>
        <button
          onClick={() => navigate(`/edit-student/${student.id}`)} // Redirect to edit page
          type="button"
          className="students-icon-button"
        >
          <FaUserEdit className="student-list-icon" size={30} />
        </button>
        <button
          onClick={() => {
            if (
              window.confirm("Are you sure you want to delete this student?")
            ) {
              deleteStudent(student.id);
            }
          }}
          type="button"
          className="students-icon-button"
        >
          <MdDelete className="student-list-icon" size={30} />
        </button>
      </td>
    </tr>
  ));

  return (
    <Table className="students-table">
      <TableHead cols={cols} />
      <TableBody>{studentList}</TableBody>
    </Table>
  );
}

// Main Students component
function Students() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term
  const navigate = useNavigate(); // Use navigate to redirect

  useEffect(() => {
    // Fetch initial list of students
    fetchStudents();
  }, []);

  // Fetch students from the API
  const fetchStudents = async (name = "") => {
    const response = await fetch(
      `http://localhost:3000/faqs/search?name=${name}`
    );
    const data = await response.json();
    setStudents(data);
  };

  // Delete a student
  const deleteStudent = (id) => {
    fetch(`http://localhost:3000/students/${id}`, {
      method: "DELETE", // Deleting the student by ID
    })
      .then((response) => {
        if (response.ok) {
          // Update state to remove deleted student
          setStudents(students.filter((student) => student.id !== id));
        } else {
          console.error("Failed to delete student");
        }
      })
      .catch((error) => console.error("Error deleting student:", error));
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchStudents(value); // Fetch students based on search input
  };

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

  return (
    <div className="over">
      <div className="layout-container">
        <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
        <div className="main-content">
          {!isMobile && <Sidebar />}
          {isMobile && (
            <MobileMenu
              isOpen={isMobileMenuOpen}
              toggleMenu={toggleMobileMenu}
            />
          )}
          <div className="students-content">
            <div className="actions-row">
              <h2 className="student-heading">List of Students</h2>
              <div>
                <button
                  onClick={() => navigate("/register")}
                  type="button"
                  className="custom-button"
                >
                  Add New Student
                </button>
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-input"
                />
              </div>
            </div>
            <StudentList students={students} deleteStudent={deleteStudent} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Students;
