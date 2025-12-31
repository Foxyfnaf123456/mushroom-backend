CREATE DATABASE IF NOT EXISTS mushroom_app CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE mushroom_app;

CREATE TABLE IF NOT EXISTS mushroom_finds (
    id INT AUTO_INCREMENT PRIMARY KEY,
    species VARCHAR(255) NOT NULL,
    confidence INT NOT NULL,
    latitude DOUBLE NOT NULL,
    longitude DOUBLE NOT NULL,
    timestamp DATETIME NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
    corrected_species VARCHAR(255) NULL,
    approved_by VARCHAR(255) NULL,
    approved_at DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
INSERT INTO admins (username, password)
VALUES ('admin', 'admin123');


INSERT INTO mushroom_finds 
(species, confidence, latitude, longitude, timestamp, image_url, status)
VALUES
('Vargánya', 92, 47.9123, 21.3456, '2025-01-01 12:00:00', '/uploads/test1.jpg', 'pending'),
('Csiperke', 80, 47.9000, 21.3000, '2025-01-02 14:30:00', '/uploads/test2.jpg', 'pending'),
('Őzlábgomba', 75, 48.0000, 20.9000, '2025-01-03 10:15:00', '/uploads/test3.jpg', 'pending');
