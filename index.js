const express = require('express');
const server = express();

// tells express to read json from req.body
server.use(express.json());

const projects = [];

// counts and logs how many requisitions are made
function logRequests(req, res, next) {

  console.count("Número de requisições");

  return next();
}

server.use(logRequests);

// middleware to check if a project exists
function checkProjectExists(req, res, next) {
  if (!req.body.id) {
    return res.status(400).json({ error: 'Project does not exists'})
  }

  return next();
};

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
server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id == id);

  project.title = title;

  return res.json(project);
});

// deletes projects
server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(project => project.id == id);

  projects.splice(projectIndex, 1);

  return res.send();
});

//creates tasks
server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { task } = req.body;
  const { id } = req.params;

  const project = projects.find(project => project.id == id);

  project.tasks.push(task);

  return res.json(project);


});

server.listen(3000);