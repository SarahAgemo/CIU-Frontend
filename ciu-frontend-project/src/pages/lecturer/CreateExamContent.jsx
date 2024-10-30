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
        createdBy:'',
        questions: [
            {
                questions: '', // Updated field name
                options: '',
                correctAnswer: '',
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            courseId: parseInt(formData.courseId, 10),
            duration: parseInt(formData.duration, 10),
            createdBy: parseInt(formData.createdBy, 10),
            scheduledDate: new Date(formData.scheduledDate).toISOString(),
            startTime: new Date(formData.startTime).toISOString(), // Ensure proper format
            endTime: new Date(formData.endTime).toISOString(), // Ensure proper format
            questions: JSON.stringify(
                formData.questions.map(q => ({
                  questions: q.questions,
                  options: JSON.stringify(q.options.split(',')), // Ensure options are a JSON string
                  correctAnswer: q.correctAnswer,
                }))
              ),
              
            };

        axios.post('http://localhost:3000/manualAssessment', payload)
            .then(response => {
                console.log('Data posted successfully:', response.data);
                navigate('/success');
            })
            .catch(error => {
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
                    type="number"
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
                    type="number"
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
                        name="questions"
                        value={question.questions}
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
                        name="correctAnswer"
                        value={question.correctAnswer}
                        onChange={(e) => handleQuestionChange(index, e)}
                        placeholder="Correct Answer"
                        required
                    />
                </div>
            ))}

            <button type="submit">Create Assessment</button>
        </form>
    );
}
