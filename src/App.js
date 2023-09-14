import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './Components/TaskList/TaskList';
import TaskForm from './Components/TaskForm/TaskForm';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Auth/Register/Register';
import Login from './Auth/Login/Login';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './Auth/Firebaseconfig';

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', description: 'Description 1', dueDate: '', completed: false, priority: 'High' },
    { id: 2, title: 'Task 2', description: 'Description 2', dueDate: '', completed: false, priority: 'Low' },
    // Add more tasks as needed
  ]);

  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, update the user state
        setUser(user);
      } else {
        // User is signed out, set user state to null
        setUser(null);
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  const handleAddTask = (newTask) => {
    const taskId = tasks.length + 1;
    const taskWithId = { id: taskId, ...newTask };

    setTasks([...tasks, taskWithId]);
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditingTask(taskToEdit);
  };

  const handleUpdateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <h1>Task Management App</h1>
     

        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <>
                {user && (
                  <div className="logout-container">
                    <button className="logout-button" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
                  <TaskForm
                    onSubmit={editingTask ? handleUpdateTask : handleAddTask}
                    onCancel={() => setEditingTask(null)}
                    initialTask={editingTask || { title: '', description: '', dueDate: '', completed: false }}
                  />
                  <TaskList
                    tasks={tasks}
                    onDeleteTask={handleDeleteTask}
                    onEdit={handleEditTask}
                    onTaskUpdate={handleUpdateTask}
                  />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Login Page */}
          <Route path="/login" element={<Login />} />

          {/* Register Page */}
          <Route path="/register" element={<Register />} />

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
