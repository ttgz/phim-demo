package com.phimdemo.phim_demo.controller.admin;

import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;

import com.phimdemo.phim_demo.dto.CreateMovieRequest;
import com.phimdemo.phim_demo.dto.UpdateMovieRequest;
import com.phimdemo.phim_demo.entity.Movie;
import com.phimdemo.phim_demo.repository.MovieRepository;
import com.phimdemo.phim_demo.response.ApiResponse;
import com.phimdemo.phim_demo.response.ApiResponseSuccess;
import com.phimdemo.phim_demo.service.MovieService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.data.domain.Page;

@RestController
@RequestMapping("/api/admin/movies")
public class MovieController {
    private final MovieService movieService;
    private final MovieRepository movieRepository;

    public MovieController(MovieService movieService, MovieRepository movieRepository) {
        this.movieService = movieService;
        this.movieRepository = movieRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<Movie>>> getAllMovies(@RequestParam(defaultValue = "1") @Min(1) int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<Movie> movieList = movieService.getMoviesNewestToOldest(page, size);
        return ResponseEntity.ok(ApiResponse.success(movieList, "Thực hiện thành công", HttpStatus.OK.value()));
    }

    @PostMapping
    public ResponseEntity<ApiResponseSuccess<Movie>> store(@Valid @RequestBody CreateMovieRequest request) {
        Movie storeMovie = movieService.storeMovie(request.toMovie());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponseSuccess<Movie>(201, "Thêm phim thành công", storeMovie));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponseSuccess<Movie>> getMoiveById(@PathVariable("id") Long id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy phim"));

        return ResponseEntity.ok(new ApiResponseSuccess<Movie>(200, "", movie));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponseSuccess<Movie>> update(@PathVariable Long id,
            @Valid @RequestBody UpdateMovieRequest request) {
        Movie updatedMovie = movieService.updateMovie(id, request);
        return ResponseEntity.ok(new ApiResponseSuccess<Movie>(200, "Cập nhật phim thành công", updatedMovie));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteMovie(@PathVariable Long id) {
        this.movieService.deleteMoive(id);
        return ResponseEntity.ok(ApiResponse.success("Xóa movie thành công", 204));
    }

}
