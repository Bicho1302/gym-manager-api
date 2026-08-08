const { ObjectId } = require('mongodb');
const { getDB } = require('../db/connection');

const getAllMembers = async (req, res) => {
  try {
    const members = await getDB()
      .collection('members')
      .find()
      .toArray();

    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving members' });
  }
};

const getMemberById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid member ID' });
    }

    const member = await getDB()
      .collection('members')
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving member' });
  }
};

const createMember = async (req, res) => {
  try {
    const result = await getDB()
      .collection('members')
      .insertOne(req.body);

    res.status(201).json({
      message: 'Member created successfully',
      id: result.insertedId
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating member' });
  }
};

const updateMember = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid member ID' });
    }

    const result = await getDB()
      .collection('members')
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error updating member' });
  }
};

const deleteMember = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid member ID' });
    }

    const result = await getDB()
      .collection('members')
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting member' });
  }
};

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember
};