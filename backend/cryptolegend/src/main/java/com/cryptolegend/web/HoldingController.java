package com.cryptolegend.web;

import com.cryptolegend.entity.Holding;
import com.cryptolegend.service.HoldingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/holdings")
public class HoldingController {

    @Autowired
    private HoldingService holdingService;

    @PostMapping
    public ResponseEntity<String> createHolding(@RequestBody Holding holding) {
        int affectedRows = holdingService.addHolding(holding);
        return ResponseEntity.status(HttpStatus.CREATED).body("Successfully bought new crypto!");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateHolding(@PathVariable int id, @RequestBody Holding holding) {
        Holding existing = holdingService.getHoldingById(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        holdingService.updateHolding(id, holding.getAmount(), holding.getAveragePrice());
        return ResponseEntity.ok("Successfully updated crypto holding!");
    }

    @GetMapping("/account/{accountId}")
    public List<Holding> getHoldingsByAccountId(@PathVariable int accountId) {
        return holdingService.getAllHoldingsByAccountId(accountId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Holding> getHoldingById(@PathVariable int id) {
        Holding holding = holdingService.getHoldingById(id);
        if (holding != null) {
            return ResponseEntity.ok(holding);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHolding(@PathVariable int id) {
        holdingService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
