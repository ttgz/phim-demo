package com.phimdemo.phim_demo.response.auth;

import org.springframework.security.core.userdetails.User;

public class Me {
    private String username;

    public Me(User user) {
        this.username = user.getUsername();
    }

    public String getUsername() {
        return this.username;
    }
}
