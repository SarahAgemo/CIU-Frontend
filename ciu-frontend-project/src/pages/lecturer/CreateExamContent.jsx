
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import createExam from './CreateExamContent.module.css'; 

export default function CreateExamContent() {
    const [examData, setExamData] = useState({
        examTitle: '',
        course: '',
        courseId: '',
        courseUnitName: '',
        courseUnitCode: '',
        examDate: '',
        duration: '',
        startTime: '',
        endTime: '',
        createdBy: '',
        createdAt: '',
        examRules: '',
    });

    const navigate = useNavigate(); // Initialize the navigation hook

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setExamData({ ...examData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Scheduled Exam Data:', examData);
        // Add logic to send form data to backend API
    };

    const handleAddQuestions = () => {
        navigate('/add-questions'); // Redirect to the Add Questions page
    };

    return (
        <div className={createExam["form-container"]}>
            <h2 className={createExam["form-title"]}>Enter Exam Details</h2>
            <form onSubmit={handleSubmit}>
                {/* Exam Title, Course, Course ID */}
                <div className={createExam["form-row"]}>
                    <div className={createExam["form-group"]}>
                        <label>Exam Title</label>
                        <input
                            type="text"
                            name="examTitle"
                            className={createExam["form-control"]}
                            value={examData.examTitle}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={createExam["form-group"]}>
                        <label>Course</label>
                        <input
                            type="text"
                            name="course"
                            className={createExam["form-control"]}
                            value={examData.course}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={createExam["form-group"]}>
                        <label>Course ID</label>
                        <input
                            type="text"
                            name="courseId"
                            className={createExam["form-control"]}
                            value={examData.courseId}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Course Unit Name, Course Unit Code */}
                <div className={createExam["form-row"]}>
                    <div className={createExam["form-group"]}>
                        <label>Course Unit Name</label>
                        <input
                            type="text"
                            name="courseUnitName"
                            className={createExam["form-control"]}
                            value={examData.courseUnitName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={createExam["form-group"]}>
                        <label>Course Unit Code</label>
                        <input
                            type="text"
                            name="courseUnitCode"
                            className={createExam["form-control"]}
                            value={examData.courseUnitCode}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Exam Date, Duration, Start Time, End Time */}
                <div className={createExam["form-row"]}>
                    <div className={createExam["form-group"]}>
                        <label>Exam Date</label>
                        <input
                            type="date"
                            name="examDate"
                            className={createExam["form-control"]}
                            value={examData.examDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={createExam["form-group"]}>
                        <label>Exam Duration</label>
                        <input
                            type="text"
                            name="duration"
                            className={createExam["form-control"]}
                            value={examData.duration}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={createExam["form-group"]}>
                        <label>Start Time</label>
                        <input
                            type="time"
                            name="startTime"
                            className={createExam["form-control"]}
                            value={examData.startTime}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={createExam["form-group"]}>
                        <label>End Time</label>
                        <input
                            type="time"
                            name="endTime"
                            className={createExam["form-control"]}
                            value={examData.endTime}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Created By, Created At */}
                <div className={createExam["form-row"]}>
                    <div className={createExam["form-group"]}>
                        <label>Created By</label>
                        <input
                            type="text"
                            name="createdBy"
                            className={createExam["form-control"]}
                            value={examData.createdBy}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={createExam["form-group"]}>
                        <label>Created At</label>
                        <input
                            type="datetime-local"
                            name="createdAt"
                            className={createExam["form-control"]}
                            value={examData.createdAt}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Exam Rules (Description) */}
                <div className={createExam["form-group"]}>
                    <label>Exam Rules</label>
                    <textarea
                        name="examRules"
                        className={createExam["form-control"]}
                        value={examData.examRules}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Action Buttons */}
                <div className={createExam["form-actions"]}>
                    <button
                        type="submit"
                        className={createExam["btn-primary"]}
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className={createExam["btn-secondary"]}
                        onClick={handleAddQuestions} // Call the navigation function
                    >
                        Add Questions
                    </button>
                </div>
            </form>
        </div>
    );
}
