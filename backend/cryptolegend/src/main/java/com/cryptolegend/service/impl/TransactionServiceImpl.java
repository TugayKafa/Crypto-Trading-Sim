package com.cryptolegend.service.impl;

import com.cryptolegend.entity.Account;
import com.cryptolegend.entity.Holding;
import com.cryptolegend.entity.Transaction;
import com.cryptolegend.exception.AccountNotFoundException;
import com.cryptolegend.exception.NotSupportedTypeOfTransactionException;
import com.cryptolegend.exception.NotValidTransactionArgumentsException;
import com.cryptolegend.exception.TransactionCouldNotHappenException;
import com.cryptolegend.repostitory.TransactionsRepository;
import com.cryptolegend.service.AccountService;
import com.cryptolegend.service.HoldingService;
import com.cryptolegend.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionsRepository transactionsRepository;

    @Autowired
    private AccountService accountService;

    @Autowired
    private HoldingService holdingService;

    @Override
    public void saveTransaction(Transaction transaction) {
        Optional<Account> accountByAccountId = accountService.getAccountByAccountId(transaction.getAccountId());
        if (accountByAccountId.isEmpty()) {
            throw new AccountNotFoundException("Account does not exist!");
        }

        if (transaction.getTransactionType().equals("BUY")) {
            buyCrypto(transaction, accountByAccountId);
        } else if (transaction.getTransactionType().equals("SELL")) {
            sellCrypto(transaction, accountByAccountId);
        } else {
            throw new NotSupportedTypeOfTransactionException("Not supported transaction operation!");
        }
    }

    @Override
    public List<Transaction> getTransactionsByAccountId(int accountId) {
        return transactionsRepository.findByAccountId(accountId);
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return transactionsRepository.findAll();
    }

    private void buyCrypto(Transaction transaction, Optional<Account> accountByAccountId) {
        double totalSpend = transaction.getAmount().doubleValue() * transaction.getPricePerUnit().doubleValue();
        if (accountByAccountId.get().getBalance() < totalSpend) {
            throw new NotValidTransactionArgumentsException("Not enough money in account!");
        }

        int affectedRows = transactionsRepository.save(transaction);
        if (affectedRows == 0) {
            throw new TransactionCouldNotHappenException("Transaction could not happen!");
        }

        accountService.updateAccountBalance(accountByAccountId.get().getAccountId(),
                accountByAccountId.get().getBalance() - totalSpend);

        Holding holding = holdingService.getHoldingByAccountIdAndSymbol(accountByAccountId.get().getAccountId(),
                transaction.getCryptoSymbol());
        if (holding == null) {
            holding = new Holding();
            holding.setAmount(transaction.getAmount().doubleValue());
            holding.setCryptoSymbol(transaction.getCryptoSymbol());
            holding.setAccountId(transaction.getAccountId());
            holding.setAveragePrice(transaction.getPricePerUnit().doubleValue());
            holdingService.addHolding(holding);
        } else {
            double newAmount = holding.getAmount() + transaction.getAmount().doubleValue();
            double newAveragePrice =
                    (holding.getAveragePrice() * holding.getAmount()
                            + transaction.getAmount().doubleValue() * transaction.getPricePerUnit().doubleValue())
                            / newAmount;

            holdingService.updateHolding(holding.getHoldingId(), newAmount, newAveragePrice);
        }
    }

    private void sellCrypto(Transaction transaction, Optional<Account> accountByAccountId) {
        Holding holding = holdingService.getHoldingByAccountIdAndSymbol(transaction.getAccountId(),
                transaction.getCryptoSymbol());

        if (holding == null) {
            throw new NotValidTransactionArgumentsException("You cannot sell something that you do not have!");
        }

        if (holding.getAmount() < transaction.getAmount().doubleValue()) {
            throw new NotValidTransactionArgumentsException("You cannot sell something that you do not have!");
        }

        int affectedRows = transactionsRepository.save(transaction);

        if (affectedRows == 0) {
            throw new TransactionCouldNotHappenException("Transaction could not happen!");
        }

        double totalProfit = transaction.getAmount().doubleValue() * transaction.getPricePerUnit().doubleValue();
        accountService.updateAccountBalance(accountByAccountId.get().getAccountId(),
                accountByAccountId.get().getBalance() + totalProfit);

        double newAmount = holding.getAmount() - transaction.getAmount().doubleValue();
        if (newAmount == 0) {
            holdingService.deleteById(holding.getHoldingId());
        } else {
            holdingService.updateHolding(holding.getHoldingId(), newAmount, holding.getAveragePrice());
        }
    }
}
