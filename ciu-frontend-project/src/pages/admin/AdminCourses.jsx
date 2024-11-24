import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/admin/Headerpop";
import Sidebar from "../../components/admin/SideBarpop";
import MobileMenu from "../../components/admin/MobileMenu";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  Alert,
  Snackbar
} from '@mui/material';
import CourseRegistration from '../lecturer/CourseRegistrationModal';
import "../../components/admin/AdminList.css";

function Table({ children }) {
  return (
    <table className="table shadow-lg table-hover">{children}</table>
  );
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

function UserList({ users, deleteUser, searchTerm, onEdit }) {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id);
    }
    setDeleteDialogOpen(false);
  };

  const filteredUsers = users.filter((user) =>
    `${user.facultyName} ${user.courseName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cols = ["#", "Faculty Name", "Course Name", "Course Units", "Course Unit Code", "Actions"];

  return (
    <>
      <Table>
        <TableHead cols={cols} />
        <TableBody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id}>
              <th scope="row">{index + 1}</th>
              <td>{user.facultyName}</td>
              <td>{user.courseName}</td>
              <td>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {Array.isArray(user.courseUnits) ? (
                    user.courseUnits.map((unit, i) => (
                      <li
                        key={i}
                        style={{
                          position: "relative",
                          paddingLeft: "16px",
                          margin: "4px 0",
                          lineHeight: "1.4",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: "0",
                            marginRight: "8px",
                            display: "inline-block",
                            width: "12px",
                          }}
                        >
                          •
                        </span>
                        <span style={{ marginLeft: "12px" }}>{unit}</span>
                      </li>
                    ))
                  ) : (
                    <li
                      style={{
                        position: "relative",
                        paddingLeft: "16px",
                        margin: "4px 0",
                        lineHeight: "1.4",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: "0",
                          marginRight: "8px",
                          display: "inline-block",
                          width: "12px",
                        }}
                      >
                        •
                      </span>
                      <span style={{ marginLeft: "12px" }}>
                        {user.courseUnits}
                      </span>
                    </li>
                  )}
                </ul>
              </td>
              <td>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {Array.isArray(user.courseUnitCode) ? (
                    user.courseUnitCode.map((code, i) => (
                      <li
                        key={i}
                        style={{
                          position: "relative",
                          paddingLeft: "16px",
                          margin: "4px 0",
                          lineHeight: "1.4",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: "0",
                            marginRight: "8px",
                            display: "inline-block",
                            width: "12px",
                          }}
                        >
                          •
                        </span>
                        <span style={{ marginLeft: "12px" }}>{code}</span>
                      </li>
                    ))
                  ) : (
                    <li
                      style={{
                        position: "relative",
                        paddingLeft: "16px",
                        margin: "4px 0",
                        lineHeight: "1.4",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: "0",
                          marginRight: "8px",
                          display: "inline-block",
                          width: "12px",
                        }}
                      >
                        •
                      </span>
                      <span style={{ marginLeft: "12px" }}>
                        {user.courseUnitCode}
                      </span>
                    </li>
                  )}
                </ul>
              </td>
              <td>
                <button
                  onClick={() => onEdit(user)}
                  type="button"
                  className="admin-icon-button"
                >
                  <FaEdit className="admin-list-icon" size={20} />
                </button>
                <button
                  onClick={() => handleDeleteClick(user)}
                  type="button"
                  className="admin-icon-button"
                >
                  <MdDelete className="admin-delete-icon" size={20} />
                </button>
              </td>
            </tr>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDeleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this course? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function AdminCourses() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [alertInfo, setAlertInfo] = useState({ open: false, message: '', severity: 'error' });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/coursesAdd");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setAlertInfo({ open: true, message: `Error fetching courses: ${error.message}`, severity: 'error' });
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/coursesAdd/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
        setAlertInfo({ open: true, message: 'Course deleted successfully', severity: 'success' });
      } else {
        throw new Error("Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      setAlertInfo({ open: true, message: `Error deleting course: ${error.message}`, severity: 'error' });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOpenModal = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleCourseSubmit = async (courseData) => {
    try {
      let response;
      if (editingCourse) {
        // Update existing course
        response = await fetch(`http://localhost:3000/coursesAdd/${editingCourse.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(courseData),
        });
      } else {
        // Add new course
        response = await fetch('http://localhost:3000/coursesAdd', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(courseData),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to save course');
      }

      // Refresh the course list
      await fetchUsers();
      handleCloseModal();
      setAlertInfo({ open: true, message: `Course ${editingCourse ? 'updated' : 'added'} successfully`, severity: 'success' });
    } catch (error) {
      console.error('Error saving course:', error);
      setAlertInfo({ open: true, message: `Error saving course: ${error.message}`, severity: 'error' });
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertInfo({ ...alertInfo, open: false });
  };

  return (
    <div className="admins-list-overal1">
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
          <div className="users-content">
            <div className="admin-actions-row">
              <h2 className="admins-heading">Lists of Courses</h2>
              <div>
                <button
                  onClick={handleOpenModal}
                  type="button"
                  className="admin-custom-button"
                >
                  Add Course
                </button>
                <input
                  type="text"
                  placeholder="Search by course..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="admin-search-input"
                />
              </div>
            </div>
            <UserList 
              users={users} 
              deleteUser={deleteUser} 
              searchTerm={searchTerm}
              onEdit={handleEditCourse}
            />
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onClose={handleCloseModal} >
        <DialogContent>
          <CourseRegistration
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleCourseSubmit}
            initialData={editingCourse}
          />
        </DialogContent>
      </Dialog>

      <Snackbar open={alertInfo.open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertInfo.severity} sx={{ width: '100%' }}>
          {alertInfo.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AdminCourses;