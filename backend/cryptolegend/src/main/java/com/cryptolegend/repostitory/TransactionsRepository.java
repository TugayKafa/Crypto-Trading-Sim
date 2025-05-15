package com.cryptolegend.repostitory;

import com.cryptolegend.entity.Transaction;

import java.util.List;

public interface TransactionsRepository {
    int save(Transaction transaction);

    List<Transaction> findByAccountId(int accountId);

    List<Transaction> findAll();
}
