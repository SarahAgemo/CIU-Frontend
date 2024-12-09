// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import Button from "@mui/material/Button";
// import styles from "./UsersContent.module.css";

// function Table(props) {
//   return (
//     <table className={`${styles.table} shadow-lg table-hover`}>
//       {props.children}
//     </table>
//   );
// }

// function TableHead({ cols }) {
//   const printCols = cols.map((colName, index) => (
//     <th scope="col" key={index}>
//       {colName}
//     </th>
//   ));
//   return (
//     <thead>
//       <tr>{printCols}</tr>
//     </thead>
//   );
// }

// function TableBody({ children }) {
//   return <tbody>{children}</tbody>;
// }

// function UserList({ users, deleteUser }) {
//   const cols = ["#", "First Name", "Last Name", "Email", "Role", "Actions"];
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredUsers, setFilteredUsers] = useState(users);

//   const [isDialogOpen, setDialogOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);

//   useEffect(() => {
//     const filtered = users.filter((user) =>
//       Object.values(user)
//         .join(" ")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     );
//     setFilteredUsers(filtered);
//   }, [searchTerm, users]);

//   const handleDeleteClick = (user) => {
//     setSelectedUser(user);
//     setDialogOpen(true);
//   };

//   const confirmDelete = () => {
//     if (selectedUser) {
//       deleteUser(selectedUser.id);
//     }
//     setDialogOpen(false);
//   };

//   const searchContainerStyles = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "20px 0",
//     gap: "0px",
//   };

//   const searchButtonStyles = {
//     backgroundColor: "#0F533D",
//     color: "white",
//     padding: "12px 24px",
//     border: "none",
//     cursor: "pointer",
//     minWidth: "200px",
//     fontSize: "16px",
//     marginLeft: "500px",
//   };

//   const searchInputStyles = {
//     padding: "12px 16px",
//     border: "1px solid #ddd",
//     borderRadius: "2px",
//     fontSize: "16px",
//     width: "300px",
//     color: "#666",
//   };

//   const userList = filteredUsers.map((user, index) => (
//     <tr key={user.id}>
//       <th scope="row">{index + 1}</th>
//       <td>{user.first_name}</td>
//       <td>{user.last_name}</td>
//       <td>{user.email}</td>
//       <td>{user.role}</td>
//       <td>
//         <span
//           onClick={() => navigate(`/edit/${user.id}`)}
//           type="button"
//           className={styles["btn-secondary"]}
//         >
//           <FaEdit className="icon-edit" />
//         </span>

//         <span
//           onClick={() => handleDeleteClick(user)}
//           type="button"
//           className={styles["btn-danger"]}
//         >
//           <FaTrash className="icon-trash" />
//         </span>
//       </td>
//     </tr>
//   ));

//   return (
//     <div>
//       {/* MUI Dialog for delete confirmation */}
//       <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           Are you sure you want to delete this Lecturer Account
//           ? This action cannot be undone.
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDialogOpen(false)}>
//             Cancel
//           </Button>
//           <Button onClick={confirmDelete} color="error" variant="contained">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <div style={searchContainerStyles}>
//         <button style={searchButtonStyles} onClick={() => navigate("/registers")}>
//           Add New Lecturer
//         </button>
//         <input
//           type="text"
//           placeholder="Search users..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={searchInputStyles}
//         />
//       </div>
//       <h2 style={{ marginRight: "800px" }}>Lecturers</h2>

//       <Table>
//         <TableHead cols={cols} />
//         <TableBody>{userList}</TableBody>
//       </Table>
//     </div>
//   );
// }

// export default function UsersContent() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetch("https://c-i-u-backend.onrender.com/lecturerReg")
//       .then((response) => response.json())
//       .then((data) => setUsers(data))
//       .catch((error) => console.error("Error fetching users:", error));
//   }, []);

//   const deleteUser = (id) => {
//     fetch(`https://c-i-u-backend.onrender.com/lecturerReg/${id}`, {
//       method: "DELETE",
//     })
//       .then((response) => {
//         if (response.ok) {
//           setUsers(users.filter((user) => user.id !== id));
//         } else {
//           console.error("Failed to delete user");
//         }
//       })
//       .catch((error) => console.error("Error deleting user:", error));
//   };

//   return (
//     <div className={styles["table-container"]}>
//       <div className="row justify-content-center pt-5">
//         <UserList users={users} deleteUser={deleteUser} />
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
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
import EditLecturer from "./EditLecturer";
import AdminLecturerRegistration from "../../pages/admin/Admin-LecturerRegistration";
import used from './UsersContent.module.css'

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
      <Table className={used["admins-table"]}>
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
                  className={used["admin-icon-button"]}
                >
                  <FaUserEdit className={used["admin-list-icon"]} size={30} />
                </button>
                <button
                  onClick={() => handleDeleteClick(user)}
                  type="button"
                  className={used["admin-icon-button"]}
                >
                  <MdDelete className={used["admin-delete-icon"]} size={30} />
                </button>
              </td>
            </tr>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDeleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this Lecturer Account? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function Users() {
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
      const response = await fetch("https://c-i-u-backend.onrender.com/lecturerReg");
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
      const response = await fetch(`https://c-i-u-backend.onrender.com/lecturerReg/${id}`, {
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
    <div className={used["admins-list-overall"]}>
      <div className={`${used["layout-container"]} ${isMobileMenuOpen ? used["menu-open"] : ""}`}>
        <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
        <div className={used["main-content"]}>
          {!isMobile && <Sidebar />}
          {isMobile && (
            <>
              <div
                className={`${used["overlay"]} ${isMobileMenuOpen ? used["active"] : ""}`}
                onClick={toggleMobileMenu}
              ></div>
              <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
            </>
          )}
          <div className={`${used.mainContentWrapper} ${isMobileMenuOpen ? used.dimmed : ''}`}>
            <div className={used["admin-actions-row"]}>
              <h2 className={used["admins-heading"]}>List of Lecturers</h2>
              <div>
                <button
                  onClick={handleOpenRegisterModal}
                  type="button"
                  className={used["admin-custom-button"]}
                >
                  Add New Lecturer
                </button>
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className={used["admin-search-input"]}
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
        <div className={used["modal-overlay"]}>
          <div className={used["modal-content"]}>
            <EditLecturer
              id={editingUserId}
              onClose={handleCloseEditModal}
              onUpdate={handleUpdateUser}
            />
          </div>
        </div>
      )}

      {isRegisterModalOpen && (
        <div className={used["modal-overlay"]}>
          <div className={used["modal-content"]}>
            <AdminLecturerRegistration
              onClose={handleCloseRegisterModal}
              onRegister={handleRegisterUser}
              initialRole="lecturer"
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

export default Users;

