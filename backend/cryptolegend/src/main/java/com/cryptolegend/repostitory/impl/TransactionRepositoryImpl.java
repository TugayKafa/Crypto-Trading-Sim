package com.cryptolegend.repostitory.impl;

import com.cryptolegend.entity.Transaction;
import com.cryptolegend.repostitory.TransactionsRepository;
import com.cryptolegend.repostitory.mapper.TransactionRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TransactionRepositoryImpl implements TransactionsRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public int save(Transaction transaction) {
        String sql = "INSERT INTO transactions (account_id, crypto_symbol, amount, price_per_unit, transaction_type) " +
                "VALUES (?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql,
                transaction.getAccountId(),
                transaction.getCryptoSymbol(),
                transaction.getAmount(),
                transaction.getPricePerUnit(),
                transaction.getTransactionType());
    }

    @Override
    public List<Transaction> findByAccountId(int accountId) {
        String sql = "SELECT * FROM transactions WHERE account_id = ?";
        return jdbcTemplate.query(sql, new TransactionRowMapper(), accountId);
    }

    @Override
    public List<Transaction> findAll() {
        String sql = "SELECT * FROM transactions";
        return jdbcTemplate.query(sql, new TransactionRowMapper());
    }
}
