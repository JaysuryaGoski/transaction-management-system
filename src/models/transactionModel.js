const db = require('../db');

const Transaction = {
  getAll: (callback) => {
    const query = 'SELECT * FROM transactions';
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM transactions WHERE id = ?';
    db.query(query, [id], callback);
  },

  create: (newTransaction, callback) => {
    const query = 'INSERT INTO transactions SET ?';
    db.query(query, newTransaction, callback);
  },

  update: (id, updatedTransaction, callback) => {
    const query = 'UPDATE transactions SET ? WHERE id = ?';
    db.query(query, [updatedTransaction, id], callback);
  },

  requestDeletion: (deletionRequest, callback) => {
    const query = 'INSERT INTO deletion_requests SET ?';
    db.query(query, deletionRequest, callback);
  },

  getAllWithUsernames: (callback) => {
    const query = `
      SELECT transactions.*, users.username AS added_by
      FROM transactions
      JOIN users ON transactions.user_id = users.id
    `;
    db.query(query, callback);
  },

  getDeletionRequests: (callback) => {
    const query = `
      SELECT deletion_requests.*, users.username AS requested_by
      FROM deletion_requests
      JOIN users ON deletion_requests.user_id = users.id
    `;
    db.query(query, callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM transactions WHERE id = ?';
    db.query(query, [id], callback);
  },

  denyDeletionRequest: (id, callback) => {
    const query = 'DELETE FROM deletion_requests WHERE id = ?';
    db.query(query, [id], callback);
  }
};

module.exports = Transaction;
