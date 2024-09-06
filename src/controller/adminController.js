const Transaction = require('../models/transactionModel');
const User = require('../models/userModels');

exports.viewTransactions = (req, res) => {
  Transaction.getAllWithUsernames((err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

exports.viewDeletionRequests = (req, res) => {
  Transaction.getDeletionRequests((err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

exports.approveDeletion = (req, res) => {
  const id = req.params.id;
  Transaction.delete(id, (err, result) => {
    if (err) res.status(500).send(err);
    else res.json({ message: 'Transaction deleted successfully' });
  });
};

exports.denyDeletion = (req, res) => {
  const id = req.params.id;
  Transaction.denyDeletionRequest(id, (err, result) => {
    if (err) res.status(500).send(err);
    else res.json({ message: 'Deletion request denied' });
  });
};

exports.createUser = (req, res) => {
  const newUser = {
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
  };
  User.create(newUser, (err, result) => {
    if (err) res.status(500).send(err);
    else res.status(201).json({ message: 'User created successfully' });
  });
};
