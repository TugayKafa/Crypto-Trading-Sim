package com.cryptolegend.service.impl;

import com.cryptolegend.entity.Account;
import com.cryptolegend.exception.NegativeBalanceException;
import com.cryptolegend.repostitory.AccountRepository;
import com.cryptolegend.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountServiceImpl implements AccountService {

    private static final int INITIAL_CAPITAL = 10000;

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public void createAccount(int userId) {
        Account account = new Account();
        account.setUserId(userId);
        account.setBalance(INITIAL_CAPITAL);
        accountRepository.createAccount(account);
    }

    @Override
    public Optional<Account> getAccountByUserId(int userId) {
        return accountRepository.findAccountByUserId(userId);
    }

    @Override
    public Optional<Account> getAccountByAccountId(int accountId) {
        return accountRepository.findAccountByAccountId(accountId);
    }

    @Override
    public void updateAccountBalance(int accountId, double newBalance) {
        if (newBalance < 0) {
            throw new NegativeBalanceException("Balance must be greater than 0!");
        }
        accountRepository.updateAccountBalance(accountId, newBalance);
    }

    @Override
    public void deleteAccount(int accountId) {
        accountRepository.deleteAccount(accountId);
    }
}
