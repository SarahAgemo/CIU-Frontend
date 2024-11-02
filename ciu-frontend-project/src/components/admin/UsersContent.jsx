
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons for edit and delete
// import './UsersContent.module.css';

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
//     const navigate = useNavigate();

//     const userList = users.map((user, index) => (
//         <tr key={user.id}>
//             <th scope="row">{index + 1}</th>
//             <td>{user.first_name}</td>
//             <td>{user.last_name}</td>
//             <td>{user.email}</td>
//             <td>{user.role}</td>
//             <td>
//                 {/* Edit Button with Smaller Icon */}
//                 <button
//                     onClick={() => navigate(`/edit/${user.id}`)}
//                     type="button"
//                     className="btn btn-secondary me-1"
//                     style={{ padding: '4px 8px', width:'fit-content' }} // Inline padding for compact size
//                 >
//                     <FaEdit style={{ height: '1em', width: '1em' }} /> {/* Smaller icon size */}
//                 </button>

//                 {/* Delete Button with Smaller Icon */}
//                 <button
//                     onClick={() => {
//                         if (window.confirm('Are you sure you want to delete this user?')) {
//                             deleteUser(user.id);
//                         }
//                     }}
//                     type="button"
//                     className="btn btn-danger"
//                     style={{ padding: '4px 6px', width: 'fit-content' }} // Inline padding for compact size
//                 >
//                     <FaTrash style={{ height: '1em', width: '1em' }} /> {/* Smaller icon size */}
//                 </button>
//             </td>
//         </tr>
//     ));

//     return (
//         <Table>
//             <TableHead cols={cols} />
//             <TableBody>{userList}</TableBody>
//         </Table>
//     );
// }

// export default function UsersContent() {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         fetch('http://localhost:3000/lecturerReg')
//             .then((response) => response.json())
//             .then((data) => setUsers(data))
//             .catch((error) => console.error('Error fetching users:', error));
//     }, []);

//     const deleteUser = (id) => {
//         fetch(`http://localhost:3000/lecturerReg/${id}`, {
//             method: 'DELETE',
//         })
//             .then((response) => {
//                 if (response.ok) {
//                     setUsers(users.filter((user) => user.id !== id));
//                 } else {
//                     console.error('Failed to delete user');
//                 }
//             })
//             .catch((error) => console.error('Error deleting user:', error));
//     };

//     return (
//         <div className='users-content'>
//             <div className='row justify-content-center pt-5'>
//                 <UserList users={users} deleteUser={deleteUser} />
//             </div>
//         </div>
//     );
// }


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from './UsersContent.module.css';  // Importing modular CSS

function Table(props) {
    return <table className={`${styles.table} shadow-lg table-hover`}>{props.children}</table>;
}

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

function TableBody({ children }) {
    return <tbody>{children}</tbody>;
}

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
                    className={styles["btn-secondary"]}
                >
                    <FaEdit />
                </button>

                <button
                    onClick={() => {
                        if (window.confirm('Are you sure you want to delete this user?')) {
                            deleteUser(user.id);
                        }
                    }}
                    type="button"
                    className={styles["btn-danger"]}
                >
                    <FaTrash />
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

export default function UsersContent() {
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
        <div className={styles["table-container"]}>
            <div className="row justify-content-center pt-5">
                <UserList users={users} deleteUser={deleteUser} />
            </div>
        </div>
    );
}
