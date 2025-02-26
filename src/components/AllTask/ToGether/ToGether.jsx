import React from 'react';
import ToDo from '../ToDo/ToDo';
import InProgress from '../InProgress.jsx/InProgress';
import Done from '../Done/Done';

const ToGether = () => {
    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <ToDo />
            <InProgress />
            <Done />
        </div>
    );
};

export default ToGether;
