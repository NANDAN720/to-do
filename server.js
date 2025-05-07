// Import required modules
const express = require('express');
const cors = require('cors');
const path = require('path');

// Create an Express app
const app = express();

// Middlewares
app.use(cors());              // Allow cross-origin requests
app.use(express.json());      // Parse JSON request bodies

// Serve static files from the current directory
app.use(express.static(__dirname));

// In-memory task list
let tasks = [];

// ROUTES

// 1. Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// 2. Add a new task
app.post('/tasks', (req, res) => {
  const { taskDesc } = req.body;

  const newTask = {
    id: Date.now(),           // Simple unique ID
    taskDesc: taskDesc,
    status: false             // New tasks are incomplete
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// 3. Update a task status
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  const task = tasks.find(t => t.id === id);

  if (task) {
    task.status = status;
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// 4. Delete a specific task
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== id);
  res.status(204).send();   // No content
});

// 5. Delete all tasks
app.delete('/tasks', (req, res) => {
  tasks = [];
  res.status(204).send();
});

// Define a route handler for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'app.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
