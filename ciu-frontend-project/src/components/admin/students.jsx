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

// StudentList component
function StudentList({ students, deleteStudent }) {
    const cols = ["#", "First Name", "Last Name", "Email", "Role", "Program", "Actions"];
    const navigate = useNavigate();

    const studentList = students.map((student, index) => (
        <tr key={student.id}>
            <th scope="row">{index + 1}</th>
            <td>{student.first_name}</td>
            <td>{student.last_name}</td>
            <td>{student.email}</td>
            <td>{student.role}</td>
            <td>{student.program}</td>
            <td>
                <button
                    onClick={() => navigate(`/edit-student/${student.id}`)} // Redirect to edit page
                    type="button"
                    className="btn btn-secondary"
                >
                    Edit
                </button>
                <button
                    onClick={() => {
                        if (window.confirm('Are you sure you want to delete this student?')) {
                            deleteStudent(student.id);
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
            <TableBody>{studentList}</TableBody>
        </Table>
    );
}

// Main Students component
function Students() {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // New state for search term
    const navigate = useNavigate(); // Use navigate to redirect

    useEffect(() => {
        // Fetch initial list of students
        fetchStudents();
    }, []);

    // Fetch students from the API
    const fetchStudents = async (name = '') => {
        const response = await fetch(`http://localhost:3000/faqs/search?name=${name}`);
        const data = await response.json();
        setStudents(data);
    };

    // Delete a student
    const deleteStudent = (id) => {
        fetch(`http://localhost:3000/students/${id}`, {
            method: 'DELETE', // Deleting the student by ID
        })
            .then((response) => {
                if (response.ok) {
                    // Update state to remove deleted student
                    setStudents(students.filter((student) => student.id !== id));
                } else {
                    console.error('Failed to delete student');
                }
            })
            .catch((error) => console.error('Error deleting student:', error));
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        fetchStudents(value); // Fetch students based on search input
    };

    return (
        <div className="layout-container">
            <Header />
            <div className="main-content">
                <Sidebar1 />
                <div className="students-content">
                    <div className='row justify-content-between pt-5'>
                        <h2 className="col">Lists of Student</h2>
                        <button
                            onClick={() => navigate('/register')} // Redirect to register page
                            type="button"
                            className="custom-button col-auto" // Use custom class for button
                            style={{ marginLeft: 'auto' }} // Ensures button is at the right
                        >
                            Add New Student
                        </button>
                    </div>
                    <div className='row justify-content-center'>
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="form-control mb-3"
                        />
                        <StudentList students={students} deleteStudent={deleteStudent} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Students;
