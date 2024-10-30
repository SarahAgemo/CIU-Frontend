import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import createExam from './CreateExamContent.module.css';

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
                options: '',
                answer: '',
            },
        ],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleQuestionChange = (index, e) => {
        const { name, value } = e.target;
        const newQuestions = [...formData.questions];
        newQuestions[index][name] = value;
        setFormData({ ...formData, questions: newQuestions });
    };

    // Function to add a new question
    const addNewQuestion = () => {
        setFormData((prevState) => ({
            ...prevState,
            questions: [
                ...prevState.questions,
                { content: '', options: '', answer: '' },
            ],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            courseId: parseInt(formData.courseId, 10),
            duration: formData.duration,
            scheduledDate: new Date(formData.scheduledDate).toISOString(),
            startTime: new Date(formData.startTime).toISOString(),
            endTime: new Date(formData.endTime).toISOString(),
            questions: formData.questions.map((q) => ({
                content: q.content,
                options: q.options.split(','), // Convert to array
                answer: q.answer,
            })),
        };

        axios.post('http://localhost:3000/manual-exam-paper', payload)
            .then((response) => {
                console.log('Data posted successfully:', response.data);
                navigate('/schedule-create-exams/exam-list');
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
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

            <div>
                <label>Course ID</label>
                <input
                    type="number"
                    name="courseId"
                    value={formData.courseId}
                    onChange={handleInputChange}
                    placeholder="Course ID"
                    required
                />
            </div>

            <div>
                <label>Course Unit</label>
                <input
                    type="text"
                    name="courseUnit"
                    value={formData.courseUnit}
                    onChange={handleInputChange}
                    placeholder="Course Unit"
                    required
                />
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
                    type="datetime-local"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div>
                <label>End Time</label>
                <input
                    type="datetime-local"
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

            <button type="submit">Create Assessment</button>
        </form>
    );
}
