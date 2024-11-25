import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Header from "../../components/admin/Headerpop";
import Sidebar from "../../components/admin/SideBarpop";
import MobileMenu from "../../components/admin/MobileMenu";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import course from "./AdminCourses.module.css";
import AdminDash from "./AdminDashboard";
import Dash from "../../components/lecturer/lecturerDashboard.module.css";

function Table({ children }) {
  return (
    <table className={course["table shadow-lg table-hover"]}>{children}</table>
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

function UserList({ users, deleteUser }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleDeleteClick = (course) => {
    setSelectedCourse(course);
    setDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCourse) {
      deleteUser(selectedCourse.id);
    }
    setDialogOpen(false);
  };

  const cols = [
    "#",
    "Faculty Name",
    "Course Name",
    "Course Units",
    "Course Unit Code",
    "Actions",
  ];

  const searchContainerStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 0",
    gap: "0px",
  };

  const searchButtonStyles = {
    backgroundColor: "#0F533D",
    color: "white",
    padding: "12px 24px",
    border: "none",
    cursor: "pointer",
    minWidth: "200px",
    fontSize: "16px",
    marginLeft: "500px",
  };

  const searchInputStyles = {
    padding: "12px 16px",
    border: "1px solid #ddd",
    borderRadius: "2px",
    fontSize: "16px",
    width: "300px",
    color: "#666",
  };

  return (
    <div>

      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the course{" "}
          <strong>{selectedCourse?.courseName}</strong>? This action cannot be undone.
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

      <div style={searchContainerStyles}>
        <button
          style={searchButtonStyles}
          onClick={() => navigate("/regCourse")}
        >
          Add New Course
        </button>
        <input
          type="text"
          placeholder="Search by course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyles}
        />
      </div>
      <h2 style={{ marginRight: "800px" }}>Courses</h2>
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
                <span
                  onClick={() => navigate(`/editcourse/${user.id}`)}
                  type="button"
                  className="atim"
                >
                  <FaEdit className="icon-edit" />
                </span>

                <span
                  onClick={() => handleDeleteClick(user)}
                  type="button"
                  className="course__btn course__btn--danger"
                >
                  <FaTrash className="icon-trash" />
                </span>
              </td>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}


function AdminCourses() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    fetch("http://localhost:3000/coursesAdd")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const deleteUser = (id) => {
    fetch(`http://localhost:3000/coursesAdd/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } else {
          console.error("Failed to delete user");
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <div className={Dash.lecturerDashboard}>
      <div className={Dash.dashboard}>
        <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
        <div className={Dash["dashboard-content"]}>
          {!isMobile && <Sidebar />}
          {isMobile && (
            <>
              <div 
                className={`${AdminDash["overlay"]} ${isMobileMenuOpen ? AdminDash["active"] : ""}`} 
                onClick={toggleMobileMenu}
              ></div>
              <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
            </>
          )}
          <div className={course["users-content"]}>
            <div className={course["row justify-content-center pt-5"]}>
              <UserList users={users} deleteUser={deleteUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCourses;
