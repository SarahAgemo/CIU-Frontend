import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import uploadExam from './UploadExamContent.module.css'; // Import the updated CSS module
import moment from 'moment'; // Import moment for date/time formatting

export default function ScheduleUploadExams() {
    const navigate = useNavigate();
    const [examData, setExamData] = useState({
        title: '',
        description: '',
        courseId: '',
        courseUnit: '',
        courseUnitCode: '',
        scheduledDate: '',
        duration: '',
        startTime: '',
        endTime: '',
        createdBy: '',
        isDraft: false, // Ensure isDraft is a boolean
    });

    // Handle input changes for all fields
    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setExamData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value, // Handles Boolean for checkboxes
        }));
    };



    const [csvFile, setCsvFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExamData({ ...examData, [name]: value });
    };

    const handleFileUpload = (e) => {
        setCsvFile(e.target.files[0]);
    };

    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        const formData = new FormData();
        formData.append('file', csvFile);

    // Convert `isDraft` to Boolean if necessary
    examData.isDraft = examData.isDraft === 'true' || examData.isDraft === true;

        
        // Append exam data to formData
          
    Object.keys(examData).forEach((key) => {
        let value = examData[key];
        if (key === 'startTime' || key === 'endTime') {
            // Format start and end times as HH:mm:ss
            value = moment(value, 'HH:mm').format('HH:mm:ss');
        }
        if (key === 'scheduledDate') {
            // Format scheduledDate as YYYY-MM-DD HH:mm:ss
            value = moment(value).format('YYYY-MM-DD HH:mm:ss');
        }
        formData.append(key, value);
    });

        try {
            const response = await fetch('http://localhost:3000/exam-paper/upload', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) throw new Error('Failed to upload exam paper');
            const data = await response.json();
            setSuccess('Exam paper uploaded successfully!');
            navigate('/schedule-upload-exams/exam-list', { state: { examData: data } });
        } catch (error) {
            setError('Error uploading exam paper: ' + error.message);
        }
    };

    return (
        <div className={uploadExam["form-container"]}>
            <h2 className={uploadExam["form-title"]}>Schedule Upload Exams</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
                {/* Exam Title, Description */}
                <div className={uploadExam["form-group"]}>
                    <label>Exam Title</label>
                    <input
                        type="text"
                        name="title"
                        className={uploadExam["form-control"]}
                        value={examData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={uploadExam["form-group"]}>
                    <label>Instructions</label>
                    <textarea
                        name="description"
                        className={uploadExam["form-control"]}
                        value={examData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                {/* Course Information */}
                <div className={uploadExam["form-group"]}>
                    <label>Course ID</label>
                    <input
                        type="text"
                        name="courseId"
                        className={uploadExam["form-control"]}
                        value={examData.courseId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={uploadExam["form-group"]}>
                    <label>Course Unit</label>
                    <input
                        type="text"
                        name="courseUnit"
                        className={uploadExam["form-control"]}
                        value={examData.courseUnit}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={uploadExam["form-group"]}>
                    <label>Course Unit Code</label>
                    <input
                        type="text"
                        name="courseUnitCode"
                        className={uploadExam["form-control"]}
                        value={examData.courseUnitCode}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Exam Date, Duration, Start Time, End Time */}
                <div className={uploadExam["form-group"]}>
                    <label>Scheduled Date</label>
                    <input
                        type="datetime-local" // Use datetime-local for date and time input
                        name="scheduledDate"
                        className={uploadExam["form-control"]}
                        value={moment(examData.scheduledDate).format('YYYY-MM-DDTHH:mm')}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={uploadExam["form-group"]}>
                    <label>Duration (minutes)</label>
                    <input
                        type="number"
                        name="duration"
                        className={uploadExam["form-control"]}
                        value={examData.duration}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={uploadExam["form-group"]}>
                    <label>Start Time</label>
                    <input
                        type="time"
                        name="startTime"
                        className={uploadExam["form-control"]}
                        value={examData.startTime}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={uploadExam["form-group"]}>
                    <label>End Time</label>
                    <input
                        type="time"
                        name="endTime"
                        className={uploadExam["form-control"]}
                        value={examData.endTime}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Created By */}
                <div className={uploadExam["form-group"]}>
                    <label>Created By</label>
                    <input
                        type="text"
                        name="createdBy"
                        className={uploadExam["form-control"]}
                        value={examData.createdBy}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* File Upload */}
                <div className={uploadExam["form-group"]}>
                    <label>Upload CSV File</label>
                    <input
                        type="file"
                        className={uploadExam["form-control"]}
                        accept=".csv"
                        onChange={handleFileUpload}
                        required
                    />
                </div>

                <button type="submit" className={uploadExam["btn-primary"]}>
                    Upload Exam Paper
                </button>
            </form>
        </div>
    );
}
