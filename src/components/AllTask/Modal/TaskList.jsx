import React, { useState, useEffect } from 'react';
import Done from '../Done/Done';
import InProgress from '../InProgress.jsx/InProgress';
import ToDo from '../ToDo/ToDo';
import TaskModal from './TaskModal';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const categories = ['To Do', 'In Progress', 'Done'];


    const fetchTasks = () => {
        fetch('https://task-management-server-weld.vercel.app/tasks')
            .then((response) => response.json())
            .then((data) => setTasks(data))
            .catch((error) => console.error('Error fetching tasks:', error));
    };

    useEffect(() => {
        fetchTasks();
    }, []);


    const handleTaskUpdate = () => {
        fetchTasks();
    };

    const openModal = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    return (
        <div>

            <ToDo tasks={tasks.filter((task) => task.category === 'To Do')} openModal={openModal} />
            <InProgress tasks={tasks.filter((task) => task.category === 'In Progress')} openModal={openModal} />
            <Done tasks={tasks.filter((task) => task.category === 'Done')} openModal={openModal} />


            {isModalOpen && (
                <TaskModal
                    task={selectedTask}
                    onClose={closeModal}
                    categories={categories}
                    onUpdate={handleTaskUpdate}  // Use this to trigger fetch after updating task
                />
            )}
        </div>
    );
};

export default TaskList;
