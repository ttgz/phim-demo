package com.phimdemo.phim_demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.phimdemo.phim_demo.dto.UpdateMovieRequest;
import com.phimdemo.phim_demo.repository.MovieRepository;
import com.phimdemo.phim_demo.util.SlugUtil;
import com.phimdemo.phim_demo.entity.Movie;

@Service
public class MovieService {
    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
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

        return movieRepository.save(existingMovie);
    }
}
