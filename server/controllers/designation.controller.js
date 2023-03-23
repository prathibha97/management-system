const Designation = require('../models/Designation');

/* 
?@desc   Create a new designation
*@route  Post /api/designations
*@access Private/Admin
*/

const createDesignation = async (req, res) => {
  const { designation, department, basicSalary, advance, maxAdvance, noOfAdvances, providentFund } =
    req.body;
  try {
    const newDesignation = await Designation.create({
      designation,
      department,
      basicSalary,
      advance,
      maxAdvance,
      noOfAdvances,
      providentFund,
    });
    res.status(201).json(newDesignation);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to create designation' });
  }
};

/* 
?@desc   Get all designations
*@route  Get /api/designations
*@access Private/Admin
*/

const getAllDesignations = async (req, res) => {
  try {
    const designations = await Designation.find({});
    res.status(200).json(designations);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to fetch designations' });
  }
};

module.exports = {
  createDesignation,
  getAllDesignations,
};
