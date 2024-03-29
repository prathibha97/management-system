/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const { Types } = require('mongoose');
const Department = require('../models/Department');
const Board = require('../models/Board');
const Task = require('../models/Task');
const Employee = require('../models/Employee');
const TimeRecord = require('../models/TimeRecord');
const Client = require('../models/Client');
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
    nftTraitCount,
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
      nftTraitCount,
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

    const clientId = Types.ObjectId(client);

    // Update the projects field for the corresponding client
    await Client.findByIdAndUpdate(
      clientId,
      { $push: { projectHistory: project._id } },
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
    const project = await Project.findById(id).populate('boards').populate('assignee', 'name');
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
?@desc   Get all projects of employee
*@route  Get /api/projects/emp
*@access Private
*/

const getProjectByEmpId = async (req, res) => {
  const { _id } = req.user;
  try {
    const projects = await Project.find({ assignee: _id }).populate('boards').populate('tasks');

    if (!projects) {
      return res.status(404).json({ message: 'No projects found for the given assignee' });
    }

    return res.status(200).json(projects);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occurred while getting the project details' });
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
    const project = await Project.findById(id).populate('boards');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const projectId = Types.ObjectId(id);

    // Remove the project from the corresponding department
    await Department.updateOne({ projects: projectId }, { $pull: { projects: projectId } });

    // Remove the project from the projectHistory of the client
    await Client.updateOne({ projectHistory: projectId }, { $pull: { projectHistory: projectId } });

    // Remove the project from the projectHistory of all employees who have been assigned to it
    await Employee.updateMany(
      { 'projectHistory.project': projectId },
      { $pull: { projectHistory: { project: projectId } } }
    );

    // Delete project boards and associated tasks
    for (const board of project.boards) {
      await Task.deleteMany({ board: { $elemMatch: { boardId: board._id } } });
      await Board.findByIdAndDelete(board._id);
    }

    // Delete time records associated with the project
    await TimeRecord.deleteMany({ project: projectId });

    await project.remove();

    return res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: 'Error occurred while deleting the project' });
  }
};

/*
?@desc   Edit project
*@route  Put /api/projects/:id
*@access Private/Admin
*/

const editProject = async (req, res) => {
  const { id } = req.params;
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
    nftTraitCount,
    nftBaseDesignCount,
  } = req.body;

  // Convert team field into an array
  const teamArray = team ? team.split(',') : [];

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

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const previousAssignees = project.assignee;

    project.title = title ?? project.title;
    project.deadline = deadline ?? project.deadline;
    project.startDate = startDate ?? project.startDate;
    project.endDate = endDate ?? project.endDate;
    project.assignee = assigneeObjectIds.length > 0 ? assigneeObjectIds : project.assignee;
    project.client = client ?? project.client;
    project.department = department ?? project.department;
    project.designLink = designLink ?? project.designLink;
    project.specialNotes = specialNotes ?? project.specialNotes;
    project.category = category ?? project.category;
    project.nftCollectionSize = nftCollectionSize ?? project.nftCollectionSize;
    project.nftTraitCount = nftTraitCount ?? project.nftTraitCount;
    project.nftBaseDesignCount = nftBaseDesignCount ?? project.nftBaseDesignCount;
    project.scope = scopePath || project.scope;

    const updatedProject = await project.save();

    // Update employee project history
    const newAssignees = project.assignee;
    const addedAssignees = newAssignees.filter((assignee) => !previousAssignees.includes(assignee));
    const removedAssignees = previousAssignees.filter(
      (assignee) => !newAssignees.includes(assignee)
    );

    // Update added assignees' project history
    await Employee.updateMany(
      { _id: { $in: addedAssignees } },
      { $push: { projectHistory: updatedProject._id } }
    );

    // Update removed assignees' project history
    await Employee.updateMany(
      { _id: { $in: removedAssignees } },
      { $pull: { projectHistory: updatedProject._id } }
    );

    return res.status(200).json(updatedProject);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error occurred while updating the project' });
  }
};


module.exports = {
  createProject,
  getProjectById,
  getAllProjects,
  getProjectByEmpId,
  deleteProject,
  editProject,
};
