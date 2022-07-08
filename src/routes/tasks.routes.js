const { Router } = require('express')
const {
  addTaskForm,
  createNewTask,
  deleteTask,
  editTask,
  editTaskForm,
  tasks
} = require('../controllers/tasks.controller')
const { isAuthenticated } = require('../helpers/validateSessionUser')
const taskRoutes = Router()

taskRoutes.get('/tasks', isAuthenticated, tasks)
taskRoutes.get('/tasks/add', isAuthenticated, addTaskForm)
taskRoutes.post('/tasks/new-task', isAuthenticated, createNewTask)
taskRoutes.get('/tasks/edit/:id', isAuthenticated, editTaskForm)
taskRoutes.put('/tasks/edit-task/:id', isAuthenticated, editTask)
taskRoutes.delete('/tasks/delete/:id', isAuthenticated, deleteTask)

module.exports = taskRoutes
