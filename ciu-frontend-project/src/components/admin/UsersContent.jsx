import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import styles from "./UsersContent.module.css";

function Table(props) {
  return (
    <table className={`${styles.table} shadow-lg table-hover`}>
      {props.children}
    </table>
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

function UserList({ users, deleteUser }) {
  const cols = ["#", "First Name", "Last Name", "Email", "Role", "Actions"];
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    const filtered = users.filter((user) =>
      Object.values(user)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const searchContainerStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 0",
    gap: "0px"
  };

  const searchButtonStyles = {
    backgroundColor: "#0F533D",
    color: "white",
    padding: "12px 24px",
    border: "none",
    cursor: "pointer",
    minWidth: "200px",
    fontSize: "16px",
    marginLeft: "500px"
  };

  const searchInputStyles = {
    padding: "12px 16px",
    border: "1px solid #ddd",
    borderRadius: "2px",
    fontSize: "16px",
    width: "300px",
    color: "#666"
  };

  const userList = filteredUsers.map((user, index) => (
    <tr key={user.id}>
      <th scope="row">{index + 1}</th>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <span
          onClick={() => navigate(`/edit/${user.id}`)}
          type="button"
          className={styles["btn-secondary"]}
        >
          <FaEdit className="icon-edit" />
        </span>

        <span
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this user?')) {
              deleteUser(user.id);
            }
          }}
          type="button"
          className={styles["btn-danger"]}
        >
          <FaTrash className="icon-trash" />
        </span>
      </td>
    </tr>
  ));

  return (
    <div>
     
      <div style={searchContainerStyles}>
        <button 
          style={searchButtonStyles}
          onClick={() => navigate('/registers')}
        >
          Add New Lecturer
        </button>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyles}
        />
      </div>
      <h2 style={{ marginRight: "800px" }}>Lecturers</h2>

      <Table>
        <TableHead cols={cols} />
        <TableBody>{userList}</TableBody>
      </Table>
    </div>
  );
}

export default function UsersContent() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/lecturerReg")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const deleteUser = (id) => {
    fetch(`http://localhost:3000/lecturerReg/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setUsers(users.filter((user) => user.id !== id));
        } else {
          console.error("Failed to delete user");
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <div className={styles["table-container"]}>
      <div className="row justify-content-center pt-5">
        <UserList users={users} deleteUser={deleteUser} />
      </div>
    </div>
  );
}