const Department = require("../models/Department")

const createDepartment = async (req, res) => {
  const { id, name, description, empNo } = req.body
  try {
    const newDepartment = await Department.create({
      depId: id,
      name,
      description,
      employees: [empNo],
    })

    res.status(201).json(newDepartment)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
    res.status(200).json(departments)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getDepartmentById = async (req, res) => {
  const { id } = req.params
  try {
    const department = await Department.find({ depId: id })
    res.status(200).json(department)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateDepartment = async (req, res) => {
  const { id } = req.params
  const { depId, name, description, empNo } = req.body
  try {
    const department = await Department.findOne({depId: id})
    if(department){
      department.depId = depId
      department.name = name
      department.description = description
      department.employees = [empNo]
    }

    const updatedDepartment = await department.save()
    res.status(200).json(updatedDepartment)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const deleteDepartment  = async (req, res) => {
try {
  await Department.deleteOne({depId: req.params.id})
  res.status(200).json({message: "Department deleted successfully"})
} catch (err) {
  res.status(500).json({ message: err.message })
}
}

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment
}