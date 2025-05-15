package com.cryptolegend.repostitory.mapper;

import com.cryptolegend.entity.Holding;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class HoldingRowMapper implements RowMapper<Holding> {
    @Override
    public Holding mapRow(ResultSet rs, int rowNum) throws SQLException {
        Holding holding = new Holding();
        holding.setHoldingId(rs.getInt("holding_id"));
        holding.setAccountId(rs.getInt("account_id"));
        holding.setCryptoSymbol(rs.getString("crypto_symbol"));
        holding.setAmount(rs.getDouble("quantity"));
        holding.setAveragePrice(rs.getDouble("average_price"));
        return holding;
    }
}
