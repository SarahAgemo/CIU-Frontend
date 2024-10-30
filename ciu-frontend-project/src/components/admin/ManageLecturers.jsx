import { ArrowLeft } from 'lucide-react'
import LecturerTable from './LecturerTable'
import { useNavigate } from 'react-router-dom';
import LECTURER from './ManageLecturers.module.css'


export default function ManageLecturers() {
  const navigate = useNavigate();

  return (
    <div className={LECTURER["manage-lecturers"]}>
      <div className={LECTURER["manage-lecturers-header"]}>
        <button className={LECTURER["back-button"]} aria-label="Go back" onClick={() => navigate('/admin/manage-users')} >
          <ArrowLeft className={LECTURER["back-button-icon"]} size={20} />
          <span>Back</span>
        </button>
        <h1 className={LECTURER["page-title"]}>MANAGE LECTURERS</h1>
        <button className={LECTURER["add-lecturer-button"]}>
          ADD LECTURER
        </button>
      </div>
      <LecturerTable />
    </div>
  )
}