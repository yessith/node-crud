const Tasks = require('../models/Task')

module.exports = {
  // * Get all tasks
  tasks: (req, res) => {
    Tasks.find()
      .lean()
      .then(tasks => {
        res.render('tasks/index', { tasks })
      })
      .catch(error => res.send(error))
  },

  // * Create new task
  addTaskForm: (req, res) => {
    res.render('tasks/addTaskForm')
  },
  createNewTask: (req, res) => {
    const { title, description } = req.body
    const newTask = new Tasks({ title, description })
    newTask
      .save()
      .then(() => res.redirect('/tasks'))
      .catch(error => res.send(error))
  },

  // * Edit single task
  editTaskForm: (req, res) => {
    const taskId = req.params.id
    Tasks.findById(taskId)
      .lean()
      .then(task => {
        res.render('tasks/editTaskForm', { task })
      })
      .catch(error => res.send(error))
  },
  editTask: (req, res) => {
    const { title, description } = req.body
    const taskId = req.params.id
    Tasks.findOneAndUpdate(taskId, { title, description })
      .then(() => res.redirect('/tasks'))
      .catch(error => res.send(error))
  },

  // * Delete single task
  deleteTask: (req, res) => {
    const taskId = req.params.id
    Tasks.findOneAndDelete(taskId)
      .then(() => res.redirect('/tasks'))
      .catch(error => res.send(error))
  }
}
