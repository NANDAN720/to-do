const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todoapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define Task schema
const Task = mongoose.model('Task', {
    taskDesc: String,
    status: Boolean
});

// Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname));

// API Routes
app.get('/api/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
});

app.delete('/api/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
});

app.put('/api/tasks/:id', async (req, res) => {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.sendStatus(200);
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'app.html'));
});

// Start server
app.listen(3000, () => console.log('Server running at http://localhost:3000'));
