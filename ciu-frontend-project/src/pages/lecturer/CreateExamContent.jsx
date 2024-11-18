import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import createExam from './CreateExamContent.module.css';
import moment from 'moment';
import { Snackbar, Alert } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function CreateExamContent() {
    const navigate = useNavigate();

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
                options: [''], // Initialize with one empty option
                answer: '',
            },
        ],
    });

    const [courses, setCourses] = useState([]);
    const [courseUnits, setCourseUnits] = useState([]);
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:3000/exam-paper/courses');
                if (!response.ok) throw new Error('Failed to fetch courses');
                const data = await response.json();
                setCourses(data);
            } catch (err) {
                setError('Error fetching courses: ' + err.message);
                handleSnackbar('Error fetching courses: ' + err.message, 'error');
            }
        };
        fetchCourses();
    }, []);

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
                    handleSnackbar('Error fetching course units: ' + err.message, 'error');
                    setCourseUnits([]);
                }
            };
            fetchCourseUnits();
        } else {
            setCourseUnits([]);
        }
    }, [formData.courseId]);

    const handleSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));

        if (name === 'courseUnit') {
            const selectedUnit = courseUnits.find(unit => unit.unitName === value);
            if (selectedUnit) {
                setFormData(prevData => ({
                    ...prevData,
                    courseUnitCode: selectedUnit.unitCode,
                }));
            }
        }

        if (name === 'scheduledDate') {
            const selectedDateTime = moment(value);
            const currentTime = moment();

            if (selectedDateTime.isBefore(currentTime.add(24, 'hours'))) {
                handleSnackbar('Scheduled date and time must be at least 24 hours from the current time.', 'error');
                return;
            }
            const startTime = selectedDateTime.format('HH:mm');
            setFormData((prevData) => ({
                ...prevData,
                startTime
            }));

            if (formData.duration) {
                const [durationHours, durationMinutes] = formData.duration.split(':').map(Number);
                const endTime = selectedDateTime
                    .add(durationHours, 'hours')
                    .add(durationMinutes, 'minutes')
                    .format('HH:mm');
                setFormData((prevData) => ({
                    ...prevData,
                    endTime
                }));
            }
        } else if (name === 'duration' && formData.startTime) {
            const startTimeMoment = moment(formData.scheduledDate);
            const [durationHours, durationMinutes] = value.split(':').map(Number);
            const endTime = startTimeMoment
                .add(durationHours, 'hours')
                .add(durationMinutes, 'minutes')
                .format('HH:mm');
            setFormData((prevData) => ({
                ...prevData,
                endTime
            }));
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
    
        // Validate that each answer is within the available options for each question
        const invalidAnswers = formData.questions.some((question) => {
            const optionsArray = question.options.split(',').map(option => option.trim());
            return !optionsArray.includes(question.answer);
        });
    
        if (invalidAnswers) {
            handleSnackbar('Each answer must be one of the provided options.', 'error');
            return;
        }
    
        try {
            const payload = {
                ...formData,
                courseId: parseInt(formData.courseId, 10),
                duration: formData.duration,
                scheduledDate: moment(formData.scheduledDate).format('YYYY-MM-DD HH:mm:ss'),
                startTime: moment(formData.startTime, 'HH:mm').format('HH:mm:ss'),
                endTime: moment(formData.endTime, 'HH:mm:ss'),
                questions: formData.questions.map((q) => ({
                    content: q.content,
                    options: q.options.split(',').map(option => option.trim()), // Ensure options are an array
                    answer: q.answer,
                })),
            };
    
            const response = await axios.post('http://localhost:3000/manual-exam-paper', payload);
    
            console.log('Data posted successfully:', response.data);
            handleSnackbar('Exam created successfully!', 'success');
            navigate('/schedule-upload-exams/exam-list');
        } catch (error) {
            console.error('Error creating exam:', error);
            handleSnackbar('Failed to create exam: ' + error.message, 'error');
        }
    };
    


    return (
        <div className={createExam.formWrapper_createExam}>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{
                    width: '50%'
                }} 

            >
                <Alert onClose={() => setSnackbarOpen(false)} 
                severity={snackbarSeverity}
                    sx={{
                        backgroundColor: snackbarSeverity === 'error' ? '#FFF4E5' : '#FFF4E5',
                        color: '#000',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                    icon={snackbarSeverity === 'error' ? <WarningAmberIcon /> : undefined}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <form onSubmit={handleSubmit} className={createExam.formContainer_createExam}>
                 <h2 className={createExam.heading_createExam}>Create Exams</h2>

                 <div className={createExam.formGroup_createExam}>
                     <label className={createExam.label_createExam}>Assessment Title</label>
                     <input
                         type="text"
                         name="title"
                         value={formData.title}
                         onChange={handleInputChange}
                         className={createExam.formControl_createExam}
                         placeholder="Assessment Title"
                         required
                     />
                 </div>

                 <div className={createExam.formGroup_createExam}>
                     <label className={createExam.label_createExam}>Instructions</label>
                     <textarea
                         name="description"
                         value={formData.description}
                         onChange={handleInputChange}
                         className={createExam.formControl_createExam}
                         placeholder="Instructions"
                         required
                     ></textarea>
                 </div>

                 <div className={createExam.formGroup_createExam}>
                     <label className={createExam.label_createExam}>Select Course</label>
                     <select
                         name="courseId"
                         className={createExam.formControl_createExam}
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

                 {/* Course Unit Selection */}
                 <div className={createExam.formGroup_createExam}>
                     <label className={createExam.label_createExam}>Course Unit</label>
                     <select
                         name="courseUnit"
                         className={createExam.formControl_createExam}
                         value={formData.courseUnit}
                         onChange={handleInputChange}
                         required
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

                 {/* Course Unit Code */}
                 <div className={createExam.formGroup_createExam}>
                     <label className={createExam.label_createExam}>Course Unit Code</label>
                     <input
                         type="text"
                         name="courseUnitCode"
                         className={createExam.formControl_createExam}
                         value={formData.courseUnitCode}
                         onChange={handleInputChange}
                         placeholder="Course Unit Code"
                         required
                     />
                 </div>
                 <div className={createExam.formGroup_duration}>
                     <label className={createExam.label_duration}>Duration</label>
                     <input
                         type="text"
                         name="duration"
                         value={formData.duration}
                         onChange={handleInputChange}
                         className={createExam.input_duration}
                         placeholder="HH:MM"
                         required
                     />
                 </div>

                 <div className={createExam.formGroup_scheduledDate}>
                 <label className={createExam.label_scheduledDate}>Scheduled Date</label>
                 <input
                     type="datetime-local"
                     name="scheduledDate"
                     value={formData.scheduledDate}
                     onChange={handleInputChange}
                     className={createExam.input_scheduledDate}
                     required
                 />
             </div>

                 <div className={createExam.formGroup_startTime}>
                     <label className={createExam.label_startTime}>Start Time</label>
                     <input
                         type="time"
                         name="startTime"
                         value={formData.startTime}
                         onChange={handleInputChange}
                         className={createExam.input_startTime}
                         required
                     />
                 </div>

                 <div className={createExam.formGroup_endTime}>
                     <label className={createExam.label_endTime}>End Time</label>
                     <input
                         type="time"
                         name="endTime"
                         value={formData.endTime}
                         className={createExam.input_endTime}
                         readOnly
                     />
                 </div>

                 <div className={createExam.formGroup_createdBy}>
                     <label className={createExam.label_createdBy}>Created By</label>
                     <input
                         type="text"
                         name="createdBy"
                         value={formData.createdBy}
                         onChange={handleInputChange}
                         className={createExam.input_createdBy}
                         placeholder="Created By"
                         required
                     />
                 </div>

                 {formData.questions.map((question, index) => (
                     <div key={index} className={createExam.formGroup_question}>
                         <label className={createExam.label_questionText}>Question Text</label>
                         <input
                             type="text"
                             name="content"
                             value={question.content}
                             onChange={(e) => handleQuestionChange(index, e)}
                             className={createExam.input_questionText}
                             placeholder="Question"
                             required
                         />
                         <label className={createExam.label_options}>Options (comma-separated)</label>
                         <input
                             type="text"
                             name="options"
                             value={question.options}
                             onChange={(e) => handleQuestionChange(index, e)}
                             className={createExam.input_options}
                             placeholder="Option1,Option2,Option3,Option4"
                             required
                         />
                         <label className={createExam.label_answer}>Correct Answer</label>
                         <input
                             type="text"
                             name="answer"
                             value={question.answer}
                             onChange={(e) => handleQuestionChange(index, e)}
                             className={createExam.input_answer}
                             placeholder="Correct Answer"
                             required
                         />
                     </div>
                 ))}


                 {/* Buttons for adding/removing questions */}
                 <div className={createExam.formGroup_createExam}>
                     <button type="button" onClick={addNewQuestion} className={createExam.addQuestionBtn_createExam}>
                         + Question
                     </button>
                     <button type="button" onClick={removeLastQuestion} className={createExam.btnSecondary_createExam}>
                         - Question
                     </button>
                     <button type="submit" className={createExam.btnPrimary_createExam}>
                     Create Assessment
                    </button>
                 </div>

            
                
             </form>
        </div>
    );
}