import { ArrowLeft } from 'lucide-react'
import StudentTable from './StudentTable'
import { useNavigate } from 'react-router-dom';
import STUDENT from './ManageStudents.module.css'

export default function ManageStudents() {
  const navigate = useNavigate();

  return (
    <div className={STUDENT["manage-lecturers"]}>
      <div className={STUDENT["manage-lecturers-header"]}>
        <button className={STUDENT["back-button"]} aria-label="Go back" onClick={() => navigate('/admin/manage-users')} >
          <ArrowLeft className={STUDENT["back-button-icon"]} size={20} />
          <span>Back</span>
        </button>
        <h1 className={STUDENT["page-title"]}>MANAGE STUDENTS</h1>
        <button className={STUDENT["add-lecturer-button"]}>
          ADD STUDENT
        </button>
      </div>
      <StudentTable />
    </div>
  )
}