const Tasks = require('../models/Task')

module.exports = {
  // * Get all tasks
  tasks: (req, res) => {
    const user = req.user.id
    Tasks.find({ user })
      .sort({ createdAt: 'desc' })
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
    const user = req.user.id
    const newTask = new Tasks({ title, description, user })
    newTask
      .save()
      .then(() => {
        req.flash('success_msg', 'Task Added Successfully')
        res.redirect('/tasks')
      })
      .catch(error => res.send(error))
  },

  // * Edit single task
  editTaskForm: (req, res) => {
    const taskId = req.params.id
    const user = req.user.id
    Tasks.findById(taskId)
      .lean()
      .then(task => {
        if (task.user !== user) {
          return res.redirect('/tasks')
        }
        res.render('tasks/editTaskForm', { task })
      })
      .catch(error => res.send(error))
  },

  editTask: (req, res) => {
    const { title, description } = req.body
    const taskId = req.params.id

    Tasks.findByIdAndUpdate(taskId, { title, description })
      .then(() => {
        req.flash('success_msg', 'Task Updated Successfully')
        res.redirect('/tasks')
      })
      .catch(error => res.send(error))
  },

  // * Delete single task
  deleteTask: (req, res) => {
    const taskId = req.params.id
    const user = req.user.id

    Tasks.findByIdAndDelete(taskId)
      .then(task => {
        if (task.user !== user) {
          return res.redirect('/tasks')
        }
        req.flash('success_msg', 'Task Deleted Successfully')
        res.redirect('/tasks')
      })
      .catch(error => res.send(error))
  }
}
