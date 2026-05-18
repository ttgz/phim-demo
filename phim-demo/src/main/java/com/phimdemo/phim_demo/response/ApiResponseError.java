package com.phimdemo.phim_demo.response;

import java.util.List;
import java.util.Map;

public class ApiResponseError {
    private String message;
    private Map<String, List<FieldErrorDetail>> errors;

    public ApiResponseError() {
    }

    public ApiResponseError(String message, Map<String, List<FieldErrorDetail>> errors) {
        this.message = message;
        this.errors = errors;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, List<FieldErrorDetail>> getErrors() {
        return errors;
    }

    public void setErrors(Map<String, List<FieldErrorDetail>> errors) {
        this.errors = errors;
    }

    // Inner class for field error details
    public static class FieldErrorDetail {
        private String message;

        public FieldErrorDetail() {
        }

        public FieldErrorDetail(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
