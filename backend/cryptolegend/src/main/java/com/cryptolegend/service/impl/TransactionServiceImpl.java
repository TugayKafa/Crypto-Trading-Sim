package com.cryptolegend.service.impl;

import com.cryptolegend.entity.Account;
import com.cryptolegend.entity.Holding;
import com.cryptolegend.entity.Transaction;
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
            throw new IllegalArgumentException("Account does not exist!"); // TODO
        }

        if (transaction.getTransactionType().equals("BUY")) {
            buyCrypto(transaction, accountByAccountId);
        } else if (transaction.getTransactionType().equals("SELL")) {
            sellCrypto(transaction, accountByAccountId);
        } else {
            throw new IllegalArgumentException("Not supported transaction operation!");
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
            throw new IllegalArgumentException("Not enough money in account!"); // TODO
        }

        int affectedRows = transactionsRepository.save(transaction);
        if (affectedRows == 0) {
            throw new IllegalArgumentException("Transaction could not happen!"); //TODO
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
            throw new IllegalArgumentException("You cannot sell something that you do not have!"); // TODO
        }

        if (holding.getAmount() < transaction.getAmount().doubleValue()) {
            throw new IllegalArgumentException("You cannot sell something that you do not have!"); // TODO
        }

        int affectedRows = transactionsRepository.save(transaction);

        if (affectedRows == 0) {
            throw new IllegalArgumentException("Transaction could not happen!"); //TODO
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
