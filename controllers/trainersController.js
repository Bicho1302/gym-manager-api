const { ObjectId } = require('mongodb');
const { getDB } = require('../db/connection');

const getAllTrainers = async (req, res) => {
  try {
    const trainers = await getDB()
      .collection('trainers')
      .find()
      .toArray();

    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving trainers'
    });
  }
};

const getTrainerById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid trainer ID'
      });
    }

    const trainer = await getDB()
      .collection('trainers')
      .findOne({
        _id: new ObjectId(req.params.id)
      });

    if (!trainer) {
      return res.status(404).json({
        message: 'Trainer not found'
      });
    }

    res.status(200).json(trainer);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving trainer'
    });
  }
};

const createTrainer = async (req, res) => {
  try {
    const result = await getDB()
      .collection('trainers')
      .insertOne(req.body);

    res.status(201).json({
      message: 'Trainer created successfully',
      id: result.insertedId
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating trainer'
    });
  }
};

const updateTrainer = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid trainer ID'
      });
    }

    const result = await getDB()
      .collection('trainers')
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: 'Trainer not found'
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: 'Error updating trainer'
    });
  }
};

const deleteTrainer = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid trainer ID'
      });
    }

    const result = await getDB()
      .collection('trainers')
      .deleteOne({
        _id: new ObjectId(req.params.id)
      });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: 'Trainer not found'
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting trainer'
    });
  }
};

module.exports = {
  getAllTrainers,
  getTrainerById,
  createTrainer,
  updateTrainer,
  deleteTrainer
};