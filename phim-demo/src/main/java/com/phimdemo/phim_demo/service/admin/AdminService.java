package com.phimdemo.phim_demo.service.admin;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.phimdemo.phim_demo.entity.Admin;
import com.phimdemo.phim_demo.repository.AdminRepository;
import com.phimdemo.phim_demo.response.auth.AuthResponse;
import com.phimdemo.phim_demo.service.JwtService;

@Service
public class AdminService {
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public AdminService(AdminRepository adminRepository, PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager, JwtService jwtService, UserDetailsService userDetailsService) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    public Admin store(Admin admin) {
        if (adminRepository.findByUsername(admin.getUsername()).isPresent()) {
            throw new RuntimeException("Tài khoản đã tồn tại");
        }
        Admin newAdmin = new Admin();
        newAdmin.setUsername(admin.getUsername());
        String hashedPassword = passwordEncoder.encode(admin.getPassword());
        newAdmin.setPassword(hashedPassword);
        return adminRepository.save(newAdmin);
    }

    public AuthResponse login(Admin adminLogin) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(adminLogin.getUsername(), adminLogin.getPassword()));
        Admin admin = adminRepository.findByUsername(adminLogin.getUsername())
                .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại"));

        String accessToken = jwtService.generateAccessToken(admin.getUsername());
        String refreshToken = jwtService.generateRefreshToken(admin.getUsername());
        return new AuthResponse(accessToken, refreshToken);
    }

    public AuthResponse refreshAccessToken(String token) {
        String username = jwtService.extractUsername(token);
        if (username != null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            if (jwtService.isTokenValid(token, userDetails)) {
                String newAccessToken = this.jwtService.generateAccessToken(username);

                return new AuthResponse(newAccessToken, token);
            }
        }
        throw new RuntimeException("Refresh token không hợp lệ hoặc hết hạn");
    }

    public Admin getMe(String accessToken) {
        String username = jwtService.extractUsername(accessToken);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        if (jwtService.isTokenValid(accessToken, userDetails)) {
            return new Admin(userDetails.getUsername());
        }
        throw new RuntimeException("token không hợp lệ hoặc hết hạn");
    }
}
