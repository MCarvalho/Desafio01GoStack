const express = require('express');

const server = express();

server.use(express.json());

const projects = [];
let count = 0;

server.use((req, res, next) => {
    count++;
    console.log(`Contagem de requisicoes: ${count}`);
    return next();
})

function idExiste(req, res, next){
    const { id } = req.params;
    if(!projects.find(project => project.id == id)){
        return res.status(400).json({error: 'Id não encontrado'})
    }
    return next();
}

server.post('/projects', (req, res) => {
    const { id, title } = req.body;
    project = {
        id, 
        title, 
        tasks: []
    };
    projects.push(project);
    return res.json(projects);    
})

server.post('/projects/:id/task', idExiste, (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    project = projects.find(project => project.id == id);
    project.tasks.push(task);
    return res.json(project);    
})

server.get('/projects', (req, res) => {
    return res.json(projects);    
})

server.put('/projects/:id', idExiste, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    project = projects.find(project => project.id == id);
    project.title = title;
    return res.json(project);    
})

server.delete('/projects/:id', idExiste, (req, res) => {
    const { id } = req.params;
    index = projects.findIndex(project => project.id == id);
    projects.splice(index, 1);
    return res.send();
})

server.listen(3000);