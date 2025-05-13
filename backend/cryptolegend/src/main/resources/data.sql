INSERT INTO users (user_id, username, email) VALUES
(1, 'crypto_king', 'king@example.com'),
(2, 'trade_master', 'master@example.com'),
(3, 'hodl_guru', 'guru@example.com');

INSERT INTO accounts (account_id, user_id, balance) VALUES
(1, 1, 10000.00),
(2, 2, 20000.00),
(3, 3, 15000.00);

INSERT INTO transactions (account_id, crypto_symbol, amount, price_per_unit, transaction_type) VALUES
(1, 'BTC', 0.005, 25000.00, 'BUY'),
(2, 'ETH', 0.1, 1800.00, 'BUY'),
(3, 'ADA', 1000, 0.35, 'BUY');
