package com.phimdemo.phim_demo.response;

public class UploadUrlResponse {
    private String uploadUrl;

    private String fileUrl;

    public UploadUrlResponse(String uploadUrl, String fileUrl) {
        this.uploadUrl = uploadUrl;
        this.fileUrl = fileUrl;
    }

    public String getUploadUrl() {
        return uploadUrl;
    }

    public String getFileUrl() {
        return fileUrl;
    }
}
