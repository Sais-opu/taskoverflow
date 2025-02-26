import React from 'react';

const InProgress = ({ tasks, openModal }) => {
    // Check if 'tasks' is an array before filtering
    const filteredTasks = Array.isArray(tasks) ? tasks.filter((task) => task.category === 'In Progress') : [];

    return (
        <div>
            <h2>In Progress</h2>
            <div>
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <div key={task._id}>
                            <h3>{task.title}</h3>
                            <button onClick={() => openModal(task)}>Edit</button>
                        </div>
                    ))
                ) : (
                    <p>No tasks in progress</p>
                )}
            </div>
        </div>
    );
};

export default InProgress;
