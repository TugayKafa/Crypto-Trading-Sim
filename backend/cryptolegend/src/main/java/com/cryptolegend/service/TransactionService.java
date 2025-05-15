package com.cryptolegend.service;

import com.cryptolegend.entity.Transaction;

import java.util.List;

public interface TransactionService {
    void saveTransaction(Transaction transaction);

    List<Transaction> getTransactionsByAccountId(int accountId);

    List<Transaction> getAllTransactions();
}
