import { useState, useEffect } from 'react'
import { Edit2, Trash2 } from 'lucide-react'
import TABLE from './LecturerTable.module.css'

// Function to get lecturer data (simulating immediate access to data)
const getLecturerData = () => {
  return [
    { id: 1, firstName: 'Amai', lastName: 'Clovis', email: 'ac@gmail.com', staffId: 'ST12345', faculty: 'SoBAT' },
    { id: 2, firstName: 'Dennis', lastName: 'Lubanga', email: 'dl@gmail.com', staffId: 'ST23456', faculty: 'IPHM' },
    { id: 3, firstName: 'Jane', lastName: 'Doe', email: 'jd@gmail.com', staffId: 'ST34567', faculty: 'SoBAT' },
  ];
};

export default function LecturerTable() {
  const [lecturers, setLecturers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const data = getLecturerData();
      setLecturers(data);
    } catch (err) {
      setError('Failed to fetch lecturers');
    }
  }, []);

  if (error) {
    return <div className={TABLE["error"]}>{error}</div>;
  }

  return (
    <div className={TABLE["lecturer-table-container"]}>
      <table className={TABLE["lecturer-table"]}>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Address</th>
            <th>Staff ID</th>
            <th>Faculty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lecturers.map((lecturer) => (
            <tr key={lecturer.id}>
              <td>{lecturer.id}</td>
              <td>{lecturer.firstName}</td>
              <td>{lecturer.lastName}</td>
              <td>{lecturer.email}</td>
              <td>{lecturer.staffId}</td>
              <td>{lecturer.faculty}</td>
              <td>
                <button className={TABLE["action-button"] + TABLE[" "]  +  TABLE["edit-button"]} aria-label={`Edit ${lecturer.firstName} ${lecturer.lastName}`}>
                  <Edit2 size={18} />
                </button>
                <button className={TABLE["action-button"] + TABLE[" "]  +  TABLE["delete-button"]}aria-label={`Delete ${lecturer.firstName} ${lecturer.lastName}`}>
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}