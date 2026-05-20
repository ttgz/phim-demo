package com.phimdemo.phim_demo.controller.admin;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.phimdemo.phim_demo.dto.admin.CreateAdminRequest;
import com.phimdemo.phim_demo.dto.admin.LoginAdminRequest;
import com.phimdemo.phim_demo.dto.admin.RefreshRequest;
import com.phimdemo.phim_demo.entity.Admin;
import com.phimdemo.phim_demo.response.ApiResponse;
import com.phimdemo.phim_demo.response.ApiResponseSuccess;
import com.phimdemo.phim_demo.response.auth.AuthResponse;
import com.phimdemo.phim_demo.service.admin.AdminService;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/admin/auth")
public class AuthController {

    private final AdminService adminService;

    public AuthController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponseSuccess<Admin>> register(
            @Valid @RequestBody CreateAdminRequest createAdminRequest) {
        System.out.println(createAdminRequest.toAdmin());
        Admin admin = adminService.store(createAdminRequest.toAdmin());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponseSuccess<Admin>(201, "Tạo tài khoản admin thành công", admin));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginAdminRequest loginRequest) {
        try {
            AuthResponse auth = adminService.login(loginRequest.toAdmin());
            return ResponseEntity.ok(ApiResponse.success(auth, "Đăng nhập thành công", HttpStatus.OK.value()));
        } catch (BadCredentialsException badCredentialsException) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(badCredentialsException.getMessage(), "Tài khoản hoặc mật khẩu không đúng!",
                            HttpStatus.UNAUTHORIZED.value()));
        }

    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refresh(@Valid @RequestBody RefreshRequest refreshToken) {
        try {
            AuthResponse response = adminService.refreshAccessToken(refreshToken.getRefreshToken());
            return ResponseEntity.ok(ApiResponse.success(response, "OK", HttpStatus.OK.value()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(e, e.getMessage(), HttpStatus.UNAUTHORIZED.value()));
        }
    }

}
