import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Headerpop";
import Sidebar from "./SideBarpop";
import MobileMenu from "./MobileMenu";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert
} from "@mui/material";
import EditAdmin from "./Editadmin";
import AdminLecturerRegistration from "../../pages/admin/Admin-LecturerRegistration";
import admin from "./AdminList.module.css";

function Table(props) {
  return (
    <table className="table shadow-lg table-hover">{props.children}</table>
  );
}

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

function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

function UserList({ users, deleteUser, searchTerm, onEdit }) {
  const cols = ["#", "First Name", "Last Name", "Email", "Role", "Actions"];
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
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Table className={admin["admins-table"]}>
        <TableHead cols={cols} />
        <TableBody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id}>
              <th scope="row">{index + 1}</th>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  onClick={() => onEdit(user.id)}
                  type="button"
                  className={admin["admin-icon-button"]}
                >
                  <FaUserEdit className={admin["admin-list-icon"]} size={30} />
                </button>
                <button
                  onClick={() => handleDeleteClick(user)}
                  type="button"
                  className={admin["admin-icon-button"]}
                >
                  <MdDelete className={admin["admin-delete-icon"]} size={30} />
                </button>
              </td>
            </tr>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDeleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this Admin Account? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function Adminuser() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [alertInfo, setAlertInfo] = useState({ open: false, message: '', severity: 'success' });

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
      const response = await fetch("https://c-i-u-backend.onrender.com/adminReg");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setAlertInfo({ open: true, message: `Error fetching users: ${error.message}`, severity: 'error' });
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`https://c-i-u-backend.onrender.com/adminReg/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
        setAlertInfo({ open: true, message: 'User deleted successfully', severity: 'success' });
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setAlertInfo({ open: true, message: `Error deleting user: ${error.message}`, severity: 'error' });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditUser = (id) => {
    setEditingUserId(id);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingUserId(null);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    handleCloseEditModal();
    setAlertInfo({ open: true, message: 'User updated successfully', severity: 'success' });
  };

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleRegisterUser = async (newUser) => {
    setUsers(prevUsers => {
      // Check if the new user already exists in the list
      const existingUserIndex = prevUsers.findIndex(user => user.id === newUser.id);

      if (existingUserIndex !== -1) {
        // If the user exists, update their information
        const updatedUsers = [...prevUsers];
        updatedUsers[existingUserIndex] = newUser;
        return updatedUsers;
      } else {
        // If the user doesn't exist, add them to the list
        return [...prevUsers, newUser];
      }
    });

    handleCloseRegisterModal();
    setAlertInfo({ open: true, message: 'User registered successfully', severity: 'success' });

    // Reload the users list after a short delay
    setTimeout(() => {
      fetchUsers();
    }, 500);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertInfo({ ...alertInfo, open: false });
  };

  return (
    <div className={admin["admins-list-overall"]}>
      <div className={`${admin["layout-container"]} ${isMobileMenuOpen ? admin["menu-open"] : ""}`}>
        <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
        <div className={["main-content"]}>
          {!isMobile && <Sidebar />}
          {isMobile && (
            <>
              <div
                className={`${admin["overlay"]} ${isMobileMenuOpen ? admin["active"] : ""}`}
                onClick={toggleMobileMenu}
              ></div>
              <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
            </>
          )}
          <div className={`${admin.mainContentWrapper} ${isMobileMenuOpen ? admin.dimmed : ''}`}>
            <div className={admin["admin-actions-row"]}>
              <h2 className={admin["admins-heading"]}>List of Admin</h2>
              <div>
                <button
                  onClick={handleOpenRegisterModal}
                  type="button"
                  className={admin["admin-custom-button"]}
                >
                  Add New Admin
                </button>
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className={admin["admin-search-input"]}
                />
              </div>
            </div>
            <UserList
              users={users}
              deleteUser={deleteUser}
              searchTerm={searchTerm}
              onEdit={handleEditUser}
            />
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <div className={admin["modal-overlay"]}>
          <div className={admin["modal-content"]}>
            <EditAdmin
              id={editingUserId}
              onClose={handleCloseEditModal}
              onUpdate={handleUpdateUser}
            />
          </div>
        </div>
      )}

      {isRegisterModalOpen && (
        <div className={admin["modal-overlay"]}>
          <div className={admin["modal-content"]}>
            <AdminLecturerRegistration
              onClose={handleCloseRegisterModal}
              onRegister={handleRegisterUser}
              initialRole="administrator"
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

export default Adminuser;

