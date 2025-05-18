package com.cryptolegend.controller;

import com.cryptolegend.entity.Account;
import com.cryptolegend.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<Account> getAccountByUserId(@PathVariable int userId) {
        Optional<Account> account = accountService.getAccountByUserId(userId);
        return account.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<Account> getAccountByAccountId(@PathVariable int accountId) {
        Optional<Account> account = accountService.getAccountByAccountId(accountId);
        return account.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{accountId}/balance")
    public ResponseEntity<String> updateAccountBalance(@PathVariable int accountId, @RequestParam double newBalance) {
        accountService.updateAccountBalance(accountId, newBalance);
        return ResponseEntity.ok("Account balance updated successfully.");
    }
}
