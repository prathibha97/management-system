/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const Department = require('../models/Department');
const Employee = require('../models/Employee');
const Project = require('../models/Project');

/*
?@desc   Create new project
*@route  Post /api/projects
*@access Private/Admin
*/

const createProject = async (req, res) => {
  const { title, description, deadline, startDate, endDate, assignee, client, department } =
    req.body;

  try {
    const project = await Project.create({
      title,
      description,
      deadline,
      startDate,
      endDate,
      assignee,
      client,
      department,
    });

    // Update project history for each employee assigned to the project
    for (const employeeId of assignee) {
      await Employee.findByIdAndUpdate(employeeId, {
        $push: { projectHistory: { project: project._id } },
      });
    }

    // Add the project to the corresponding department
    await Department.findByIdAndUpdate(
      department,
      { $push: { projects: project._id } },
      { new: true }
    );

    return res.status(201).json({
      message: 'Project created successfully',
      project,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occured while creating the project' });
  }
};

/*
?@desc   Get project by id
*@route  Post /api/projects/:id
*@access Private
*/

const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id).populate('boards');
    return res.status(200).json(project);
  } catch (err) {
    return res.status(500).json({ message: 'Error occured while getting the project details' });
  }
};

/*
?@desc   Get all projects
*@route  Get /api/projects
*@access Private/Admin
*/

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    return res.status(200).json(projects);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occured while getting the project details' });
  }
};

/*
?@desc   Get all projects
*@route  Get /api/projects/emp
*@access Private
*/

const getProjectByEmpId = async (req, res) => {
  const { _id } = req.user;
  try {
    const projects = await Project.find({ assignee: _id }).populate('boards').populate('tasks');
    return res.status(200).json(projects);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occured while getting the project details' });
  }
};

module.exports = {
  createProject,
  getProjectById,
  getAllProjects,
  getProjectByEmpId,
};
