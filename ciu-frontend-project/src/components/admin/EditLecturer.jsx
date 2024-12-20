import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import editLecturer from './EditLecturer.module.css';

function EditLecturer({ id, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        password: '',
    });
    // const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:3000/lecturerReg/${id}`)
                .then((response) => response.json())
                .then((data) => setFormData(data))
                .catch((error) => console.error('Error fetching user:', error));
        }
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
                    return response.json();
                } else {
                    throw new Error('Failed to update user');
                }
            })
            .then((updatedUser) => {
                onUpdate(updatedUser);
                onClose();
            })
            .catch((error) => console.error('Error updating user:', error));
    };

    return (
        <div className={editLecturer["edit-user-container"]}>
            <div className={editLecturer["edit-user-header"]}>
                <h2>Edit Lecturer</h2>
                <button onClick={onClose} className={editLecturer["close-button"]}>
                    <FaTimes />
                </button>
            </div>
            <form onSubmit={handleSubmit} className={editLecturer["edit-user-form"]}>
                <div className={editLecturer["form-group"]}>
                    <label htmlFor="first_name">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        className={editLecturer["form-control"]}
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div className={editLecturer["form-group"]}>
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        className={editLecturer["form-control"]}
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                </div>
                <div className={editLecturer["form-group"]}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className={editLecturer["form-control"]}
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className={editLecturer["form-group"]}>
                    <label htmlFor="role">Role</label>
                    <input
                        type="text"
                        id="role"
                        name="role"
                        className={editLecturer["form-control"]}
                        value={formData.role}
                        onChange={handleChange}
                    />
                </div>
                <div className={editLecturer["form-actions"]}>
                    <button type="submit" className={editLecturer["form-button"]}>
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditLecturer;