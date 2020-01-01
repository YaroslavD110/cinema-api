require('dotenv/config');

const { Client } = require('pg');
const { films, directors, countries, genres } = require('./filmsDB.json');

(async () => {
  try {
    const client = new Client({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    await client.connect();

    for (let director of directors) {
      await client.query(`INSERT INTO director (name, slug) VALUES ($1, $2);`, [
        director.name,
        director.slug
      ]);
    }

    for (let country of countries) {
      await client.query(`INSERT INTO country (label, slug) VALUES ($1, $2);`, [
        country.label,
        country.slug
      ]);
    }

    for (let genre of genres) {
      await client.query(`INSERT INTO genre (label, slug) VALUES ($1, $2);`, [
        genre.label,
        genre.slug
      ]);
    }

    console.log('--- LABELS INSERTED! ---');

    for (let film of films) {
      if (film.subtitle) {
        const res = await client.query(
          `INSERT INTO 
            film (title, slug, subtitle, poster_url, video_frame_url, description, imdb_rating, year)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id;`,
          [
            film.title,
            film.slug,
            film.subtitle,
            film.preview,
            film.videoFrame,
            film.description,
            film.rating,
            film.year
          ]
        );
        const filmId = res.rows[0].id;

        for (let countryId of film.countries) {
          await client.query(
            `INSERT INTO film_countries (film_id, country_id) VALUES ($1, $2);`,
            [filmId, countryId + 1]
          );
        }

        for (let genreId of film.genres) {
          await client.query(
            `INSERT INTO film_genres (film_id, genre_id) VALUES ($1, $2);`,
            [filmId, genreId + 1]
          );
        }

        for (let directorId of film.directors) {
          await client.query(
            `INSERT INTO film_directors (film_id, director_id) VALUES ($1, $2);`,
            [filmId, directorId + 1]
          );
        }
      }
    }

    console.log('--- FILMS INSERTED! ---');

    client.end();
  } catch (error) {
    console.error(error);
  }
})();
