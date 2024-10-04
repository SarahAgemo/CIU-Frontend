import React, { useState } from 'react'; // Import useState
import './Registration.css';
// import { BiSolidUserRectangle } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";

const Registration = () => {  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("Select User");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setIsOpen(false);
  };

  const placeholderText =
    selectedUser === "Student" ? "Student Number" : "Email";

  return (
    <div className='container'>
      <h1>Register</h1>
      
      <form>

      {/* <div className="select" onClick={toggleDropdown}>
          <div className="select-field">
            <p>{selectedUser}</p>
            <RiArrowDropDownLine size={40} />
          </div>
          {isOpen && (
            <ul className="option-list">
              <li onClick={() => handleUserSelection("Student")}>Student</li>
              <li onClick={() => handleUserSelection("Administrator")}>Administrator</li>
              <li onClick={() => handleUserSelection("Lecturer")}>Lecturer</li>
            </ul>
          )}
        </div> */}

        <div className="button-group">
          <button type="button" className={selectedUser === "Student" ? "active" : ""} onClick={() => handleUserSelection("Student")}>Student</button>
          <button type="button" className={selectedUser === "Administrator" ? "active" : ""} onClick={() => handleUserSelection("Administrator")}>Administrator</button>
          <button type="button" className={selectedUser === "Lecturer" ? "active" : ""} onClick={() => handleUserSelection("Lecturer")}>Lecturer</button>
        </div>
         
        <label htmlFor='firstName'>First Name</label>
        <input type="text" placeholder='Enter First Name' name='firstname' />

        <label htmlFor='lastName'>Last Name</label>
        <input type="text" placeholder='Enter Last Name' name='lastname' />

        <label htmlFor='email'>{placeholderText}</label>
        <input type={selectedUser === "Student" ? "text" : "email"} placeholder={`Enter ${placeholderText}`} name='email' />

        {/* <label htmlFor='role'>Role</label>
        <select name="role" id="role">
          <option value="Lecture">Lecture</option>
          <option value="Student">Student</option>
          <option value="Admin">Admin</option>
        </select> */}

        

        <label htmlFor='password'>Password</label>
        <input type="password" placeholder='Enter Password' name='password' />

        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default Registration;  
