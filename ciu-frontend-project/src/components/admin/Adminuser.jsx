import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Headerpop";
import Sidebar from "./SideBarpop";
import MobileMenu from "./MobileMenu";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./Adminuser.css";

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
function UserList({ users, deleteUser }) {
  const cols = ["#", "First Name", "Last Name", "Email", "Role", "Actions"];
  const navigate = useNavigate();

  const userList = users.map((user, index) => (
    <tr key={user.id}>
      <th scope="row">{index + 1}</th>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <button
          onClick={() => navigate(`/editadmin/${user.id}`)} // Updated route path
          type="button"
          className="admin-icon-button"
        >
          <FaUserEdit className="admin-list-icon" size={30} />
        </button>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this user?")) {
              deleteUser(user.id);
            }
          }}
          type="button"
          className="admin-icon-button"
        >
          <MdDelete className="admin-list-icon" size={30} />
        </button>
      </td>
    </tr>
  ));

  return (
    <Table className="admins-table">
      <TableHead cols={cols} />
      <TableBody>{userList}</TableBody>
    </Table>
  );
}

// Main Adminuser component
function Adminuser() {
  const navigate = useNavigate(); // Add useNavigate here
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/adminReg"); // Updated port
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
      const response = await fetch(`http://localhost:3000/adminReg/${id}`, {
        // Updated port
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

  // if (loading) {
  //     return (
  //         <div className="layout-container">
  //             <Header />
  //             <div className="main-content">
  //                 <Sidebar1 />
  //                 <div className="users-content">
  //                     <div className="container mt-5">
  //                         <h2>Loading...</h2>
  //                     </div>
  //                 </div>
  //             </div>
  //         </div>
  //     );
  // }

  // if (error) {
  //     return (
  //         <div className="layout-container">
  //             <Header />
  //             <div className="main-content">
  //                 <Sidebar1 />
  //                 <div className="users-content">
  //                     <div className="container mt-5">
  //                         <h2>Error: {error}</h2>
  //                     </div>
  //                 </div>
  //             </div>
  //         </div>
  //     );
  // }

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
              <h2 className="admins-heading">Lists of Admin</h2>
              <div>
                <button
                  onClick={() => navigate("/registers")} // Redirect to register page
                  type="button"
                  className="admin-custom-button"
                >
                  Add New Admin
                </button>
                <input
                  type="text"
                  placeholder="Search by name..."
                  //   value={searchTerm}
                  //   onChange={handleSearchChange}
                  className="admin-search-input"
                />
              </div>
            </div>
            <UserList users={users} deleteUser={deleteUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminuser;
