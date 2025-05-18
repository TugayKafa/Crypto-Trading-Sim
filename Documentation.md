# CryptoLegend

## Table of Contents
1. [Introduction](#introduction)
2. [Project Overview](#project-overview)
3. [Use Cases](#use-cases)
4. [System Architecture](#system-architecture)
5. [Database Schema](#database-schema)
6. [Future Enhancements](#future-enhancements)
7. [Conclusion](#conclusion)

---

## 1. Introduction

The Crypto Legend is the ultimate crypto trading platform, delivering an exceptional user experience for seamless and efficient trading.

Built on the robust Spring 6 framework, it ensures high performance, scalability, and reliability. The front end is crafted using HTML, CSS, and React, providing a modern and responsive interface for traders.

---

## 2. Project Overview

## 2.1 Business Needs

As the world of cryptocurrency continues to grow, traders need powerful, real-time tools to make informed investment decisions. CryptoLegend aims to bridge this gap by offering a robust, user-friendly platform that caters to both novice and experienced traders.

Key business needs addressed by **CryptoLegend**:

**Real-Time Market Data**: Providing live price updates for the top 20 cryptocurrencies, ensuring traders always have the latest market information.
**Efficient Fund Management**: Allowing users to easily deposit, withdraw, and manage their account balance.
**Seamless Trading Experience**: Enabling fast and secure buy/sell transactions directly from the platform.
**Comprehensive Transaction Tracking**: Offering detailed transaction histories for better financial oversight.
**Scalable Infrastructure**: Built on the reliable Spring 6 framework with a MySQL backend, ensuring high performance and future growth.

## 2.2 Key Features  

- **User Management**: Registration and Login.    
- **Live time prices**: Live time prices of cryptos are fetched from Kraken API.
- **Balance management**: Users add/withdraw funds from their account.
- **Buying Crypto**:  
- **Selling Crypto**:
---
## 3. Use Cases

### 3.1 Display Top 20 Crypto Prices  
- **Actors**: All Users.  
- **Description**: Users can see dinamicly changed crypto prices.

### 3.2 Account Balance  
- **Actors**: Registered users.  
- **Description**: Every registered user can add or withdraw funds to their account.  

### 3.3 Buy Crypto  
- **Actors**: Registered Users.  
- **Description**: Registered Users can buy crypto.  

### 3.4 Sell Crypto  
- **Actors**: Registered Users.  
- **Description**: Registered Users can sell their crypto.  

### 3.5 Transactions History  
- **Actors**: Registered Users.  
- **Description**: Registered Users can see all transactions that they made.

### 3.6 Reset button  
- **Actors**: Registered Users.  
- **Description**: Registered Users can reset their account balance to inital $10000.  
---

## 4. System Architecture

The system follows a **3-tier architecture**:
1. **Presentation Layer**:
   - Front-end built using **HTML, CSS AND React**.
   - Handles user interaction and displays data.

2. **Application Layer**:
   - Backend built using **Spring 6** (Spring Boot, Spring Data JPA).
   - Implements business logic, API endpoints, and data processing.

3. **Data Layer**:
   - **MySQL** database for storing user data, transactions, accounts and holdings.
---

## 5. Database Schema

The database schema includes the following tables:
- **Users**: Stores user information (username, email, created_at).
- **Accounts**: Stores accounts details (account_id, user_id, balance, created_at).
- **Transactions**: Stores transactions details (transaction_id, account_id, crypto_symbol, amount, price_per_unit, transaction_type, created_at).
- **Holdings**: Stores accounts holdings(holding_id, account_id, crypto_symbol, quantity, average_price)

---

## 6. Future Enhancements

1. **Mobile Application**  
   - Develop a mobile app for iOS and Android to provide a seamless crypto trading expiriance on mobile devices. 

2. **Security**  
   - Adding real security using Spring Security and jwt tokens.  

3. **Analytics**  
   - Provide AI analytics for users and their holdings.  

4. **Forum**  
   - Implement Forum where different users will share their opinions about market.  

---

## 7. Conclusion

**CryptoLegend** is designed to empower users by providing a seamless, data-driven trading experience. With its intuitive interface, real-time price updates, and comprehensive account management, the platform stands out as a powerful tool for crypto enthusiasts. As the platform continues to evolve, future enhancements will focus on expanding functionality, improving security, and integrating advanced analytics to meet the ever-changing needs of the crypto trading community.

---
