package com.cryptolegend.repostitory.impl;

import com.cryptolegend.entity.Holding;
import com.cryptolegend.repostitory.HoldingRepository;
import com.cryptolegend.repostitory.mapper.HoldingRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class HoldingRepositoryImpl implements HoldingRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public int save(Holding holding) {
        String sql = "INSERT INTO holdings (account_id, crypto_symbol, quantity, average_price) VALUES (?, ?, ?, ?);";
        return jdbcTemplate.update(sql,
                holding.getAccountId(),
                holding.getCryptoSymbol(),
                holding.getAmount(),
                holding.getAveragePrice()
        );
    }

    @Override
    public Optional<Holding> findById(int holdingId) {
        String sql = "SELECT * FROM holdings WHERE holding_id = ?";
        Optional<Holding> holding = jdbcTemplate.query(sql, new HoldingRowMapper(), holdingId).stream().findFirst();
        return holding;
    }

    @Override
    public List<Holding> findAllByAccountId(int accountId) {
        String sql = "SELECT * FROM holdings WHERE account_id = ?";
        List<Holding> holdings = jdbcTemplate.query(sql, new HoldingRowMapper(), accountId);
        return holdings;
    }

    @Override
    public Optional<Holding> findByAccountIdAndSymbol(int accountId, String cryptoSymbol) {
        String sql = "SELECT * FROM holdings WHERE account_id = ? AND crypto_symbol = ?";
        Optional<Holding> holding =
                jdbcTemplate.query(sql, new HoldingRowMapper(), accountId, cryptoSymbol).stream().findFirst();
        return holding;
    }

    @Override
    public int updateQuantityAndAveragePrice(int holdingId, double quantity, double averagePrice) {
        String sql = "UPDATE holdings SET quantity = ?, average_price = ? WHERE holding_id = ?";
        return jdbcTemplate.update(sql,
                quantity,
                averagePrice,
                holdingId
        );
    }

    @Override
    public int deleteById(int holdingId) {
        String sql = "DELETE FROM holdings WHERE holding_id = ?";
        return jdbcTemplate.update(sql, holdingId);
    }
}
