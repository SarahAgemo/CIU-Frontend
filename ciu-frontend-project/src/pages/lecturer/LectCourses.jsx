import React, { useState, useEffect } from 'react';
import Header from "../../components/lecturer/HeaderPop";
import Sidebar from "../../components/lecturer/SideBarPop";
import MobileMenu from "../../components/lecturer/MobileMenu";
import Dash from '../../components/lecturer/LecturerDashboard.module.css';
import course from './LectCourses.module.css';

// Table component remains unchanged
function Table({ children }) {
    return <table className={course["table shadow-lg table-hover"]}>{children}</table>;
}

// TableHead component remains unchanged
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

// TableBody component remains unchanged
function TableBody({ children }) {
    return <tbody>{children}</tbody>;
}

// Modified UserList component with inline styles
function UserList({ users }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState(users);

    useEffect(() => {
        const filtered = users.filter((user) =>
            user.courseName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchTerm, users]);

    const cols = ['#', 'Faculty Name', 'Course Name', 'Course Units', 'Course Unit Code'];

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

    return (
        <div>
            <div style={searchContainerStyles}>
                <button 
                    style={searchButtonStyles}
                    onClick={() => navigate('/lect-courses')}
                >
                    Search Courses
                </button>
                <input
                    type="text"
                    placeholder="Search by course name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={searchInputStyles}
                />
            </div>

            <Table>
                <TableHead cols={cols} />
                <TableBody>
                    {filteredUsers.map((user, index) => (
                        <tr key={user.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.facultyName}</td>
                            <td>{user.courseName}</td>
                            <td>
                                <ul>
                                    {Array.isArray(user.courseUnits) ? (
                                        user.courseUnits.map((unit, i) => (
                                            <li key={i}>{unit}</li>
                                        ))
                                    ) : (
                                        <li>{user.courseUnits}</li>
                                    )}
                                </ul>
                            </td>
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
                        </tr>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

// Main LectCourses component remains unchanged
function LectCourses() {
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
                    <div className={course["users-content"]}>
                        <div className={course["row justify-content-center pt-5"]}>
                            <UserList users={users} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LectCourses;