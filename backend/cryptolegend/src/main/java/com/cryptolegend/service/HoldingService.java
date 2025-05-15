package com.cryptolegend.service;

import com.cryptolegend.entity.Holding;

import java.util.List;

public interface HoldingService {
    int addHolding(Holding holding);

    int updateHolding(int holdingId, double quantity, double averagePrice);

    Holding getHoldingById(int holdingId);

    List<Holding> getAllHoldingsByAccountId(int accountId);

    Holding getHoldingByAccountIdAndSymbol(int accountId, String cryptoSymbol);

    void deleteById(int holdingId);
}
