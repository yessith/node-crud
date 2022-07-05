const { Router } = require('express')
const {
  addTaskForm,
  createNewTask,
  deleteTask,
  editTask,
  editTaskForm,
  tasks
} = require('../controllers/tasks.controller')
const taskRouter = Router()

taskRouter.get('/tasks', tasks)
taskRouter.get('/tasks/add', addTaskForm)
taskRouter.post('/tasks/new-task', createNewTask)
taskRouter.get('/tasks/edit/:id', editTaskForm)
taskRouter.put('/tasks/edit-task/:id', editTask)
taskRouter.delete('/tasks/delete/:id', deleteTask)

module.exports = taskRouter
