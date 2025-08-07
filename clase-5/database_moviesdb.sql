-- Creacion de la base de datos
CREATE DATABASE moviesDB;

-- Usar base de datos
USE moviesDB;

-- Crear tablas
CREATE TABLE movie (
	id binary(16) primary key default (UUID_TO_BIN(UUID())),
    title varchar(255) not null,
    year int not null,
    director varchar(255) not null,
    duration int not null,
    poster text,
    rate decimal(2, 1) unsigned not null
);

CREATE TABLE genre (
	id int auto_increment primary key,
    name varchar(255) not null unique
);

CREATE TABLE movie_genres (
	movie_id BINARY(16) references movies(id),
    genre_id INT references genres(id),
    primary key (movie_id, genre_id)
);

INSERT INTO genre(name) VALUES ("Drama"), ("Action"), ("Crime"), ("Adventure"), ("Sci-Fi"), ("Romance"), ("Biography"), ("Fantasy");

INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES 
(UUID_TO_BIN(UUID()), "The Shawshank Redemption", 1994, "Frank Darabont", 142, "https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp", 9.3),
(UUID_TO_BIN(UUID()), "The Dark Knight", 2008, "Christopher Nolan", 152, "https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg", 9.0),
(UUID_TO_BIN(UUID()), "Inception", 2010, "Christopher Nolan", 148, "https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg", 8.8),
(UUID_TO_BIN(UUID()), "Pulp Fiction", 1994, "Quentin Tarantino", 154, "https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg", 8.9),
(UUID_TO_BIN(UUID()), "Forrest Gump", 1994, "Robert Zemeckis", 142, "https://i.ebayimg.com/images/g/qR8AAOSwkvRZzuMD/s-l1600.jpg", 8.8),
(UUID_TO_BIN(UUID()), "Gladiator", 2000, "Ridley Scott", 158, "https://img.fruugo.com/product/0/60/14417600_max.jpg", 8.5),
(UUID_TO_BIN(UUID()), "The Matrix", 1999, "Lana Wachowski", 136, "https://i.ebayimg.com/images/g/QFQAAOSwAQpfjaA6/s-l1200.jpg", 8.7);

INSERT INTO movie_genres (movie_id, genre_id) VALUES 
	((SELECT id from movie WHERE title = "The Matrix"), (SELECT id FROM genre WHERE name = "Action")),
	((SELECT id from movie WHERE title = "The Matrix"), (SELECT id FROM genre WHERE name = "Sci-Fi")),
	((SELECT id from movie WHERE title = "Gladiator"), (SELECT id FROM genre WHERE name = "Action")),
	((SELECT id from movie WHERE title = "Gladiator"), (SELECT id FROM genre WHERE name = "Adventure")),
	((SELECT id from movie WHERE title = "Gladiator"), (SELECT id FROM genre WHERE name = "Drama")),
	((SELECT id from movie WHERE title = "Forrest Gump"), (SELECT id FROM genre WHERE name = "Drama")),
	((SELECT id from movie WHERE title = "Forrest Gump"), (SELECT id FROM genre WHERE name = "Romance")),
	((SELECT id from movie WHERE title = "Pulp Fiction"), (SELECT id FROM genre WHERE name = "Crime")),
	((SELECT id from movie WHERE title = "Pulp Fiction"), (SELECT id FROM genre WHERE name = "Drama")),
	((SELECT id from movie WHERE title = "Inception"), (SELECT id FROM genre WHERE name = "Action")),
	((SELECT id from movie WHERE title = "Inception"), (SELECT id FROM genre WHERE name = "Adventure")),
	((SELECT id from movie WHERE title = "Inception"), (SELECT id FROM genre WHERE name = "Sci-Fi")),
	((SELECT id from movie WHERE title = "The Dark Knight"), (SELECT id FROM genre WHERE name = "Action")),
	((SELECT id from movie WHERE title = "The Dark Knight"), (SELECT id FROM genre WHERE name = "Crime")),
	((SELECT id from movie WHERE title = "The Dark Knight"), (SELECT id FROM genre WHERE name = "Drama")),
	((SELECT id from movie WHERE title = "The Shawshank Redemption"), (SELECT id FROM genre WHERE name = "Drama"));
    
SELECT m.*, g.name as genre
FROM movie m
INNER JOIN movie_genres mg
	ON (m.id = mg.movie_id)
INNER JOIN genre g
	ON (mg.genre_id = g.id);