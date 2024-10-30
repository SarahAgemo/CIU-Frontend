import { useState, useEffect } from 'react'
import { Edit2, Trash2 } from 'lucide-react'
import TABLE from './StudentTable.module.css'

// Function to get lecturer data (simulating immediate access to data)
const getStudentData = () => {
  return [
    { id: 1, firstName: 'Amai', lastName: 'Clovis', email: 'ac@gmail.com', studentId: 'ST12345', program: 'Data Science' },
    { id: 2, firstName: 'Dennis', lastName: 'Lubanga', email: 'dl@gmail.com', studentId: 'ST23456', program: 'Pharmacy' },
    { id: 3, firstName: 'Jane', lastName: 'Doe', email: 'jd@gmail.com', studentId: 'ST34567', program: 'Business' },
  ];
};

export default function StudentTable() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const data = getStudentData();
      setStudents(data);
    } catch (err) {
      setError('Failed to fetch students');
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
            <th>Student ID</th>
            <th>Program</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.email}</td>
              <td>{student.studentId}</td>
              <td>{student.program}</td>
              <td>
                <button className={TABLE["action-button edit-button"]} aria-label={`Edit ${student.firstName} ${student.lastName}`}>
                  <Edit2 size={18} />
                </button>
                <button className={TABLE["action-button delete-button" ]}aria-label={`Delete ${student.firstName} ${student.lastName}`}>
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