import { useState, useEffect } from 'react';
import TaskModal from '../Modal/TaskModal';
import { Draggable } from 'react-beautiful-dnd';

const Done = () => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const categories = ["ToDo", "InProgress", "Done"];

    useEffect(() => {
        fetch('http://localhost:5000/tasks')
            .then(response => response.json())
            .then(data => {
                setTasks(data.filter(task => task.category === "Done"));
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
        setTasks(prevTasks =>
            prevTasks.map(task => task._id === updatedTask._id ? updatedTask : task)
        );
    };

    const handleDeleteTask = (taskId) => {
        fetch(`http://localhost:5000/tasks/${taskId}`, {
            method: 'DELETE',
        })
            .then(() => {
                setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
            })
            .catch(error => {
                console.error("Error deleting task:", error);
            });
    };

    return (
        <div className='bg-gradient-to-t from-purple-600 text-white to-indigo-700  p-2 rounded-b-lg'>
            <h1 className="text-3xl font-bold mb-4">Done Tasks</h1>
            <ul>
                {tasks.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                            <li
                                className="bg-gray-400 p-4 m-2 rounded-md"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <h3 className="text-2xl font-bold">{task.title}</h3>
                                <p className='text-black'>{task.description}</p>
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
                        )}
                    </Draggable>
                ))}
            </ul>

            {showModal && selectedTask && (
                <TaskModal
                    task={selectedTask}
                    onClose={closeModal}
                    onUpdate={handleUpdateTask}
                    categories={categories}
                />
            )}
        </div>
    );
};

export default Done;
