package com.cryptolegend.repostitory.mapper;

import com.cryptolegend.entity.Transaction;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TransactionRowMapper implements RowMapper<Transaction> {
    @Override
    public Transaction mapRow(ResultSet rs, int rowNum) throws SQLException {
        Transaction transaction = new Transaction();
        transaction.setTransactionId(rs.getInt("transaction_id"));
        transaction.setAccountId(rs.getInt("account_id"));
        transaction.setCryptoSymbol(rs.getString("crypto_symbol"));
        transaction.setAmount(rs.getBigDecimal("amount"));
        transaction.setPricePerUnit(rs.getBigDecimal("price_per_unit"));
        transaction.setTransactionType(rs.getString("transaction_type"));
        transaction.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        return transaction;
    }
}
