package com.phimdemo.phim_demo.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.phimdemo.phim_demo.dto.UpdateMovieRequest;
import com.phimdemo.phim_demo.repository.MovieRepository;
import com.phimdemo.phim_demo.util.SlugUtil;
import com.phimdemo.phim_demo.entity.Movie;

@Service
public class MovieService {
    private final R2Service r2Service;
    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository, R2Service r2Service) {
        this.movieRepository = movieRepository;
        this.r2Service = r2Service;
    }

    public Page<Movie> getMoviesNewestToOldest(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("id").descending());
        return this.movieRepository.findAll(pageable);
    }

    public Movie storeMovie(Movie movie) {
        movie.setSlug(SlugUtil.toSlug(movie.getTitle()));
        return movieRepository.save(movie);
    }

    /**
     * Cập nhật từng phần (partial update) cho movie
     * Chỉ update những field được gửi lên, field nào không gửi thì giữ nguyên
     */
    public Movie updateMovie(Long id, UpdateMovieRequest request) {
        Movie existingMovie = movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phim với id: " + id));

        // Update title nếu được gửi
        if (request.getTitle().isPresent()) {
            existingMovie.setTitle(request.getTitle().get());
            existingMovie.setSlug(SlugUtil.toSlug(request.getTitle().get()));
        }

        // Update các field khác nếu được gửi
        request.getDescription().ifPresent(existingMovie::setDescription);
        request.getOriginalTitle().ifPresent(existingMovie::setOriginalTitle);
        request.getThumbnail().ifPresent(existingMovie::setThumbnail);
        request.getDuration().ifPresent(existingMovie::setDuration);
        request.getIsPublic().ifPresent(existingMovie::setIsPublic);
        request.getType().ifPresent(existingMovie::setType);
        request.getTotalEpisodes().ifPresent(existingMovie::setTotalEpisodes);
        request.getReleaseYear().ifPresent(existingMovie::setReleaseYear);
        request.getUrl().ifPresent(existingMovie::setUrl);
        request.getUrlKey().ifPresent(existingMovie::setUrlKey);
        request.getThumbnailKey().ifPresent(existingMovie::setThumbnailKey);

        return movieRepository.save(existingMovie);
    }

    public void deleteMoive(Long movieId) {
        Movie movie = this.movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy movie"));
        if (movie.getUrlKey() != null) {
            this.r2Service.deleteFile(movie.getUrlKey());
        }

        if (movie.getThumbnailKey() != null) {
            this.r2Service.deleteFile(movie.getThumbnailKey());
        }

        this.movieRepository.delete(movie);
    }
}
