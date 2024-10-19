import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; 
import Sidebar1 from './SideBar1'; 
import './Users.css';

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
                    className="btn btn-secondary me-2"
                >
                    Edit
                </button>
                <button
                    onClick={() => {
                        if (window.confirm('Are you sure you want to delete this user?')) {
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

// Main Adminuser component
function Adminuser() {
    const navigate = useNavigate(); // Add useNavigate here
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/adminReg'); // Updated port
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/adminReg/${id}`, { // Updated port
                method: 'DELETE',
            });
            if (response.ok) {
                setUsers(users.filter((user) => user.id !== id));
            } else {
                throw new Error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert(`Error deleting user: ${error.message}`);
        }
    };

    if (loading) {
        return (
            <div className="layout-container">
                <Header />
                <div className="main-content">
                    <Sidebar1 />
                    <div className="users-content">
                        <div className="container mt-5">
                            <h2>Loading...</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="layout-container">
                <Header />
                <div className="main-content">
                    <Sidebar1 />
                    <div className="users-content">
                        <div className="container mt-5">
                            <h2>Error: {error}</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="layout-container">
            <Header />
            <div className="main-content">
                <Sidebar1 />
                <div className="users-content">
                    <div className='row justify-content-center pt-5'>
                        <h2 className="col">Lists of Admin</h2>
                        <button
                            onClick={() => navigate('/registers')} // Redirect to register page
                            type="button"
                            className="custom-button col-auto" // Use custom class for button
                            style={{ marginLeft: 'auto' }} // Ensures button is at the right
                        >
                            Add New Admin
                        </button>
                        <UserList users={users} deleteUser={deleteUser} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Adminuser;
