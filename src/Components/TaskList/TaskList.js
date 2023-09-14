import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Task from '../Task/Task';
import './TaskList.css';

const TaskList = ({ tasks, onTaskUpdate, onDeleteTask }) => {
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handlePriorityChange = (e) => {
    setSelectedPriority(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTasks = tasks
    .filter((task) => selectedPriority === 'All' || task.priority === selectedPriority)
    .filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedTasks = Array.from(filteredTasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    onTaskUpdate(reorderedTasks);
  };

  return (
    <div>
      <div className="task-search-filter">
       <h2>Task List ⬇️ </h2>
        <div className="task-search">
          <label htmlFor="search">Search by Title:</label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
          />
        </div>
        <div className="task-filter">
          <label htmlFor="priority">Filter by Priority:</label>
          <select id="priority" value={selectedPriority} onChange={handlePriorityChange}>
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="taskList">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="task-list">
              {filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={`task-${task.id}`} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Task
                        task={task}
                        onDeleteClick={() => onDeleteTask(task.id)}
                        onUpdate={(updatedTask) => onTaskUpdate(updatedTask)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskList;
