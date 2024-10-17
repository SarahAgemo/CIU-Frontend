
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // Updated to use useNavigate
// import './Users.css';

// // Table component
// function Table(props) {
//     return <table className='table shadow-lg table-hover'>{props.children}</table>;
// }

// // TableHead component
// function TableHead({ cols }) {
//     const printCols = cols.map((colName, index) => (
//         <th scope="col" key={index}>
//             {colName}
//         </th>
//     ));
//     return (
//         <thead>
//             <tr>{printCols}</tr>
//         </thead>
//     );
// }

// // TableBody component
// function TableBody({ children }) {
//     return <tbody>{children}</tbody>;
// }

// // UserList component
// function UserList({ users, deleteUser }) {
//     const cols = ["#", "First Name", "Last Name", "Email", "Role", "Actions"];
//     const navigate = useNavigate(); // Hook for navigation

//     const userList = users.map((user, index) => (
//         <tr key={user.id}>
//             <th scope="row">{index + 1}</th>
//             <td>{user.first_name}</td>
//             <td>{user.last_name}</td>
//             <td>{user.email}</td>
//             <td>{user.role}</td>
//             <td>
//                 <button
//                     onClick={() => navigate(`/edit/${user.id}`)} // Redirect to edit page
//                     type="button"
//                     className="btn btn-secondary"
//                 >
//                     Edit
//                 </button>
//                 <button
//                     onClick={() => {
//                         if (window.confirm('Are you sure you want to delete this user?')) {
//                             deleteUser(user.id);
//                         }
//                     }}
//                     type="button"
//                     className="btn btn-danger"
//                 >
//                     Delete
//                 </button>
//             </td>
//         </tr>
//     ));

//     return (
//         <div>
//             <Table>
//                 <TableHead cols={cols} />
//                 <TableBody>{userList}</TableBody>
//             </Table>
//         </div>
//     );
// }

// // Main Users component
// function Users() {
//     const [users, setUsers] = useState([]);

//     // Fetch users from the backend
//     useEffect(() => {
//         fetch('http://localhost:3000/lecturerReg') // Fetching the list of users (lecturers)
//             .then((response) => response.json())
//             .then((data) => setUsers(data))
//             .catch((error) => console.error('Error fetching users:', error));
//     }, []);

//     // Function to delete a user
//     const deleteUser = (id) => {
//         fetch(`http://localhost:3000/lecturerReg/${id}`, {
//             method: 'DELETE', // Deleting the user by ID
//         })
//             .then((response) => {
//                 if (response.ok) {
//                     // Update state to remove deleted user
//                     setUsers(users.filter((user) => user.id !== id));
//                 } else {
//                     console.error('Failed to delete user');
//                 }
//             })
//             .catch((error) => console.error('Error deleting user:', error));
//     };

//     return (
//         <div className='row justify-content-center pt-5'>
//             <UserList users={users} deleteUser={deleteUser} />
//         </div>
//     );
// }

// export default Users;


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
                    onClick={() => navigate(`/edit/${user.id}`)}
                    type="button"
                    className="btn btn-secondary"
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

// Main Users component
function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/lecturerReg')
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    const deleteUser = (id) => {
        fetch(`http://localhost:3000/lecturerReg/${id}`, {
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
                        <UserList users={users} deleteUser={deleteUser} />
                    </div>
                </div>
            </div> 
        </div>
    );
}

export default Users;
