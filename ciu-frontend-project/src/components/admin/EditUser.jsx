import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Updated to use useNavigate
import './Users.css';

function EditUser() {
    const { id } = useParams(); // Get user ID from URL
    const navigate = useNavigate(); // Hook for navigation
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        password: '',
    });

    useEffect(() => {
        // Fetch the user data from the backend using their ID
        fetch(`http://localhost:3000/lecturerReg/${id}`) // Get user by ID
            .then((response) => response.json())
            .then((data) => setFormData(data))
            .catch((error) => console.error('Error fetching user:', error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update user on the backend
        fetch(`http://localhost:3000/lecturerReg/${id}`, {
            method: 'PATCH', // Updating user by ID
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) {
                    navigate('/users'); // Redirect to user list after update
                } else {
                    throw new Error('Failed to update user');
                }
            })
            .catch((error) => console.error('Error updating user:', error));
    };

    return (
        <div className="container mt-5">
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        className="form-control"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        className="form-control"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <input
                        type="text"
                        name="role"
                        className="form-control"
                        value={formData.role}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
}

export default EditUser;
