
import React, { useState } from 'react';
import './Task.css';

const Task = ({ task, onEditClick, onDeleteClick, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleCheckboxChange = () => {
    const updatedTask = { ...editedTask, completed: !editedTask.completed };
    setEditedTask(updatedTask);
    onUpdate(updatedTask);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onUpdate(editedTask);
  };

  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <h3 className="task-title">{editedTask.title}</h3>
      </div>
      {isEditing ? (
        <textarea
          className="task-description"
          value={editedTask.description}
          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
        />
      ) : (
        <p className="task-description">{editedTask.description}</p>
      )}
      <div className="task-actions">
        {isEditing ? (
          <>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDeleteClick(task.id)}>Delete</button>
          </>
        )}
      </div>
      <div className="task-checkbox-container">
        <label className="task-checkbox-label">
          <input
            type="checkbox"
            checked={editedTask.completed}
            onChange={handleCheckboxChange}
            className="task-checkbox"
          />
          Completed
        </label>
      </div>
      <div className="task-priority">
        Priority: {editedTask.priority}
      </div>
    </div>
  );
};

export default Task;
