const Tasks = require('../models/Task')

module.exports = {
  tasks: async (req, res) => {
    // const tasks = await Tasks.find()
    const tasks = await Tasks.find().lean()
    res.render('tasks/index', { tasks })
  },
  addTaskForm: (req, res) => {
    res.render('tasks/addTaskForm')
  },
  createNewTask: async (req, res) => {
    const { title, description } = req.body
    const newTask = new Tasks({ title, description })
    await newTask.save()
    res.redirect('/tasks')
  },
  editTaskForm: (req, res) => {
    res.render('tasks/editTaskForm')
  },
  editTask: (req, res) => {
    res.send('<h1>edit task put</h1>')
  },
  deleteTask: async (req, res) => {
    const taskId = req.params.id
    await Tasks.findByIdAndDelete(taskId)
    res.redirect('/tasks')
  }
}
