import React, { useState, useEffect } from 'react';
import Header from "../../components/lecturer/HeaderPop";
import Sidebar from "../../components/lecturer/SideBarPop";
import MobileMenu from "../../components/lecturer/MobileMenu";
import Dash from '../../components/lecturer/LecturerDashboard.module.css';
import course from './LectCourses.module.css';

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
function UserList({ users }) {
    const cols = ['#', 'Faculty Name', 'Course Name', 'Course Units', 'Course Unit Code'];

    return (
        <Table>
            <TableHead cols={cols} />
            <TableBody>
                {users.map((user, index) => (
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
    );
}

// Main CoursesViewOnlyPage component
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

// Export the component
export default LectCourses;
