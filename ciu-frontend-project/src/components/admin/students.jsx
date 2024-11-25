import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/admin/Headerpop";
import Sidebar from "../../components/admin/SideBarpop";
import MobileMenu from "../../components/admin/MobileMenu";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditStudent from "./EditStudent";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Snackbar,
  Alert
} from "@mui/material";
import "./students.css";

function Table(props) {
  return <table className="table shadow-lg table-hover">{props.children}</table>;
}

function TableHead({ cols }) {
  return (
    <thead>
      <tr>
        {cols.map((colName, index) => (
          <th scope="col" key={index}>
            {colName}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

function StudentList({ students, deleteStudent, onEdit }) {
  const cols = ["#", "First Name", "Last Name", "Email", "Program", "Actions"];
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedStudent) {
      deleteStudent(selectedStudent.id);
    }
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <Table className="students-table">
        <TableHead cols={cols} />
        <TableBody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <th scope="row">{index + 1}</th>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.email}</td>
              <td>{student.program}</td>
              <td>
                <button
                  onClick={() => onEdit(student.id)}
                  type="button"
                  className="students-icon-button"
                >
                  <FaUserEdit className="student-list-icon" size={30} />
                </button>
                <button
                  onClick={() => handleDeleteClick(student)}
                  type="button"
                  className="students-icon-button"
                >
                  <MdDelete className="student-delete-icon" size={30} />
                </button>
              </td>
            </tr>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDeleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this Student Account? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function Students() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [alertInfo, setAlertInfo] = useState({ open: false, message: '', severity: 'success' });
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

  const fetchStudents = async (name = "") => {
    try {
      const response = await fetch(
        `http://localhost:3000/faqs/search?name=${name}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      setAlertInfo({ open: true, message: error.message, severity: 'error' });
    }
  };

  const deleteStudent = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/students/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setStudents(students.filter((student) => student.id !== id));
        setAlertInfo({ open: true, message: 'Student deleted successfully.', severity: 'success' });
      } else {
        throw new Error('Failed to delete student');
      }
    } catch (error) {
      setAlertInfo({ open: true, message: error.message, severity: 'error' });
    }
  };

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

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertInfo({ ...alertInfo, open: false });
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

      <Snackbar open={alertInfo.open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertInfo.severity} sx={{ width: '100%' }}>
          {alertInfo.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Students;