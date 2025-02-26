


import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ToDo from '../ToDo/ToDo';
import InProgress from '../InProgress.jsx/InProgress';
import Done from '../Done/Done';

const ToGether = () => {
    const handleDragEnd = (result) => {
        
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <Droppable droppableId="todo">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <ToDo />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId="inProgress">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <InProgress />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId="done">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <Done />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
};

export default ToGether;

