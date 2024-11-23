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
//       <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           Are you sure you want to delete{" "}
//           <strong>
//             {selectedUser?.first_name} {selectedUser?.last_name}
//           </strong>
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
//     fetch("http://localhost:3000/lecturerReg")
//       .then((response) => response.json())
//       .then((data) => setUsers(data))
//       .catch((error) => console.error("Error fetching users:", error));
//   }, []);

//   const deleteUser = (id) => {
//     fetch(`http://localhost:3000/lecturerReg/${id}`, {
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
import { useNavigate } from "react-router-dom";
import Header from "./Headerpop";
import Sidebar from "./SideBarpop";
import MobileMenu from "./MobileMenu";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import "./AdminList.css";

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

// UserList component
function UserList({ users, deleteUser, searchTerm }) {
  const cols = ["#", "First Name", "Last Name", "Email", "Role", "Actions"];
  const navigate = useNavigate();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id);
    }
    setDialogOpen(false);
  };

  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const userList = filteredUsers.map((user, index) => (
    <tr key={user.id}>
      <th scope="row">{index + 1}</th>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <button
          onClick={() => navigate(`/editadmin/${user.id}`)}
          type="button"
          className="admin-icon-button"
        >
          <FaUserEdit className="admin-list-icon" size={30} />
        </button>
        <button
          onClick={() => handleDeleteClick(user)}
          type="button"
          className="admin-icon-button"
        >
          <MdDelete className="admin-delete-icon" size={30} />
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete{" "}
          <strong>
            {selectedUser?.first_name} {selectedUser?.last_name}
          </strong>
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

      <Table className="admins-table">
        <TableHead cols={cols} />
        <TableBody>{userList}</TableBody>
      </Table>
    </>
  );
}

// Main Adminuser component
function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/lecturerReg");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/lecturerReg/${id}`, {
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
              <h2 className="admins-heading">Lists of Lecturers</h2>
              <div>
                <button
                  onClick={() => navigate("/registers")}
                  type="button"
                  className="admin-custom-button"
                >
                  Add New Admin
                </button>
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="admin-search-input"
                />
              </div>
            </div>
            <UserList users={users} deleteUser={deleteUser} searchTerm={searchTerm} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;