import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/lecturer/Header'; // Import the Header
import Sidebar1 from '../../components/lecturer/SideBarAddQuestion'; // Import the Sidebar
import './Courses.css';

// Table component
function Table(props) {
    return <table className='table shadow-lg table-hover'>{props.children}</table>;
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
    const cols = ["#", "Faculty Name", "Course Name", "Course Units", "Course Unit Code", "Actions"];
    const navigate = useNavigate();

    const userList = users.map((user, index) => (
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
                    className="btn btn-secondary"
                >
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
                    Delete
                </button>
            </td>
        </tr>
    ));

    return (
        <Table>
            <TableHead cols={cols} />
            <TableBody>{userList}</TableBody>
        </Table>
    );
}

// Main Courses component
function Courses() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/coursesAdd')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data); 
                setUsers(data);
            })
            .catch((error) => console.error('Error fetching users:', error));
    }, []);
    
    const deleteUser = (id) => {
        fetch(`http://localhost:3000/coursesAdd/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    setUsers(users.filter((user) => user.id !== id));
                } else {
                    console.error('Failed to delete user');
                }
            })
            .catch((error) => console.error('Error deleting user:', error));
    };

    return (
        <div className="layout-container">  {/* New layout container */}
            <Header />  {/* Render Header */}
            <div className="main-content">  {/* Flex container for sidebar and content */}
                <Sidebar1 />  {/* Render Sidebar */} 
                <div className="users-content">  {/* Content for the Users page */}
                    <div className='row justify-content-center pt-5'>
                        <UserList users={users} deleteUser={deleteUser} /> {/* Fixed prop name */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Courses;
