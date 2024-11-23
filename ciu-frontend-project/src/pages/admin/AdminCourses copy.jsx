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
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton,
  TextField
} from '@mui/material';
import CourseRegistration from '../lecturer/CourseRegistration copy';
import "./AdminCourses.css";

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

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Faculty Name</TableCell>
              <TableCell>Course Name</TableCell>
              <TableCell>Course Units</TableCell>
              <TableCell>Course Unit Code</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.facultyName}</TableCell>
                <TableCell>{user.courseName}</TableCell>
                <TableCell>
                  <ul>
                    {Array.isArray(user.courseUnits) 
                      ? user.courseUnits.map((unit, i) => <li key={i}>{unit}</li>)
                      : <li>{user.courseUnits}</li>
                    }
                  </ul>
                </TableCell>
                <TableCell>
                  <ul>
                    {Array.isArray(user.courseUnitCode) 
                      ? user.courseUnitCode.map((code, i) => <li key={i}>{code}</li>)
                      : <li>{user.courseUnitCode}</li>
                    }
                  </ul>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(user)} color="primary">
                    <FaEdit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(user)} color="error">
                    <MdDelete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/coursesAdd/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(`Error deleting user: ${error.message}`);
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

  const handleCourseSubmit = (newCourse) => {
    if (editingCourse) {
      setUsers(users.map(user => user.id === editingCourse.id ? newCourse : user));
    } else {
      setUsers([...users, newCourse]);
    }
    handleCloseModal();
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpenModal}
                  className="admin-custom-button"
                >
                  Add Course
                </Button>
                <TextField
                  placeholder="Search by course..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="admin-search-input"
                  variant="outlined"
                  size="small"
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

      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>{editingCourse ? 'Edit Course' : 'Add New Course'}</DialogTitle>
        <DialogContent>
          <CourseRegistration
            initialData={editingCourse}
            onSubmit={handleCourseSubmit}
            onCancel={handleCloseModal}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminCourses;