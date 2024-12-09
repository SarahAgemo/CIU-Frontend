// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Header from "../../components/admin/Headerpop";
// import Sidebar from "../../components/admin/SideBarpop";
// import MobileMenu from "../../components/admin/MobileMenu";
// import Dash from "../../components/lecturer/LecturerDashboard.module.css";
// import './EditAdmin.css'

// function Editadmin() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const [isMobile, setIsMobile] = useState(false);

//     // Form state
//     const [formData, setFormData] = useState({
//         first_name: '',
//         last_name: '',
//         email: '',
//         role: ''
//     });

//     // UI state
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Handle mobile responsiveness
//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth <= 991);
//         };

//         window.addEventListener("resize", handleResize);
//         handleResize();

//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     // Fetch user data
//     useEffect(() => {
//         if (!id) {
//             setError("No user ID provided in the URL.");
//             setLoading(false);
//             return;
//         }

//         const fetchUserData = async () => {
//             try {
//                 console.log(`Fetching data for user ID: ${id}`);
//                 const response = await fetch(`https://c-i-u-backend.onrender.com/adminReg/${id}`);

//                 if (!response.ok) {
//                     throw new Error(`Failed to fetch user data. Status: ${response.status}`);
//                 }

//                 const data = await response.json();
//                 console.log("Fetched user data:", data);

//                 // Ensure the data has the expected structure
//                 const { first_name, last_name, email, role, password } = data;

//                 setFormData({
//                     first_name: first_name || '',
//                     last_name: last_name || '',
//                     email: email || '',
//                     role: role || '',


//                 });
//             } catch (err) {
//                 console.error("Error fetching user data:", err);
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUserData();
//     }, [id]);

//     // Handle form input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("Submitting updated form data:", formData);

//         try {
//             const response = await fetch(`https://c-i-u-backend.onrender.com/adminReg/${id}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Failed to update user.');
//             }

//             console.log("User updated successfully.");
//             navigate('/adminuser');
//         } catch (err) {
//             console.error("Error updating user:", err);
//             setError(err.message);
//         }
//     };

//     // Render loading state
//     if (loading) {
//         return (
//             <div className={Dash.lecturerDashboard}>
//                 <div className={Dash.dashboard}>
//                     <Header toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} isMobile={isMobile} />
//                     <div className={Dash["dashboard-content"]}>
//                         <div className="flex items-center justify-center h-full">
//                             <div className="text-xl">Loading...</div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // Main render
//     return (
//         <div className={Dash.adDashboard}>
//             <div className={Dash.dashboard}>
//                 <Header toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} isMobile={isMobile} />
//                 <div className={Dash["dashboard-content"]}>
//                     {!isMobile && <Sidebar />}
//                     {isMobile && (
//                         <MobileMenu
//                             isOpen={isMobileMenuOpen}
//                             toggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                         />
//                     )}

//                     <div className="edit-admin-layout-container">

//             <div className="edit-admin-main-content">

//                 <div className="edit-admin-users-content">  
//                     <div className="edit-admin-container ">
//                         <h2>Edit Admin User</h2>
//                         <form onSubmit={handleSubmit}>
//                             <div className="edit-admin-form-group">
//                                 <label htmlFor="first_name">First Name</label>
//                                 <input
//                                     type="text"
//                                     id="first_name"
//                                     name="first_name"
//                                     className="edit-admin-form-control"
//                                     value={formData.first_name}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className="edit-admin-form-group">
//                                 <label htmlFor="last_name">Last Name</label>
//                                 <input
//                                     type="text"
//                                     id="last_name"
//                                     name="last_name"
//                                     className="edit-admin-form-control"
//                                     value={formData.last_name}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className="edit-admin-form-group">
//                                 <label htmlFor="email">Email</label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     name="email"
//                                     className="edit-admin-form-control"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className="edit-admin-form-group">
//                                 <label htmlFor="role">Role</label>
//                                 <input
//                                     type="text"
//                                     id="role"
//                                     name="role"
//                                     className="edit-admin-form-control"
//                                     value={formData.role}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>

//                             <button type="submit" className="edit-admin-save-button">
//                                 Save Changes
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Editadmin;



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
            fetch(`https://c-i-u-backend.onrender.com/adminReg/${id}`)
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
        fetch(`https://c-i-u-backend.onrender.com/adminReg/${id}`, {
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