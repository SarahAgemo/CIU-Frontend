
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/admin/Header1';
import Sidebar1 from '../../components/admin/SideBar1';

function EditCourse() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        facultyName: '',
        courseName: '',
        courseUnits: '',
        courseUnitCode: '',
    });

    useEffect(() => {
        fetch(`http://localhost:3000/coursesAdd/${id}`)
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
        fetch(`http://localhost:3000/coursesAdd/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) {
                    navigate('/users');
                } else {
                    throw new Error('Failed to update user');
                }
            })
            .catch((error) => console.error('Error updating user:', error));
    };

    return (
        <div className="layout-container">
            <Header />  {/* Render fixed Header */}
            <div className="main-content">
                <Sidebar1 />  {/* Render fixed Sidebar */}
                <div className="users-content">  {/* Scrollable content */}
                    <div className="container mt-5">
                        <h2>Edit Course</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Faculty Name</label>
                                <input
                                    type="text"
                                    name="first_name"
                                    className="form-control"
                                    value={formData.facultyName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Course Name</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    className="form-control"
                                    value={formData.courseName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Course Units</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.courseUnits}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Course Units Code</label>
                                <input
                                    type="text"
                                    name="role"
                                    className="form-control"
                                    value={formData.courseUnitCode}
                                    onChange={handleChange}
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

export default EditCourse;
