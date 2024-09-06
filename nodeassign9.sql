use nodeassign;
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_id INT NOT NULL,
    customer_id INT NOT NULL,
    transaction_date DATE NOT NULL,
    amount INT NOT NULL,
    status VARCHAR(50),
    payment_method VARCHAR(50),
    currency VARCHAR(10)
);
INSERT INTO transactions (transaction_id, customer_id, transaction_date, amount, status, payment_method, currency) VALUES
(1001, 1, '2024-09-01', 500, 'completed', 'credit_card', 'USD'),
(1002, 2, '2024-09-02', 1500, 'pending', 'debit_card', 'EUR'),
(1003, 3, '2024-09-03', 2000, 'completed', 'paypal', 'GBP'),
(1004, 4, '2024-09-04', 750, 'failed', 'credit_card', 'INR'),
(1005, 5, '2024-09-05', 1200, 'completed', 'bank_transfer', 'USD'),
(1006, 6, '2024-09-06', 300, 'pending', 'credit_card', 'EUR'),
(1007, 7, '2024-09-07', 1800, 'completed', 'debit_card', 'GBP'),
(1008, 8, '2024-09-08', 950, 'completed', 'paypal', 'INR'),
(1009, 9, '2024-09-09', 400, 'failed', 'bank_transfer', 'USD'),
(1010, 10, '2024-09-10', 2200, 'completed', 'credit_card', 'EUR');

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL
);
ALTER TABLE transactions ADD COLUMN user_id INT;
UPDATE transactions SET user_id = 1 WHERE id IN (2, 4, 5, 12);
UPDATE transactions SET user_id = 2 WHERE id IN (6, 7, 8, 9, 10, 11);
