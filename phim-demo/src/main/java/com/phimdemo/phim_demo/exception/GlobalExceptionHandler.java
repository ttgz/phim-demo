package com.phimdemo.phim_demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.phimdemo.phim_demo.response.ApiResponseError;
import com.phimdemo.phim_demo.response.ApiResponseError.FieldErrorDetail;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponseError> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, List<FieldErrorDetail>> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error -> {
            String fieldName = error.getField();
            String message = error.getDefaultMessage();

            errors.computeIfAbsent(fieldName, k -> new java.util.ArrayList<>())
                    .add(new FieldErrorDetail(message));
        });

        ApiResponseError response = new ApiResponseError(
                "Validation errors in your request",
                errors);

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
