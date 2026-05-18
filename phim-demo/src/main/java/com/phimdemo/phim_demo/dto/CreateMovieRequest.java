package com.phimdemo.phim_demo.dto;

import com.phimdemo.phim_demo.entity.Movie;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class CreateMovieRequest {

    @NotBlank(message = "Title không được để trống")
    private String title;

    @NotBlank(message = "Description không được để trống")
    private String description;

    @NotBlank(message = "originalTitle không được để trống")
    private String originalTitle;

    @NotBlank(message = "Thumbnail không được để trống")
    private String thumbnail;

    @NotNull(message = "Duration là bắt buộc")
    @Min(value = 1, message = "Duration phải lớn hơn hoặc bằng 1")
    private Integer duration;

    @NotNull(message = "isPublic là bắt buộc")
    private Boolean isPublic;

    @NotBlank(message = "Type không được để trống")
    @Pattern(regexp = "single|series", message = "Type chỉ được là single hoặc series")
    private String type;

    @Min(value = 1, message = "TotalEpisodes phải bằng hoặc lớn hơn 1")
    private Integer totalEpisodes;

    @NotNull(message = "ReleaseYear là bắt buộc")
    @Min(value = 1800, message = "ReleaseYear không hợp lệ")
    private Integer releaseYear;

    public CreateMovieRequest() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getOriginalTitle() {
        return originalTitle;
    }

    public void setOriginalTitle(String originalTitle) {
        this.originalTitle = originalTitle;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Boolean getIsPublic() {
        return isPublic;
    }

    public void setIsPublic(Boolean isPublic) {
        this.isPublic = isPublic;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getTotalEpisodes() {
        return totalEpisodes;
    }

    public void setTotalEpisodes(Integer totalEpisodes) {
        this.totalEpisodes = totalEpisodes;
    }

    public Integer getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(Integer releaseYear) {
        this.releaseYear = releaseYear;
    }

    public Movie toMovie() {
        Movie movie = new Movie();
        movie.setTitle(title);
        movie.setDescription(description);
        movie.setOriginalTitle(originalTitle);
        movie.setThumbnail(thumbnail);
        movie.setDuration(duration);
        movie.setIsPublic(isPublic);
        movie.setType(type);
        movie.setTotalEpisodes(totalEpisodes);
        movie.setReleaseYear(releaseYear);
        return movie;
    }
}
