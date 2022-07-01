const { Schema, model } = require('mongoose')

// * Definicion del schema notes o lo que es igual, definicion de una coleccion de mongodb
const NoteSchema = new Schema(
  {
    title: {
      type: String,
      require: true
    },
    content: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Notes', NoteSchema)
