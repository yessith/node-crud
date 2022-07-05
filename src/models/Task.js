const { Schema, model } = require('mongoose')

// * Definicion del schema notes o lo que es igual, definicion de una coleccion de mongodb
const TaskSchema = new Schema(
  {
    title: {
      type: String,
      require: true
    },
    description: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Tasks', TaskSchema)
