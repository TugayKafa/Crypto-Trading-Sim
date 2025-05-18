package com.cryptolegend.exception;

public class AccountNotFoundException extends CustomRuntimeException {

    public AccountNotFoundException(String message) {
        super(message);
    }
}
