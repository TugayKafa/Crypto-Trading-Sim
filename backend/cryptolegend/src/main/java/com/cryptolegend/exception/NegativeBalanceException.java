package com.cryptolegend.exception;

public class NegativeBalanceException extends CustomRuntimeException {

    public NegativeBalanceException(String message) {
        super(message);
    }
}
