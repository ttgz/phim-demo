package com.phimdemo.phim_demo.service;

import java.time.Duration;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;

import com.phimdemo.phim_demo.response.UploadUrlResponse;

@Service
public class R2Service {

        @Value("${cloudflare.r2.bucket}")
        private String bucket;

        @Value("${cloudflare.r2.public-url}")
        private String publicUrl;

        private final S3Presigner presigner;

        public R2Service(S3Presigner presigner) {
                this.presigner = presigner;
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
                                publicUrl + "/" + key);
        }

}
