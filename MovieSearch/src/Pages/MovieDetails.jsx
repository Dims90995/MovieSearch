import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import "../css/MovieDetails.scss";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(id)
      .then(setMovie)
      .catch(console.error);
  }, [id]);

  if (!movie) return <div className="movie-details loading">Loading...</div>;

  return (
    <div className="movie-details">
      <div className="movie-header">
        <img
          className="poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        <div className="info">
          <h1>{movie.title}</h1>
          {movie.tagline && <p className="tagline">"{movie.tagline}"</p>}

          <div className="details">
            <p><span>Genres:</span> {movie.genres.map(g => g.name).join(", ")}</p>
            <p><span>Release Date:</span> {movie.release_date}</p>
            <p><span>Runtime:</span> {movie.runtime} minutes</p>
            <p><span>Rating:</span> {movie.vote_average} / 10</p>
          </div>
        </div>
      </div>

      <div className="overview">
        <strong>Overview:</strong> {movie.overview}
      </div>

      <Link to="/" className="back-button">← Back to Home</Link>
    </div>
  );
}

export default MovieDetails;
