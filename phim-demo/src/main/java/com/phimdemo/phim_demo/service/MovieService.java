package com.phimdemo.phim_demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

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
}
