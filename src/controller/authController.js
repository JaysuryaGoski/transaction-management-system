const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModels');

exports.register = (req, res) => {
  const newUser = {
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
  };
  User.create(newUser, (err, result) => {
    if (err) res.status(500).send(err);
    else res.status(201).json({ message: 'User registered successfully' });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  User.findByUsername(username, (err, users) => {
    if (err) res.status(500).send(err);
    if (users.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = users[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) res.status(500).send(err);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
};
