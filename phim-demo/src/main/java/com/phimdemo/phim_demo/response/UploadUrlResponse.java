package com.phimdemo.phim_demo.response;

public class UploadUrlResponse {
    private String uploadUrl;

    private String fileUrl;

    private String key;

    public UploadUrlResponse(String uploadUrl, String fileUrl, String key) {
        this.uploadUrl = uploadUrl;
        this.fileUrl = fileUrl;
        this.key = key;
    }

    public String getUploadUrl() {
        return uploadUrl;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public String getKey() {
        return key;
    }
}
