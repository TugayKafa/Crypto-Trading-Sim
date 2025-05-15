package com.cryptolegend.service.impl;

import com.cryptolegend.entity.Transaction;
import com.cryptolegend.repostitory.TransactionsRepository;
import com.cryptolegend.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionsRepository transactionsRepository;

    @Override
    public void saveTransaction(Transaction transaction) {
        transactionsRepository.save(transaction);
    }

    @Override
    public List<Transaction> getTransactionsByAccountId(int accountId) {
        return transactionsRepository.findByAccountId(accountId);
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return transactionsRepository.findAll();
    }
}
