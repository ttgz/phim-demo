CREATE TABLE movies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    original_title VARCHAR(255),
    description TEXT,
    thumbnail VARCHAR(255),
    release_year INT,
    duration INT,
    views INT DEFAULT 0,
    is_public BOOLEAN DEFAULT TRUE,
    type ENUM('single', 'series') NOT NULL,
    total_episodes INT DEFAULT 1,
    url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);