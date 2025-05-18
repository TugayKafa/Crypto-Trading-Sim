package com.cryptolegend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class CustomGlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(AccountNotFoundException.class)
    public ResponseEntity<CustomErrorResponse> handleAccountNotFoundException(Exception exception) {
        CustomErrorResponse errors = new CustomErrorResponse();
        errors.setTimeStamp(LocalDateTime.now());
        errors.setStatus(HttpStatus.NOT_FOUND.value());
        errors.setError(exception.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NegativeBalanceException.class)
    public ResponseEntity<CustomErrorResponse> handleNegativeBalanceException(Exception exception) {
        CustomErrorResponse errors = new CustomErrorResponse();
        errors.setTimeStamp(LocalDateTime.now());
        errors.setStatus(HttpStatus.BAD_REQUEST.value());
        errors.setError(exception.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NotSupportedTypeOfTransactionException.class)
    public ResponseEntity<CustomErrorResponse> handleNotSupportedTypeOfTransactionException(Exception exception) {
        CustomErrorResponse errors = new CustomErrorResponse();
        errors.setTimeStamp(LocalDateTime.now());
        errors.setStatus(HttpStatus.BAD_REQUEST.value());
        errors.setError(exception.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NotValidTransactionArgumentsException.class)
    public ResponseEntity<CustomErrorResponse> handleNotValidTransactionArgumentsException(Exception exception) {
        CustomErrorResponse errors = new CustomErrorResponse();
        errors.setTimeStamp(LocalDateTime.now());
        errors.setStatus(HttpStatus.BAD_REQUEST.value());
        errors.setError(exception.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(TransactionCouldNotHappenException.class)
    public ResponseEntity<CustomErrorResponse> handleTransactionCouldNotHappenException(Exception exception) {
        CustomErrorResponse errors = new CustomErrorResponse();
        errors.setTimeStamp(LocalDateTime.now());
        errors.setStatus(HttpStatus.BAD_REQUEST.value());
        errors.setError(exception.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}
