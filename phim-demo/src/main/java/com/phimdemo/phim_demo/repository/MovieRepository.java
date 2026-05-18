package com.phimdemo.phim_demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.phimdemo.phim_demo.entity.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {

}
