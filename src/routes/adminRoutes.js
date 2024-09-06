const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

router.get('/view-transactions', adminController.viewTransactions);
router.get('/deletion-requests', adminController.viewDeletionRequests);
router.post('/approve-deletion/:id', adminController.approveDeletion);
router.post('/deny-deletion/:id', adminController.denyDeletion);
router.post('/create-user', adminController.createUser);

module.exports = router;
