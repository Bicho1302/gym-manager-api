const { ObjectId } = require('mongodb');
const { getDB } = require('../db/connection');

const getAllPlans = async (req, res) => {
  try {
    const plans = await getDB()
      .collection('plans')
      .find()
      .toArray();

    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving membership plans' });
  }
};

const getPlanById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid plan ID' });
    }

    const plan = await getDB()
      .collection('plans')
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!plan) {
      return res.status(404).json({ message: 'Membership plan not found' });
    }

    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving membership plan' });
  }
};

const createPlan = async (req, res) => {
  try {
    const result = await getDB()
      .collection('plans')
      .insertOne(req.body);

    res.status(201).json({
      message: 'Membership plan created successfully',
      id: result.insertedId
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating membership plan' });
  }
};

const updatePlan = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid plan ID' });
    }

    const result = await getDB()
      .collection('plans')
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Membership plan not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error updating membership plan' });
  }
};

const deletePlan = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid plan ID' });
    }

    const result = await getDB()
      .collection('plans')
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Membership plan not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting membership plan' });
  }
};

module.exports = {
  getAllPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan
};