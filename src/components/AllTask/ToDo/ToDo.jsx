import { useState, useEffect } from 'react';
import TaskModal from '../Modal/TaskModal';

const ToDo = () => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const categories = ["ToDo", "InProgress", "Done"];

    useEffect(() => {
        // Fetch tasks from the backend when the component mounts
        fetch('http://localhost:5000/tasks')
            .then(response => response.json())
            .then(data => {
                setTasks(data.filter(task => task.category === "ToDo"));
            })
            .catch(error => {
                console.error("Error fetching tasks:", error);
            });
    }, []);

    const openModal = (task) => {
        setSelectedTask(task);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleUpdateTask = (updatedTask) => {
        // Update the task in the state immediately after it has been updated in the database
        setTasks(prevTasks => 
            prevTasks.map(task => task._id === updatedTask._id ? updatedTask : task)
        );
    };

    const handleDeleteTask = (taskId) => {
        fetch(`http://localhost:5000/tasks/${taskId}`, {
            method: 'DELETE',
        })
            .then(() => {
                setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId)); // Remove task from state
            })
            .catch(error => {
                console.error("Error deleting task:", error);
            });
    };

    return (
        <div className='bg-gray-700 p-2 rounded-b-lg'>
            <h1 className="text-2xl font-bold mb-4">To-Do Tasks</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task._id} className="bg-gray-400 p-2 m-2 rounded-md">
                        <h3 className="text-xl">{task.title}</h3>
                        <p>{task.description}</p>
                        <p><strong>Due Date:</strong> {task.dueDate}</p>
                        <div className="flex space-x-2 mt-2">
                            <button
                                onClick={() => openModal(task)}
                                className="bg-purple-700 text-white p-2 rounded-md hover:bg-blue-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteTask(task._id)}
                                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {showModal && selectedTask && (
                <TaskModal
                    task={selectedTask}
                    onClose={closeModal}
                    onUpdate={handleUpdateTask} // Pass the update function to the modal
                    categories={categories}
                />
            )}
        </div>
    );
};

export default ToDo;
