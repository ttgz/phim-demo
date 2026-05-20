package com.phimdemo.phim_demo.dto.admin;

import com.phimdemo.phim_demo.entity.Admin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreateAdminRequest {
    @NotBlank(message = "Username không được để trống")
    private String username;

    @NotBlank(message = "Password không được để trống")
    @Size(min = 6, message = "Mật khẩu ít nhất 6 kí tự")
    private String password;

    public Admin toAdmin() {
        Admin admin = new Admin();
        admin.setUsername(this.username);
        admin.setPassword(this.password);
        return admin;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
