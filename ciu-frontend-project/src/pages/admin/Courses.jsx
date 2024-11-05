// Courses.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons for edit and delete
import Header from "../../components/admin/Headerpop";
import Sidebar from "../../components/admin/SideBarpop";
import MobileMenu from "../../components/lecturer/MobileMenu";
import Dash from '../../components/admin/Dashboard.module.css';
import course from './Courses.module.css';

// Table component
function Table({ children }) {
    return <table className={course["table shadow-lg table-hover"]}>{children}</table>;
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
    const cols = ['#', 'Faculty Name', 'Course Name', 'Course Units', 'Course Unit Code', 'Actions'];

    return (
        <Table>
            <TableHead cols={cols} />
            <TableBody>
                {users.map((user, index) => (
                    <tr key={user.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.facultyName}</td>
                        <td>{user.courseName}</td>
                        <td>{user.courseUnits}</td>
                        <td>{user.courseUnitCode}</td>
                        <td>
                            {/* Edit Button with Icon */}
                            <button
                                onClick={() => navigate(`/editcourse/${user.id}`)}
                                type="button"
                                className={course["btn btn-secondary me-1"]}>
                                <FaEdit />
                            </button>

                            {/* Delete Button with Icon */}
                            <button
                                onClick={() => {
                                    if (window.confirm('Are you sure you want to delete this course?')) {
                                        deleteUser(user.id);
                                    }
                                }}
                                type="button"
                                className={course["btn btn-danger"]}
                            >
                                <FaTrash />
                            </button>
                        </td>
                    </tr>
                ))}
            </TableBody>
        </Table>
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
        fetch('http://localhost:3000/coursesAdd')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setUsers(data))
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    // Function to delete a user
    const deleteUser = (id) => {
        fetch(`http://localhost:3000/coursesAdd/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
                } else {
                    console.error('Failed to delete user');
                }
            })
            .catch((error) => console.error('Error deleting user:', error));
    };

    
    return (
        <div className={Dash.lecturerDashboard}>
            <div className={Dash.dashboard}>
                <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
                <div className={Dash["dashboard-content"]}>
                    {!isMobile && <Sidebar />}
                    {isMobile && (
                        <MobileMenu
                            isOpen={isMobileMenuOpen}
                            toggleMenu={toggleMobileMenu}
                        />
                    )}
                    <div className={course["users-content"]}> {/* Content for the Users page */}
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
