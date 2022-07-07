const { Router } = require('express')
const {
  addTaskForm,
  createNewTask,
  deleteTask,
  editTask,
  editTaskForm,
  tasks
} = require('../controllers/tasks.controller')
const taskRoutes = Router()

taskRoutes.get('/tasks', tasks)
taskRoutes.get('/tasks/add', addTaskForm)
taskRoutes.post('/tasks/new-task', createNewTask)
taskRoutes.get('/tasks/edit/:id', editTaskForm)
taskRoutes.put('/tasks/edit-task/:id', editTask)
taskRoutes.delete('/tasks/delete/:id', deleteTask)

module.exports = taskRoutes
