
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header1';
import Sidebar1 from './SideBarEditUser';
import editLecturer from './EditLecturer.module.css';

function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    useEffect(() => {
        fetch(`http://localhost:3000/lecturerReg/${id}`)
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
        fetch(`http://localhost:3000/lecturerReg/${id}`, {
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
        <div className={editLecturer["layout-container"]}>
            <Header />
            <div className={editLecturer["main-content"]}>
                <Sidebar1 />
                <div className={editLecturer["users-content"]}>
                    <div className={editLecturer["edit-user-container"]}>
                        <h2>Edit User</h2>
                        <form onSubmit={handleSubmit} className={editLecturer["edit-user-form"]}>
                            <div className={editLecturer["form-group"]}>
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="first_name"
                                    className={editLecturer["form-control"]}
                                    value={formData.first_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={editLecturer["form-group"]}>
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    className={editLecturer["form-control"]}
                                    value={formData.last_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={editLecturer["form-group"]}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className={editLecturer["form-control"]}
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={editLecturer["form-group"]}>
                                <label>Role</label>
                                <input
                                    type="text"
                                    name="role"
                                    className={editLecturer["form-control"]}
                                    value={formData.role}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={editLecturer["form-group password-group"]}>
                                <label>Password</label>
                                <div className={editLecturer["password-input"]}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        className={editLecturer["form-control"]}
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <span
                                        className={`eye-icon ${showPassword ? 'open' : 'closed'}`}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? '👁️' : '🙈'}
                                    </span>
                                </div>
                            </div>
                            <button type="submit" className={editLecturer["form button"]}>
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUser;
