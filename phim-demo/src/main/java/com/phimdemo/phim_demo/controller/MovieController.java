package com.phimdemo.phim_demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import jakarta.validation.Valid;

import com.phimdemo.phim_demo.dto.CreateMovieRequest;
import com.phimdemo.phim_demo.entity.Movie;
import com.phimdemo.phim_demo.repository.MovieRepository;
import com.phimdemo.phim_demo.response.ApiResponseSuccess;
import com.phimdemo.phim_demo.service.MovieService;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/movies")
public class MovieController {
    private final MovieService movieService;
    private final MovieRepository movieRepository;

    public MovieController(MovieService movieService, MovieRepository movieRepository) {
        this.movieService = movieService;
        this.movieRepository = movieRepository;
    }

    @GetMapping
    public List<Movie> getAllMovies() {
        List<Movie> movieList = List.of(new Movie(1L, "Bố già"));
        System.out.println(movieList);
        return movieList;
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

}
