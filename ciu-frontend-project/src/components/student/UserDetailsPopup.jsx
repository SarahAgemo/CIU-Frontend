import React, { useState, useEffect, useRef } from "react";
import { Settings, LogOut, X, Edit, User as UserIcon } from "lucide-react";
import axios from "axios";
import User from "./UserDetailsPopup.module.css";

export default function UserDetailsPopup({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loginHistory, setLoginHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ first_name: "", last_name: "" });
  const [showLoginHistory, setShowLoginHistory] = useState(false); // For showing login history popup
  const popupRef = useRef(null);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const closePopup = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please log in.");
          return;
        }

        const profileResponse = await axios.get("http://localhost:3000/faqs/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const historyResponse = await axios.get("http://localhost:3000/auth/login-history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { first_name, last_name, role, profileImageSrc } = profileResponse.data;
        setUserData({
          name: `${first_name} ${last_name}`,
          role: role || "User",
          profileImageSrc: profileImageSrc || "default-profile.png", 
          first_name,
          last_name,
        });
        setEditedData({ first_name, last_name });
        setLoginHistory(historyResponse.data);
      } catch (error) {
        setError("Failed to fetch user data.");
        console.error("Error fetching user profile or history:", error);
      }
    };

    if (isOpen && !userData) {
      setLoading(true);
      fetchUserData().finally(() => setLoading(false));
    }
  }, [isOpen]);

  const handleEditSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in.");
        return;
      }

      await axios.put(
        "http://localhost:3000/auth/profile/update-name", 
        {
          first_name: editedData.first_name,
          last_name: editedData.last_name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserData((prev) => ({
        ...prev,
        name: `${editedData.first_name} ${editedData.last_name}`,
        first_name: editedData.first_name,
        last_name: editedData.last_name,
      }));

      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      setError("Failed to update profile.");
      console.error("Error updating profile:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post('http://localhost:3000/students/logout', {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        localStorage.removeItem("token");
        window.location.href = '/'; // Redirect to login page
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className={User["user-details-popup"]} ref={popupRef}>
      <div onClick={togglePopup}>{children}</div>
      {isOpen && (
        <div className={User["popup-content"]}>
          <button className={User["close-button"]} onClick={closePopup} aria-label="Close popup">
            <X className={User["close-icon"]} />
          </button>
          {error ? (
            <div className="error">{error}</div>
          ) : loading ? (
            <div>Loading...</div>
          ) : userData ? (
            <>
              <div className={User["user-info"]}>
                <h2 className={User["user-name"]}>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={editedData.first_name}
                        onChange={(e) => setEditedData({ ...editedData, first_name: e.target.value })}
                        placeholder="First Name"
                      />
                      <input
                        type="text"
                        value={editedData.last_name}
                        onChange={(e) => setEditedData({ ...editedData, last_name: e.target.value })}
                        placeholder="Last Name"
                      />
                    </>
                  ) : (
                    userData.name
                  )}
                </h2>
                <p className={User["user-role"]}>{userData.role}</p>
              </div>
              {isEditing ? (
                <button className={User["action-button"]} onClick={handleEditSave}>
                  Save Changes
                </button>
              ) : (
                <button className={User["action-button"]} onClick={() => setIsEditing(true)}>
                  <Edit className={User["action-icon"]} />
                  Edit Profile
                </button>
              )}
              <button className={User["action-button"]} onClick={() => setShowLoginHistory(true)}>
                <UserIcon className={User["action-icon"]} />
                View Login History
              </button>
              <button className={`${User["action-button"]} ${User["logout-button"]}`} onClick={handleLogout}>
                <LogOut className={User["action-icon"]} />
                Logout
              </button>
            </>
          ) : (
            <div>Loading user data...</div>
          )}
        </div>
      )}

      {showLoginHistory && (
        <div className={User["popup-content"]}>
          <button className={User["close-button"]} onClick={() => setShowLoginHistory(false)} aria-label="Close popup">
            <X className={User["close-icon"]} />
          </button>
          <h3>Login History</h3>
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Login Time</th>
              </tr>
            </thead>
            <tbody>
              {loginHistory.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.studentId}</td>
                  <td>{new Date(entry.loginTime).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
