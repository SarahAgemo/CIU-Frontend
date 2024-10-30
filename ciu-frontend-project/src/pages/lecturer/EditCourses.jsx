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
            .catch((error) => console.error('Error fetching course data:', error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
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
                    navigate('/courses');
                } else {
                    throw new Error('Failed to update course');
                }
            })
            .catch((error) => console.error('Error updating course:', error));
    };

    return (
        <div className="layout-container">
            <Header />  {/* Fixed Header */}
            <div className="main-content">
                <Sidebar1 />  {/* Fixed Sidebar */}
                <div className="users-content">  {/* Scrollable content */}
                    <div className="container mt-5">
                        <h2>Edit Course</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Faculty Name</label>
                                <input
                                    type="text"
                                    name="facultyName"
                                    className="form-control"
                                    value={formData.facultyName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Course Name</label>
                                <input
                                    type="text"
                                    name="courseName"
                                    className="form-control"
                                    value={formData.courseName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Course Units</label>
                                <input
                                    type="text"
                                    name="courseUnits"
                                    className="form-control"
                                    value={formData.courseUnits}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Course Unit Code</label>
                                <input
                                    type="text"
                                    name="courseUnitCode"
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
