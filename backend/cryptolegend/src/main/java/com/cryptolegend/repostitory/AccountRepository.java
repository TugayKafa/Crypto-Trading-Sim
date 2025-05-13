package com.cryptolegend.repostitory;

import com.cryptolegend.entity.Account;

import java.util.Optional;

public interface AccountRepository {
    int createAccount(Account account);

    Optional<Account> findAccountByUserId(int userId);

    Optional<Account> findAccountByAccountId(int accountId);

    int updateAccountBalance(int accountId, double newBalance);

    int deleteAccount(int accountId);
}
