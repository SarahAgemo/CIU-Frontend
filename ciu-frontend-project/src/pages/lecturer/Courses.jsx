import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from '../../components/lecturer/Header'; // Import the Header
import Sidebar1 from '../../components/lecturer/SideBarAddQuestion'; // Import the Sidebar
import './Courses.css';

// Table component
function Table({ children }) {
    return <table className="table shadow-lg table-hover">{children}</table>;
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
                        <button
    onClick={() => navigate(`/editcourse/${user.id}`)}
    type="button"
    className="btn btn-primary"
>
    {/* <i className="fas fa-edit"></i>  */}
    Edit
</button>
<button
    onClick={() => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            deleteUser(user.id);
        }
    }}
    type="button"
    className="btn btn-danger"
>
    {/* <i className="fas fa-trash"></i>  */}
    Delete
</button>

                        </td>
                    </tr>
                ))}
            </TableBody>
        </Table>
    );
}

// Main Courses component
function Courses() {
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
        <div className="layout-container">
            <Header /> {/* Render Header */}
            <div className="main-content">
                <Sidebar1 /> {/* Render Sidebar */}
                <div className="users-content"> {/* Content for the Users page */}
                    <div className="row justify-content-center pt-5">
                        <UserList users={users} deleteUser={deleteUser} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Courses;
