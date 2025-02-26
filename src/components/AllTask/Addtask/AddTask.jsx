import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTask = () => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // New state to handle button disable

    const handleAddTask = (event) => {
        event.preventDefault();

        if (!newTaskTitle || !newTaskDescription || !dueDate) {
            toast.error('Title, description, and due date are required!');
            return;
        }

        if (newTaskTitle.length > 50) {
            toast.error('Title cannot exceed 50 characters!');
            return;
        }

        if (newTaskDescription.length > 200) {
            toast.error('Description cannot exceed 200 characters!');
            return;
        }

        const newTask = {
            title: newTaskTitle,
            description: newTaskDescription,
            dueDate: dueDate.toISOString().split('T')[0], // Format date as YYYY-MM-DD
            category: "ToDo" // Default category
        };

        setIsSubmitting(true); // Disable button during submission

        fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
        .then(res => res.json())
        .then(data => {
            toast.success('Task added successfully!');
            setNewTaskTitle('');
            setNewTaskDescription('');
            setDueDate(null);
        })
        .catch(error => {
            toast.error('Failed to add task!');
        })
        .finally(() => {
            setIsSubmitting(false); // Re-enable button after submission
        });
    };

    return (
        <div className="max-w-4xl bg-gradient-to-t from-purple-600 text-white to-indigo-700 mx-auto my-4 p-6 shadow-lg rounded-lg">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold ">Add Task</h1>
            </div>

            <form onSubmit={handleAddTask} className="space-y-6">
                <div className="flex flex-col">
                    <input
                        type="text"
                        placeholder="Task Title (Max 50 characters)"
                        value={newTaskTitle}
                        maxLength="50"
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        className="p-3 border rounded-md w-full"
                    />
                </div>

                <div className="flex flex-col">
                    <textarea
                        placeholder="Task Description (Max 200 characters)"
                        value={newTaskDescription}
                        maxLength="200"
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                        className="p-3 border rounded-md w-full h-32"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="dueDate" className="mb-2 ">Date</label>
                    <DatePicker
                        selected={dueDate}
                        onChange={(date) => setDueDate(date)}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Select Due Date"
                        className="p-3 border rounded-md w-full"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className={`bg-indigo-400 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md w-full sm:w-auto transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isSubmitting} // Disable button while submitting
                    >
                        {isSubmitting ? 'Adding...' : 'Add Task'}
                    </button>
                </div>
            </form>

            <ToastContainer />
        </div>
    );
};

export default AddTask;
