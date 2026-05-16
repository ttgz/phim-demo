package com.phimdemo.phim_demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.phimdemo.phim_demo.entity.Movie;
import com.phimdemo.phim_demo.service.MovieService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/movies")
public class MovieController {
    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    public List<Movie> getAllMovies() {
        List<Movie> movieList = List.of(new Movie(1L, "Bố già"));
        System.out.println(movieList);
        return movieList;
    }

    @PostMapping
    public Movie store(@RequestBody Movie movie) {
        System.out.println(movie);
        movieService.storeMovie(movie);
        return movie;
    }

}
