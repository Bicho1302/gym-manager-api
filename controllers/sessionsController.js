const { ObjectId } = require('mongodb');
const { getDB } = require('../db/connection');

const getAllSessions = async (req, res) => {
  try {
    const sessions = await getDB()
      .collection('sessions')
      .find()
      .toArray();

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving workout sessions'
    });
  }
};

const getSessionById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid session ID'
      });
    }

    const session = await getDB()
      .collection('sessions')
      .findOne({
        _id: new ObjectId(req.params.id)
      });

    if (!session) {
      return res.status(404).json({
        message: 'Workout session not found'
      });
    }

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving workout session'
    });
  }
};

const createSession = async (req, res) => {
  try {
    const session = {
      ...req.body,
      memberId: new ObjectId(req.body.memberId),
      trainerId: new ObjectId(req.body.trainerId)
    };

    const result = await getDB()
      .collection('sessions')
      .insertOne(session);

    res.status(201).json({
      message: 'Workout session created successfully',
      id: result.insertedId
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating workout session'
    });
  }
};

const updateSession = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid session ID'
      });
    }

    const session = {
      ...req.body,
      memberId: new ObjectId(req.body.memberId),
      trainerId: new ObjectId(req.body.trainerId)
    };

    const result = await getDB()
      .collection('sessions')
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: session }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: 'Workout session not found'
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: 'Error updating workout session'
    });
  }
};

const deleteSession = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid session ID'
      });
    }

    const result = await getDB()
      .collection('sessions')
      .deleteOne({
        _id: new ObjectId(req.params.id)
      });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: 'Workout session not found'
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting workout session'
    });
  }
};

module.exports = {
  getAllSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession
};