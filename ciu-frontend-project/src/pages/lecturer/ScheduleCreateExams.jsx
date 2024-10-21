
import React, { useState } from 'react';
import Header from '../../components/lecturer/Header';
import SideBar from '../../components/lecturer/SideBarAddQuestion';
// import './ScheduleCreateExams.module.css';

function ScheduleCreateExams() {
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
        examRules: '', // Moved to the end of the form
    });

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

    return (
        <div className="layout-container">
            <Header />  {/* Header */}
            <div className="main-content">
                <SideBar />  {/* Sidebar */}
                <div className="users-content">
                    <div className="container mt-5">
                        <h2>Enter Exam Details</h2>
                        <form onSubmit={handleSubmit}>

                            {/* Exam Title, Course, Course ID */}
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label>Exam Title</label>
                                    <input
                                        type="text"
                                        name="examTitle"
                                        className="form-control"
                                        value={examData.examTitle}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Course</label>
                                    <input
                                        type="text"
                                        name="course"
                                        className="form-control"
                                        value={examData.course}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Course ID</label>
                                    <input
                                        type="text"
                                        name="courseId"
                                        className="form-control"
                                        value={examData.courseId}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Course Unit Name, Course Unit Code */}
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Course Unit Name</label>
                                    <input
                                        type="text"
                                        name="courseUnitName"
                                        className="form-control"
                                        value={examData.courseUnitName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Course Unit Code</label>
                                    <input
                                        type="text"
                                        name="courseUnitCode"
                                        className="form-control"
                                        value={examData.courseUnitCode}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Exam Date, Duration, Start Time, End Time */}
                            <div className="form-row">
                                <div className="form-group col-md-3">
                                    <label>Exam Date</label>
                                    <input
                                        type="date"
                                        name="examDate"
                                        className="form-control"
                                        value={examData.examDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label>Exam Duration</label>
                                    <input
                                        type="text"
                                        name="duration"
                                        className="form-control"
                                        value={examData.duration}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label>Start Time</label>
                                    <input
                                        type="time"
                                        name="startTime"
                                        className="form-control"
                                        value={examData.startTime}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label>End Time</label>
                                    <input
                                        type="time"
                                        name="endTime"
                                        className="form-control"
                                        value={examData.endTime}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Created By, Created At */}
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Created By</label>
                                    <input
                                        type="text"
                                        name="createdBy"
                                        className="form-control"
                                        value={examData.createdBy}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Created At</label>
                                    <input
                                        type="datetime-local"
                                        name="createdAt"
                                        className="form-control"
                                        value={examData.createdAt}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Exam Rules (Description) moved to the end */}
                            <div className="form-group">
                                <label>Exam Rules</label>  {/* Changed from Course Description */}
                                <textarea
                                    name="examRules"
                                    className="form-control"
                                    value={examData.examRules}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Action Buttons - Inline Style Fix */}
                            <div className="form-row d-flex justify-content-start">
                                <button
                                    type="submit"
                                    style={{ padding: '10px 20px', marginRight: '10px', display: 'inline-block' }}
                                    className="btn btn-secondary"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    style={{ padding: '10px 20px', display: 'inline-block' }}
                                    className="btn btn-outline-secondary"
                                >
                                    Add Questions
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScheduleCreateExams;
