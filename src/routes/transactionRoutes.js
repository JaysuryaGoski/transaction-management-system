const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transactionController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/', authMiddleware, transactionController.getAllTransactions);
router.get('/:id', authMiddleware, transactionController.getTransactionById);
router.post('/', authMiddleware, roleMiddleware('User'), transactionController.createTransaction);
router.put('/:id', authMiddleware, roleMiddleware('User'), transactionController.updateTransaction);
router.post('/request-deletion/:id', authMiddleware, roleMiddleware('User'), transactionController.requestDeletion);

module.exports = router;
