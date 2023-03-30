const Employee = require('../models/Employee');
const Experience = require('../models/Experience');

/*
?@desc   Add experience
*@route  Post /api/experience
*@access Private
*/

const addExperience = async (req, res) => {
  const { empNo } = req.user;
  const { position, company, startDate, endDate } = req.body;

  try {
    const newExperience = await Experience.create({
      empNo,
      position,
      company,
      startDate,
      endDate,
    });

    // Push the new experience to the employmentHistory array on the Employee model
    await Employee.findOneAndUpdate({ empNo }, { $push: { employmentHistory: newExperience } });

    res.status(201).json(newExperience);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getAllExperience = async (req, res) => {
  try {
    const experience = await Experience.find({});
    res.status(200).json(experience);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getExperienceById = async (req, res) => {
  const { empNo } = req.user;
  try {
    const experience = await Experience.find({ empNo });
    res.status(200).json(experience);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const removeExperience = async (req, res) => {
  const { id } = req.params;
  try {
    await Experience.findByIdAndDelete(id);
    res.status(200).json({ message: 'Experience removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  addExperience,
  getAllExperience,
  getExperienceById,
  removeExperience,
};
