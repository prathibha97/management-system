const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
  depId: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
    }
  ]
},
  {
    timestamps: true
  })

module.exports = mongoose.models.Department || mongoose.model('Department', departmentSchema)
