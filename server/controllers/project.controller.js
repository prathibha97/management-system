/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const { Types } = require('mongoose');
const Department = require('../models/Department');
const Employee = require('../models/Employee');
const Project = require('../models/Project');
const upload = require('../services/fileUpload');

/*
?@desc   Create new project
*@route  Post /api/projects
*@access Private/Admin
*/

const createProject = async (req, res) => {
  const {
    title,
    deadline,
    startDate,
    endDate,
    team,
    client,
    department,
    designLink,
    specialNotes,
    category,
    nftCollectionSize,
    nftTradeCount,
    nftBaseDesignCount,
  } = req.body;

  // Convert team field into an array
  const teamArray = team.split(',');

  const scopePath = req.files?.projectScope?.[0]?.path ?? '';

  // Upload files using the "upload" middleware
  await upload.any()(req, res, () => {});

  const assigneeObjectIds = teamArray
    .map((employeeId) => {
      const isValidEmpObjectId = Types.ObjectId.isValid(employeeId);

      if (!isValidEmpObjectId) {
        return null;
      }

      return Types.ObjectId(employeeId);
    })
    .filter((objectId) => objectId !== null);

  if (!scopePath) {
    return res.status(400).json({ message: 'Project scope file is required' });
  }

  try {
    const project = await Project.create({
      title,
      deadline,
      startDate,
      endDate,
      assignee: assigneeObjectIds,
      client,
      department,
      scope: scopePath,
      designLink,
      specialNotes,
      category,
      nftCollectionSize,
      nftTradeCount,
      nftBaseDesignCount,
    });

    // Update project history for each employee assigned to the project
    for (const employeeId of teamArray) {
      const employee = await Employee.findById(employeeId);

      if (!employee) {
        return res.status(404).json({ message: `Employee with ID ${employeeId} not found` });
      }

      await Employee.findByIdAndUpdate(employeeId, {
        $push: { projectHistory: { project: project._id } },
      });
    }

    const isValidDeptObjectId = Types.ObjectId.isValid(department);

    if (!isValidDeptObjectId) {
      return res.status(400).json({ message: 'Invalid department ID' });
    }

    const departmentId = Types.ObjectId(department);

    // Update the projects field for the corresponding department
    await Department.findByIdAndUpdate(
      departmentId,
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
    const projects = await Project.find()
      .populate('client')
      .populate('department')
      .populate('assignee', 'name');
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

/*
?@desc   Delete project
*@route  Delete /api/projects/:id
*@access Private/Admin
*/

const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const projectId = Types.ObjectId(id);

    // Remove the project from the corresponding department
    await Department.updateOne(
      { 'projects.project': projectId },
      { $pull: { projects: { project: projectId } } }
    );

    // Remove the project from the projectHistory of all employees who have been assigned to it
    await Employee.updateMany(
      { 'projectHistory.project': projectId },
      { $pull: { projectHistory: { project: projectId } } }
    );

    await project.remove();

    return res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: 'Error occurred while deleting the project' });
  }
};


module.exports = {
  createProject,
  getProjectById,
  getAllProjects,
  getProjectByEmpId,
  deleteProject,
};
