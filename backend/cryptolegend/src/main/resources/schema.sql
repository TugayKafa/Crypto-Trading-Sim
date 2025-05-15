CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE accounts (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    balance DECIMAL(18, 2) DEFAULT 10000.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL,
    crypto_symbol VARCHAR(10) NOT NULL,
    amount DECIMAL(18, 8) NOT NULL,
    price_per_unit DECIMAL(18, 2) NOT NULL,
    transaction_type ENUM('BUY', 'SELL') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON DELETE CASCADE
);

CREATE TABLE holdings (
    holding_id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL,
    crypto_symbol VARCHAR(10) NOT NULL,
    quantity DECIMAL(18, 8) NOT NULL,
    average_price DECIMAL(18, 2) NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON DELETE CASCADE,
    UNIQUE(account_id, crypto_symbol)
);