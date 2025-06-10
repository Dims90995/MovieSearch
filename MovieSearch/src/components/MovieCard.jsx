import "../css/MovieCard.scss";
import { useMovieContext } from "../contexts/MovieContext";
import StarRating from "./StarRating";
import { useEffect, useState } from "react";
import { saveRating, getUserRating, getAverageRating } from "../services/api";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  const [userRating, setUserRating] = useState(0);
  const [avgRating, setAvgRating] = useState("N/A");

  useEffect(() => {
    getUserRating(movie.id)
      .then(data => {
        if (typeof data.rating === "number") {
          setUserRating(data.rating);
        }
      })
      .catch(err => {
        console.error("Error fetching user rating:", err);
      });

    getAverageRating(movie.id)
      .then(data => {
        const avg = data.average;
        setAvgRating(typeof avg === "number" ? avg.toFixed(1) : "N/A");
      })
      .catch(err => {
        console.error("Error fetching average rating:", err);
        setAvgRating("N/A");
      });
  }, [movie.id]);

  function onFavoriteClick(e) {
    e.preventDefault(); 
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  function handleRating(rate) {
    saveRating(movie.id, rate)
      .then(() => {
        setUserRating(rate);
        return getAverageRating(movie.id);
      })
      .then(data => {
        const avg = data.average;
        setAvgRating(typeof avg === "number" ? avg.toFixed(1) : "N/A");
      })
      .catch(err => {
        console.error("Error saving rating or refreshing average:", err);
      });
  }

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card-link">
      <div className="movie-card">
        <div className="movie-poster">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <div className="movie-overlay">
            <button
              className={`favorite-btn ${favorite ? "active" : ""}`}
              onClick={onFavoriteClick}
            >
              ♥
            </button>
          </div>
        </div>
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{movie.release_date?.split("-")[0]}</p>
          <StarRating rating={userRating} onRate={handleRating} />
          <p className="avg-rating">Avg: {avgRating} ★</p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
