import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for edit and delete
import Header from "../../components/admin/Headerpop";
import Sidebar from "../../components/admin/SideBarpop";
import MobileMenu from "../../components/admin/MobileMenu";
import Dash from "../../components/lecturer/LecturerDashboard.module.css";
import course from "./Courses.module.css";
// At the top of your Courses.jsx file
import AdminDash from '../../pages/admin/Dashboard'; // Adjust the path based on your file structure

// Table component
function Table({ children }) {
  return (
    <table className={course["table shadow-lg table-hover"]}>{children}</table>
  );
}

// TableHead component
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

// TableBody component
function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

// UserList component
function UserList({ users, deleteUser }) {
  const navigate = useNavigate();
  const cols = [
    "#",
    "Faculty Name",
    "Course Name",
    "Course Units",
    "Course Unit Code",
    "Actions",
  ];

  return (
    <div>
      <h3>Courses</h3>
      <Table>
        <TableHead cols={cols} />
        <TableBody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <th scope="row">{index + 1}</th>
              <td>{user.facultyName}</td>
              <td>{user.courseName}</td>
              
              {/* Render Course Units */}
              <td>
                <ul>
                  {Array.isArray(user.courseUnits) ? (
                    user.courseUnits.map((unit, i) => <li key={i}>{unit}</li>)
                  ) : (
                    <li>{user.courseUnits}</li>
                  )}
                </ul>
              </td>

              {/* Render Course Unit Codes */}
              <td>
                <ul>
                  {Array.isArray(user.courseUnitCode) ? (
                    user.courseUnitCode.map((code, i) => (
                      <li key={i}>{code}</li>
                    ))
                  ) : (
                    <li>{user.courseUnitCode}</li>
                  )}
                </ul>
              </td>

              <td>
                {/* Edit Button with Icon */}
                <span
                  onClick={() => navigate(`/editcourse/${user.id}`)}
                  type="button"
                  className="atim"
                >
                  <FaEdit className="icon-edit" />
                </span>

                {/* Delete Button with Icon */}
                <span
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this course?"
                      )
                    ) {
                      deleteUser(user.id);
                    }
                  }}
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

// Main Courses component
function AdminCourses() {
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
  const [users, setUsers] = useState([]);

  // Fetch users on mount
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

  // Function to delete a user
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
            {" "}
            {/* Content for the Users page */}
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
