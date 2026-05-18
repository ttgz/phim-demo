package com.phimdemo.phim_demo.util;

import com.github.slugify.Slugify;

public class SlugUtil {
    private static final Slugify slugify = Slugify.builder().lowerCase(true).build();

    private SlugUtil() {

    }

    public static String toSlug(String input) {
        if (input == null || input.trim().isEmpty()) {
            return "";
        }
        return slugify.slugify(input);
    }

}
