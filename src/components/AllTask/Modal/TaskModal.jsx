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
                onUpdate(data);
                onClose();
            })
            .catch(error => {
                console.error("Error editing task:", error);
            });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-screen-sm mx-auto relative">
                <h2 className="text-xl font-semibold mb-4 text-center">Edit Task</h2>

                {/* Editable Fields */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={updatedTask.title}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description:</label>
                        <textarea
                            name="description"
                            value={updatedTask.description}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Due Date:</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={updatedTask.dueDate}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-black">Category:</label>
                        <select
                            name="category"
                            value={updatedTask.category}
                            onChange={handleCategoryChange}
                            className="w-full p-2 border rounded-md text-black focus:ring focus:ring-blue-300"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
