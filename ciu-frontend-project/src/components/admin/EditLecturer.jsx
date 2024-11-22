
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../../components/admin/Headerpop";
import Sidebar from "../../components/admin/SideBarpop";
import MobileMenu from "../../components/admin/MobileMenu";
import Dash from "../../components/lecturer/LecturerDashboard.module.css";
import './EditLecturer.css';

function EditUser() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
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
        <div className={Dash.lecturerDashboard}>
      <div className={Dash.dashboard}>
        <Header toggleMobileMenu={toggleMobileMenu} isMobile={isMobile} />
        <div className={Dash["dashboard-content"]}>
          {!isMobile && <Sidebar />}
          {isMobile && (
            <MobileMenu
              isOpen={isMobileMenuOpen}
              toggleMenu={toggleMobileMenu}
            />
          )}
        <div className="edit-lecturer-layout-container">
          
            <div className="edit-lecturer-main-content">
               
                <div className="edit-lecturer-users-content">
                   <div className="edit-lecturer-edit-user-container">   
                        <h2>Edit User</h2>
                        <form onSubmit={handleSubmit} className="edit-lecturer-edit-user-form">
                            <div className="edit-lecturer-form-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="first_name"
                                    className="edit-lecturer-form-control"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="edit-lecturer-form-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    className="edit-lecturer-form-control"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="edit-lecturer-form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="edit-lecturer-form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="edit-lecturer-form-group">
                                <label>Role</label>
                                <input
                                    type="text"
                                    name="role"
                                    className="edit-lecturer-form-control"
                                    value={formData.role}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="edit-lecturer-form-group edit-lecturer-password-group"> 
                                <label>Password</label>
                                <div className="edit-lecturer-password-input">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        className="edit-lecturer-form-control"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <span
                                        className={`edit-lecturer-eye-icon ${showPassword ? 'open' : 'closed'}`}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? '👁️' : '🙈'}
                                    </span>
                                </div>
                            </div>
                            <button type="submit" className="edit-lecturer-save-button">
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
        </div>
    );
}

export default EditUser;
