import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/admin/Headerpop";
import Sidebar from "../../components/admin/SideBarpop";
import MobileMenu from "../../components/admin/MobileMenu";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditStudent from "./EditStudent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import "./students.css";

// Table component
function Table(props) {
  return <table className="table shadow-lg table-hover">{props.children}</table>;
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
function StudentList({ students, deleteStudent, onEdit }) {
  const cols = ["#", "First Name", "Last Name", "Email", "Program", "Actions"];

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setDialogOpen(true); // Open the dialog
  };

  const confirmDelete = () => {
    if (selectedStudent) {
      deleteStudent(selectedStudent.id);
    }
    setDialogOpen(false); // Close the dialog after confirming
  };

  const studentList = students.map((student, index) => (
    <tr key={student.id}>
      <th scope="row">{index + 1}</th>
      <td>{student.first_name}</td>
      <td>{student.last_name}</td>
      <td>{student.email}</td>
      <td>{student.program}</td>
      <td>
        <button
          onClick={() => onEdit(student.id)}
          // onClick={() => navigate(`/edit-student/${student.id}`)}
          type="button"
          className="students-icon-button"
        >
          <FaUserEdit className="student-list-icon" size={30} />
        </button>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this student?")) {
              deleteStudent(student.id);
            }
          }}
          // onClick={() => handleDeleteClick(student)}
          type="button"
          className="students-icon-button"
        >
          <MdDelete className="student-delete-icon" size={30} />
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      {/* MUI Dialog for confirmation */}
      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this Student Account
          ? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Student Table */}
      <Table className="students-table">
        <TableHead cols={cols} />
        <TableBody>{studentList}</TableBody>
      </Table>
    </>
  );
}

// Main Students component
function Students() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
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
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setStudents(students.filter((student) => student.id !== id));
          alert("Student deleted successfully.");
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
    fetchStudents(value);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleEditStudent = (id) => {
    setEditingStudentId(id);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingStudentId(null);
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
            <StudentList 
              students={students} 
              deleteStudent={deleteStudent} 
              onEdit={handleEditStudent}
            />
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EditStudent 
              id={editingStudentId} 
              onClose={handleCloseEditModal}
              onUpdate={(updatedStudent) => {
                setStudents(students.map(student => 
                  student.id === updatedStudent.id ? updatedStudent : student
                ));
                handleCloseEditModal();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;
