// Editadmin.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header1';
import Sidebar1 from './SideBar1';
import './users.css'; // Ensure you have corresponding CSS if needed

function Editadmin() {
    const { id } = useParams(); // Retrieve the ID from URL parameters
    const navigate = useNavigate(); // Hook for navigation after successful update

    // State to manage form data
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        
    });

    // State to manage loading and error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user data when component mounts or ID changes
    useEffect(() => {
        if (!id) {
            setError("No user ID provided in the URL.");
            setLoading(false);
            return;
        }

        const fetchUserData = async () => {
            try {
                console.log(`Fetching data for user ID: ${id}`);
                
                // Fetching from backend running on port 5000
                const response = await fetch(`http://localhost:3000/adminReg/${id}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch user data. Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Fetched user data:", data);

                // Ensure the data has the expected structure
                const { first_name, last_name, email, role } = data;

                setFormData({
                    first_name: first_name || '',
                    last_name: last_name || '',
                    email: email || '',
                    role: role || '',
                     // Typically, you don't pre-fill passwords for security reasons
                });

            } catch (err) {
                console.error("Error fetching user data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id]);

    // Handle input changes in the form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission to update user data
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting updated form data:", formData);

        try {
            // Updating via backend on port 5000
            const response = await fetch(`http://localhost:3000/adminReg/${id}`, {
                method: 'PATCH', // or 'PUT' depending on your backend
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update user.');
            }

            console.log("User updated successfully.");
            navigate('/adminuser'); // Redirect to the admin user list page

        } catch (err) {
            console.error("Error updating user:", err);
            setError(err.message);
        }
    };

    // Render loading state
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

    // Render error state
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

    // Render the edit form
    return (
        <div className="layout-container">
            <Header />  {/* Fixed Header */}
            <div className="main-content">
                <Sidebar1 />  {/* Fixed Sidebar */}
                <div className="users-content">  {/* Scrollable Content */}
                    <div className="container mt-5">
                        <h2>Edit Admin User</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="first_name">First Name</label>
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    className="form-control"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="last_name">Last Name</label>
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    className="form-control"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="role">Role</label>
                                <input
                                    type="text"
                                    id="role"
                                    name="role"
                                    className="form-control"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                           
                            <button type="submit" className="btn btn-secondary">
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Editadmin;
