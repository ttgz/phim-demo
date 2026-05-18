package com.phimdemo.phim_demo.response;

public class ApiResponseSuccess<T> {
    private Boolean success;

    private int status;

    private String message;

    private T data;

    public ApiResponseSuccess(int status, String message, T data) {
        this.success = true;
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public Boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

}
