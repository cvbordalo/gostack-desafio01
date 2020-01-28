const express = require('express');
const server = express();

// tells express to read json from req.body
server.use(express.json());

const projects = [];

// lists all projects
server.get('/projects', (req, res) => {
  return res.json(projects);
});

// receives id and title, and registers a new project
server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

// updates projects
server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id == id);

  project.title = title;

  return res.json(project);
});

// deletes projects
server.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(project => project.id == id);

  projects.splice(projectIndex, 1);

  return res.send();
});

//creates tasks
server.post('/projects/:id/tasks', (req, res) => {
  const { task } = req.body;
  const { id } = req.params;

  const project = projects.find(project => project.id == id);

  project.tasks.push(task);

  return res.json(project);


});

server.listen(3000);