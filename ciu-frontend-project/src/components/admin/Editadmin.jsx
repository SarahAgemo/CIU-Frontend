import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import edAdmin from './EditAdmin.module.css';

function EditAdmin({ id, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        role: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:3000/adminReg/${id}`)
                .then((response) => response.json())
                .then((data) => setFormData(data))
                .catch((error) => console.error('Error fetching user data:', error));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/adminReg/${id}`, {
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
        <div className={edAdmin["edit-user-container"]}>
            <div className={edAdmin["edit-user-header"]}>
                <h2>Edit Admin</h2>
                <button onClick={onClose} className={edAdmin["close-button"]}>
                    <FaTimes />
                </button>
            </div>
            <form onSubmit={handleSubmit} className={edAdmin["edit-user-form"]}>
                <div className={edAdmin["form-group"]}>
                    <label htmlFor="first_name">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        className={edAdmin["form-control"]}
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div className={edAdmin["form-group"]}>
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        className={edAdmin["form-control"]}
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                </div>
                <div className={edAdmin["form-group"]}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className={edAdmin["form-control"]}
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className={edAdmin["form-group"]}>
                    <label htmlFor="role">Role</label>
                    <input
                        type="text"
                        id="role"
                        name="role"
                        className={edAdmin["form-control"]}
                        value={formData.role}
                        onChange={handleChange}
                    />
                </div>
                <div className={edAdmin["form-actions"]}>
                    <button type="submit" className={edAdmin["form-button"]}>
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditAdmin;