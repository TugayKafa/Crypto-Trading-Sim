package com.cryptolegend.repostitory;

import com.cryptolegend.entity.Holding;

import java.util.List;
import java.util.Optional;

public interface HoldingRepository {
    int save(Holding holding);

    int deleteById(int holdingId);

    Optional<Holding> findById(int holdingId);

    List<Holding> findAllByAccountId(int accountId);

    Optional<Holding> findByAccountIdAndSymbol(int accountId, String cryptoSymbol);

    int updateQuantityAndAveragePrice(int holdingId, double quantity, double averagePrice);
}
