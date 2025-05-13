package com.cryptolegend.repostitory.impl;

import com.cryptolegend.entity.Account;
import com.cryptolegend.repostitory.AccountRepository;
import com.cryptolegend.repostitory.mapper.AccountRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class AccountRepositoryImpl implements AccountRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public int createAccount(Account account) {
        String sql = "INSERT INTO accounts (user_id, balance) VALUES (?, ?)";
        return jdbcTemplate.update(sql, account.getUserId(), account.getBalance());
    }

    @Override
    public Optional<Account> findAccountByUserId(int userId) {
        String sql = "SELECT * FROM accounts WHERE user_id = ?";
        List<Account> accounts = jdbcTemplate.query(sql, new AccountRowMapper(), userId);
        return accounts.stream().findFirst();
    }

    @Override
    public Optional<Account> findAccountByAccountId(int accountId) {
        String sql = "SELECT * FROM accounts WHERE account_id = ?";
        List<Account> accounts = jdbcTemplate.query(sql, new AccountRowMapper(), accountId);
        return accounts.stream().findFirst();
    }

    @Override
    public int updateAccountBalance(int accountId, double newBalance) {
        String sql = "UPDATE accounts SET balance = ? WHERE account_id = ?";
        return jdbcTemplate.update(sql, newBalance, accountId);
    }

    @Override
    public int deleteAccount(int accountId) {
        String sql = "DELETE FROM accounts WHERE account_id = ?";
        return jdbcTemplate.update(sql, accountId);
    }
}
