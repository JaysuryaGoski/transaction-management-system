const db = require('../db');
const bcrypt = require('bcryptjs');

const User = {
  create: (newUser, callback) => {
    bcrypt.hash(newUser.password, 10, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      db.query('INSERT INTO users SET ?', newUser, callback);
    });
  },

  findByUsername: (username, callback) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], callback);
  }
};

module.exports = User;
