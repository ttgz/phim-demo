package com.phimdemo.phim_demo.dto;

import java.util.Optional;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;

/**
 * DTO cho partial update của movie
 * Tất cả các field đều optional, chỉ update những field được gửi lên
 */
public class UpdateMovieRequest {

    private Optional<String> title = Optional.empty();

    private Optional<String> description = Optional.empty();

    private Optional<String> originalTitle = Optional.empty();

    private Optional<String> thumbnail = Optional.empty();

    private Optional<@Min(value = 1, message = "Duration phải lớn hơn hoặc bằng 1") Integer> duration = Optional
            .empty();

    private Optional<Boolean> isPublic = Optional.empty();

    private Optional<@Pattern(regexp = "single|series", message = "Type chỉ được là single hoặc series") String> type = Optional
            .empty();

    private Optional<@Min(value = 1, message = "TotalEpisodes phải bằng hoặc lớn hơn 1") Integer> totalEpisodes = Optional
            .empty();

    private Optional<@Min(value = 1800, message = "ReleaseYear không hợp lệ") Integer> releaseYear = Optional.empty();

    private Optional<String> url = Optional.empty();
    private Optional<String> urlKey = Optional.empty();

    private Optional<String> thumbnailKey = Optional.empty();

    public Optional<String> getUrlKey() {
        return urlKey;
    }

    public void setUrlKey(Optional<String> urlKey) {
        this.urlKey = urlKey;
    }

    public Optional<String> getThumbnailKey() {
        return thumbnailKey;
    }

    public void setThumbnailKey(Optional<String> thumbnailKey) {
        this.thumbnailKey = thumbnailKey;
    }

    public UpdateMovieRequest() {
    }

    public Optional<String> getTitle() {
        return title;
    }

    public void setTitle(Optional<String> title) {
        this.title = title;
    }

    public Optional<String> getDescription() {
        return description;
    }

    public void setDescription(Optional<String> description) {
        this.description = description;
    }

    public Optional<String> getOriginalTitle() {
        return originalTitle;
    }

    public void setOriginalTitle(Optional<String> originalTitle) {
        this.originalTitle = originalTitle;
    }

    public Optional<String> getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(Optional<String> thumbnail) {
        this.thumbnail = thumbnail;
    }

    public Optional<Integer> getDuration() {
        return duration;
    }

    public void setDuration(Optional<Integer> duration) {
        this.duration = duration;
    }

    public Optional<Boolean> getIsPublic() {
        return isPublic;
    }

    public void setIsPublic(Optional<Boolean> isPublic) {
        this.isPublic = isPublic;
    }

    public Optional<String> getType() {
        return type;
    }

    public void setType(Optional<String> type) {
        this.type = type;
    }

    public Optional<Integer> getTotalEpisodes() {
        return totalEpisodes;
    }

    public void setTotalEpisodes(Optional<Integer> totalEpisodes) {
        this.totalEpisodes = totalEpisodes;
    }

    public Optional<Integer> getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(Optional<Integer> releaseYear) {
        this.releaseYear = releaseYear;
    }

    public Optional<String> getUrl() {
        return url;
    }

    public void setUrl(Optional<String> url) {
        this.url = url;
    }
}