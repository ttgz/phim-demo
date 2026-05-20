package com.phimdemo.phim_demo.dto.admin;

import jakarta.validation.constraints.NotBlank;

public class RefreshRequest {
    @NotBlank(message = "Token không được để trống")
    private String refreshToken;

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

}
