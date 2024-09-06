const Transaction = require('../models/transactionModel');

exports.getAllTransactions = (req, res) => {
  Transaction.getAll((err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

exports.getTransactionById = (req, res) => {
  const id = req.params.id;
  Transaction.getById(id, (err, result) => {
    if (err) res.status(500).send(err);
    else res.json(result);
  });
};

exports.createTransaction = (req, res) => {
  const newTransaction = {
    transaction_id: req.body.transaction_id,
    customer_id: req.body.customer_id,
    transaction_date: req.body.transaction_date,
    amount: req.body.amount,
    status: req.body.status,
    payment_method: req.body.payment_method,
    currency: req.body.currency,
    user_id: req.user.id // Assuming req.user contains the authenticated user's info
  };
  Transaction.create(newTransaction, (err, result) => {
    if (err) res.status(500).send(err);
    else res.status(201).json({ message: 'Transaction created successfully' });
  });
};

exports.updateTransaction = (req, res) => {
  const id = req.params.id;
  const updatedTransaction = {
    transaction_id: req.body.transaction_id,
    customer_id: req.body.customer_id,
    transaction_date: req.body.transaction_date,
    amount: req.body.amount,
    status: req.body.status,
    payment_method: req.body.payment_method,
    currency: req.body.currency
  };
  Transaction.update(id, updatedTransaction, (err, result) => {
    if (err) res.status(500).send(err);
    else res.json({ message: 'Transaction updated successfully' });
  });
};

exports.requestDeletion = (req, res) => {
  const deletionRequest = {
    transaction_id: req.params.id,
    user_id: req.user.id // Assuming req.user contains the authenticated user's info
  };
  Transaction.requestDeletion(deletionRequest, (err, result) => {
    if (err) res.status(500).send(err);
    else res.json({ message: 'Deletion request submitted' });
  });
};
