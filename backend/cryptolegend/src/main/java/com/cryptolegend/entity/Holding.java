package com.cryptolegend.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class Holding {
    private Integer holdingId;
    private Integer accountId;
    private String cryptoSymbol;
    private Double amount;
    private Double averagePrice;

    @Override
    public String toString() {
        return "Holdings{" +
                "holdingId=" + holdingId +
                ", accountId=" + accountId +
                ", cryptoSymbol='" + cryptoSymbol + '\'' +
                ", amount=" + amount +
                '}';
    }

    public Integer getHoldingId() {
        return holdingId;
    }

    public void setHoldingId(Integer holdingId) {
        this.holdingId = holdingId;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public String getCryptoSymbol() {
        return cryptoSymbol;
    }

    public void setCryptoSymbol(String cryptoSymbol) {
        this.cryptoSymbol = cryptoSymbol;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public double getAveragePrice() {
        return averagePrice;
    }

    public void setAveragePrice(double averagePrice) {
        this.averagePrice = averagePrice;
    }
}
