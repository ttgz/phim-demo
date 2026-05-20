package com.phimdemo.phim_demo.controller.admin;

import com.phimdemo.phim_demo.response.UploadUrlResponse;
import com.phimdemo.phim_demo.service.R2Service;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/admin/uploads")
public class UploadController {
    private final R2Service r2Service;

    public UploadController(R2Service r2Service) {
        this.r2Service = r2Service;
    }

    @PostMapping("/video")
    public UploadUrlResponse getUploadUrl(@RequestParam String fileName, @RequestParam String contentType) {
        return r2Service.createUploadUrl(
                fileName,
                contentType);
    }
}
