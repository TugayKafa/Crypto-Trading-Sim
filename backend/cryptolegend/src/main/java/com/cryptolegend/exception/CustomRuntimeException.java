package com.cryptolegend.exception;

public class CustomRuntimeException extends RuntimeException {

    protected CustomRuntimeException(String message) {
        super(message);
    }
}
