import React from 'react';

const Done = ({ tasks, openModal }) => {
    // Ensure tasks is defined and default to an empty array if undefined
    const taskList = tasks || [];

    return (
        <div>
            <h2>Done</h2>
            <div>
                {taskList.length > 0 ? (
                    taskList.map((task) => (
                        <div key={task._id}>
                            <h3>{task.title}</h3>
                            <button onClick={() => openModal(task)}>Edit</button>
                        </div>
                    ))
                ) : (
                    <p>No tasks in Done</p>
                )}
            </div>
        </div>
    );
};

export default Done;
