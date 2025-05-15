package com.cryptolegend.service.impl;

import com.cryptolegend.entity.Holding;
import com.cryptolegend.entity.User;
import com.cryptolegend.repostitory.HoldingRepository;
import com.cryptolegend.service.HoldingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HoldingServiceImpl implements HoldingService {

    @Autowired
    private HoldingRepository holdingRepository;

    @Override
    public int addHolding(Holding holding) {
        return holdingRepository.save(holding);
    }

    @Override
    public int updateHolding(int holdingId, double quantity, double averagePrice) {
        return holdingRepository.updateQuantityAndAveragePrice(holdingId, quantity, averagePrice);
    }

    @Override
    public Holding getHoldingById(int holdingId) {
        return holdingRepository.findById(holdingId).orElse(null);
    }

    @Override
    public List<Holding> getAllHoldingsByAccountId(int accountId) {
        return holdingRepository.findAllByAccountId(accountId);
    }

    @Override
    public Holding getHoldingByAccountIdAndSymbol(int accountId, String cryptoSymbol) {
        return holdingRepository.findByAccountIdAndSymbol(accountId, cryptoSymbol).orElse(null);
    }

    @Override
    public void deleteById(int holdingId) {
        holdingRepository.deleteById(holdingId);
    }
}
