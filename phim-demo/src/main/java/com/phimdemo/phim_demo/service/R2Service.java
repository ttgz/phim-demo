package com.phimdemo.phim_demo.service;

import java.io.IOException;
import java.time.Duration;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Utilities;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;

import com.phimdemo.phim_demo.response.UploadUrlResponse;

@Service
public class R2Service {

        private final S3Client s3Client;

        @Value("${cloudflare.r2.bucket}")
        private String bucket;

        @Value("${cloudflare.r2.public-url}")
        private String publicUrl;

        private final S3Presigner presigner;

        public R2Service(S3Presigner presigner, S3Client s3Client) {
                this.presigner = presigner;
                this.s3Client = s3Client;
        }

        public UploadUrlResponse createUploadUrl(
                        String fileName,
                        String contentType) {

                String key = "movies/" + UUID.randomUUID() + "-" + fileName;

                PutObjectRequest objectRequest = PutObjectRequest.builder()
                                .bucket(bucket)
                                .key(key)
                                .contentType(contentType)
                                .build();

                PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                                .signatureDuration(Duration.ofMinutes(5))
                                .putObjectRequest(objectRequest)
                                .build();

                PresignedPutObjectRequest presignedRequest = presigner.presignPutObject(presignRequest);

                return new UploadUrlResponse(
                                presignedRequest.url().toString(),
                                publicUrl + "/" + key, key);
        }

        public UploadUrlResponse uploadThumbnail(
                        MultipartFile file) {

                try {
                        // S3Utilities s3Utilities = s3Client.utilities();
                        String key = "thumbnails/"
                                        + UUID.randomUUID()
                                        + "-"
                                        + file.getOriginalFilename();

                        PutObjectRequest request = PutObjectRequest.builder()
                                        .bucket(bucket)
                                        .key(key)
                                        .contentType(
                                                        file.getContentType())
                                        .build();

                        s3Client.putObject(
                                        request,
                                        RequestBody.fromInputStream(
                                                        file.getInputStream(),
                                                        file.getSize()));

                        return new UploadUrlResponse("", publicUrl + "/" + key, key);
                } catch (

                IOException e)

                {
                        throw new RuntimeException(e);
                }
        }

        public void deleteFile(String key) {
                DeleteObjectRequest req = DeleteObjectRequest.builder()
                                .bucket(this.bucket)
                                .key(key)
                                .build();
                s3Client.deleteObject(req);
        }
}