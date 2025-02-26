
import React, { useState } from 'react';

const TaskModal = ({ task, onClose, categories, onUpdate }) => {
    const [updatedTask, setUpdatedTask] = useState({ ...task });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedTask({
            ...updatedTask,
            [name]: value,
        });
    };

    const handleCategoryChange = (event) => {
        setUpdatedTask({
            ...updatedTask,
            category: event.target.value,
        });
    };

    const handleSave = () => {
        fetch(`http://localhost:5000/tasks/${updatedTask._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        })
            .then(response => response.json())
            .then(data => {
                onUpdate(data);  // Propagate the updated task to the parent to update its state
                onClose();  // Close the modal after saving
            })
            .catch(error => {
                console.error("Error editing task:", error);
            });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="p-6 rounded-lg w-96 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

                {/* Editable Fields for Title, Description, and Due Date */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={updatedTask.title}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={updatedTask.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="dueDate">Due Date:</label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={updatedTask.dueDate}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                {/* Category Dropdown */}
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium">Category:</label>
                    <select
                        id="category"
                        name="category"
                        value={updatedTask.category}
                        onChange={handleCategoryChange}
                        className="w-full p-2 border rounded-md mt-2"
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-between">
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Update
                    </button>

                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
