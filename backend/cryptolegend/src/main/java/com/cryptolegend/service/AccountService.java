package com.cryptolegend.service;

import com.cryptolegend.entity.Account;

import java.util.Optional;

public interface AccountService {
    void createAccount(int userId);

    Optional<Account> getAccountByUserId(int userId);

    Optional<Account> getAccountByAccountId(int accountId);

    void updateAccountBalance(int accountId, double newBalance);

    void deleteAccount(int accountId);
}
