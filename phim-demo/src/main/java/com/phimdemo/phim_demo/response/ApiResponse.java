package com.phimdemo.phim_demo.response;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    private boolean success;
    private int code;
    private String message;
    private T data;
    private Object error;

    public static <T> ApiResponse<T> success(T data, String message, int code) {
        return ApiResponse.<T>builder()
                .success(true)
                .code(code)
                .data(data)
                .build();
    }

    public static <T> ApiResponse<T> success(String message, int code) {
        return ApiResponse.<T>builder()
                .success(true)
                .code(code)
                .message(message)
                .build();
    }

    public static <T> ApiResponse<T> error(Object errorDetails, String message, int code) {
        return ApiResponse.<T>builder()
                .success(false)
                .code(code)
                .message(message)
                .error(errorDetails)
                .build();
    }

    private ApiResponse(Builder<T> builder) {
        this.success = builder.success;
        this.code = builder.code;
        this.message = builder.message;
        this.data = builder.data;
        this.error = builder.error;

    }

    public static <T> Builder<T> builder() {
        return new Builder<>();
    }

    public static class Builder<T> {
        private boolean success;
        private int code;
        private String message;
        private T data;
        private Object error;
        private LocalDateTime timestamp;

        public Builder<T> success(boolean success) {
            this.success = success;
            return this; // Trả về chính nó để có thể viết nối chuỗi dấu chấm .
        }

        public Builder<T> code(int code) {
            this.code = code;
            return this;
        }

        public Builder<T> message(String message) {
            this.message = message;
            return this;
        }

        public Builder<T> data(T data) {
            this.data = data;
            return this;
        }

        public Builder<T> error(Object error) {
            this.error = error;
            return this;
        }

        // Hàm chốt chặn cuối cùng: Lấy dữ liệu đã thu thập đổ ngược vào class chính
        public ApiResponse<T> build() {
            return new ApiResponse<>(this);
        }
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
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

    public Object getError() {
        return error;
    }

    public void setError(Object error) {
        this.error = error;
    }

}
