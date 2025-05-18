package com.cryptolegend.controller;

import com.cryptolegend.entity.Holding;
import com.cryptolegend.service.HoldingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/holdings")
public class HoldingController {

    @Autowired
    private HoldingService holdingService;

    @GetMapping("/account/{accountId}")
    public List<Holding> getHoldingsByAccountId(@PathVariable int accountId) {
        return holdingService.getAllHoldingsByAccountId(accountId);
    }
}
