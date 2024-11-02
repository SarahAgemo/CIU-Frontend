import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import createExam from './CreateExamContent.module.css';
import moment from 'moment';


export default function CreateExamContent() {
    const navigate = useNavigate();
    
    // Fix 1: Separate state declarations
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        courseId: '',
        courseUnit: '',
        courseUnitCode: '',
        duration: '',
        scheduledDate: '',
        startTime: '',
        endTime: '',
        createdBy: '',
        questions: [
            {
                content: '',
                options: '',
                answer: '',
            },
        ],
    });

    // Fix 2: Add missing state variables
    const [courses, setCourses] = useState([]);
    const [courseUnits, setCourseUnits] = useState([]);
    const [error, setError] = useState('');

    // Fix 3: Update fetch courses useEffect
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:3000/exam-paper/courses');
                if (!response.ok) throw new Error('Failed to fetch courses');
                const data = await response.json();
                setCourses(data);
            } catch (err) {
                setError('Error fetching courses: ' + err.message);
            }
        };
        fetchCourses();
    }, []);

    // Fix 4: Update fetch course units useEffect
    useEffect(() => {
        if (formData.courseId) {
            const fetchCourseUnits = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/manual-exam-paper/courses/${formData.courseId}/units`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch course units');
                    }
                    const data = await response.json();
                    setCourseUnits(data.courseUnits || []);
                } catch (err) {
                    console.error('Error fetching course units:', err);
                    setError('Error fetching course units: ' + err.message);
                    setCourseUnits([]);
                }
            };
            fetchCourseUnits();
        } else {
            setCourseUnits([]);
        }
    }, [formData.courseId]);

    // Fix 5: Update handleInputChange
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));

        // Update course unit code when course unit changes
        if (name === 'courseUnit') {
            const selectedUnit = courseUnits.find(unit => unit.unitName === value);
            if (selectedUnit) {
                setFormData(prevData => ({
                    ...prevData,
                    courseUnitCode: selectedUnit.unitCode,
                }));
            }
        }
    };

    const handleQuestionChange = (index, e) => {
        const { name, value } = e.target;
        const newQuestions = [...formData.questions];
        newQuestions[index][name] = value;
        setFormData({ ...formData, questions: newQuestions });
    };

    const addNewQuestion = () => {
        setFormData((prevState) => ({
            ...prevState,
            questions: [
                ...prevState.questions,
                { content: '', options: '', answer: '' },
            ],
        }));
    };

    const removeLastQuestion = () => {
        if (formData.questions.length > 1) {
            setFormData((prevState) => ({
                ...prevState,
                questions: prevState.questions.slice(0, -1),
            }));
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                courseId: parseInt(formData.courseId, 10),
                duration: formData.duration,
                scheduledDate: moment(formData.scheduledDate).format('YYYY-MM-DD HH:mm:ss'),
                startTime: moment(formData.startTime, 'HH:mm').format('HH:mm:ss'),
                endTime: moment(formData.endTime, 'HH:mm').format('HH:mm:ss'),
                questions: formData.questions.map((q) => ({
                    content: q.content,
                    options: q.options.split(','), // Convert to array
                    answer: q.answer,
                })),
            };

            const response = await axios.post('http://localhost:3000/manual-exam-paper', payload);
            console.log('Data posted successfully:', response.data);
            navigate('/schedule-upload-exams/exam-list');
        } catch (error) {
            console.error('There was an error!', error);
            setError('Failed to create exam: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Form fields to collect assessment data */}
            <div>
                <label>Assessment Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Assessment Title"
                    required
                />
            </div>

            <div>
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    required
                />
            </div>

           

            
              {/* Course Selection Dropdown */}
              <div className={createExam["form-group"]}>
                    <label>Select Course</label>
                    <select
                        name="courseId"
                        className={createExam["form-control"]}
                        value={formData.courseId}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select a course</option>
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.courseName}
                                </option>
                            ))
                        ) : (
                            <option disabled>No courses available</option>
                        )}
                    </select>
                </div>

                {/* Course Unit Dropdown */}
                <div className={createExam["form-group"]}>
                    <label>Course Unit</label>
                    <select
                        name="courseUnit"
                        className={createExam["form-control"]}
                        value={formData.courseUnit}
                        onChange={handleInputChange}
                        required
                        disabled={!formData.courseId}
                    >
                        <option value="">Select a course unit</option>
                        {Array.isArray(courseUnits) && courseUnits.length > 0 ? (
                            courseUnits.map((unit) => (
                                <option key={unit.id} value={unit.unitName}>
                                    {unit.unitName}
                                </option>
                            ))
                        ) : (
                            <option disabled>No course units available</option>
                        )}
                    </select>
                </div>



            <div>
                <label>Course Unit Code</label>
                <input
                    type="text"
                    name="courseUnitCode"
                    value={formData.courseUnitCode}
                    onChange={handleInputChange}
                    placeholder="Course Unit Code"
                    required
                />
            </div>

            <div>
                <label>Duration (in minutes)</label>
                <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="Duration"
                    required
                />
            </div>

            <div>
                <label>Scheduled Date</label>
                <input
                    type="datetime-local"
                    name="scheduledDate"
                    value={formData.scheduledDate}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div>
                <label>Start Time</label>
                <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div>
                <label>End Time</label>
                <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div>
                <label>Created By</label>
                <input
                    type="text"
                    name="createdBy"
                    value={formData.createdBy}
                    onChange={handleInputChange}
                    placeholder="Created By"
                    required
                />
            </div>

            {/* Questions Section */}
            {formData.questions.map((question, index) => (
                <div key={index}>
                    <label>Question Text</label>
                    <input
                        type="text"
                        name="content"
                        value={question.content}
                        onChange={(e) => handleQuestionChange(index, e)}
                        placeholder="Question"
                        required
                    />
                    <label>Options (comma-separated)</label>
                    <input
                        type="text"
                        name="options"
                        value={question.options}
                        onChange={(e) => handleQuestionChange(index, e)}
                        placeholder="Option1,Option2,Option3,Option4"
                        required
                    />
                    <label>Correct Answer</label>
                    <input
                        type="text"
                        name="answer"
                        value={question.answer}
                        onChange={(e) => handleQuestionChange(index, e)}
                        placeholder="Correct Answer"
                        required
                    />
                </div>
            ))}

            <button type="button" onClick={addNewQuestion}>
                Add Another Question
            </button>

            <button type="button" onClick={removeLastQuestion} disabled={formData.questions.length === 1}>
                Remove Last Question
            </button>

            <button type="submit">Create Assessment</button>
        </form>
    );
}