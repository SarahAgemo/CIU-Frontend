import { useState, useEffect, useRef } from 'react'
import { Settings, LogOut, X } from "lucide-react"
import User from "./UserDetailsPop.module.css"
import axios from 'axios';



const fetchLoggedInUserData = async (setUserData, setError) => {
    try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        if (!token || !user) {
            setError('User is not authenticated.');
            return;
        }

        const { id } = user;
        const response = await axios.get(`http://localhost:3000/lecturerReg/profile/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const { first_name, last_name, role, profileImageSrc } = response.data;
        setUserData({
            profileImageSrc: profileImageSrc || "/IMG_9472.jpg", // Use default if no image
            name: `${first_name} ${last_name}`,
            role,
            id,
        });
        setError(null);
    } catch (err) {
        console.error('Failed to fetch user data:', err);
        setError('Failed to load user data.');
    }
};

export default function UserDetailsPopup({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const popupRef = useRef(null);

    const togglePopup = () => {
        if (!isOpen) {
            fetchLoggedInUserData(setUserData, setError);
        }
        setIsOpen(!isOpen);
    }

    const closePopup = () => setIsOpen(false)

    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                closePopup()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className={User["user-details-popup"]} ref={popupRef}>
            <div onClick={togglePopup}>
                {children}
            </div>
            {isOpen && (
                <div className={User["popup-content"]} >
                    <button className={User["close-button"]} onClick={closePopup} aria-label="Close popup">
                        <X className={User["close-icon"]} />
                    </button>
                    {error ? (
                        <div className="error">{error}</div>
                    ) : userData ? (
                        <>
                            <div className={User["user-info"]} >
                                <img
                                    src={userData.profileImageSrc}
                                    alt="User profile"
                                    className={User["user-avatar"]}
                                />
                                <h2 className={User["user-name"]} >{userData.name}</h2>
                                <p className={User["user-role"]} >{userData.role}</p>
                                <p className={User["user-id"]} >{userData.id}</p>
                            </div>
                            <div className={User["popup-actions"]} >
                                <button className={User["action-button"]} onClick={() => console.log("Manage Account clicked")}>
                                    <Settings className={User["action-icon"]} />
                                    Manage Account
                                </button>
                                <button className={User["action-button"] + " " + User["logout-button"]} onClick={() => console.log("Logout clicked")}>
                                    <LogOut className={User["action-icon"]} />
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="error">Failed to load user data</div>
                    )}
                </div>
            )}
        </div>
    )
}

