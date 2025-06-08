import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { getPopularMovies } from "../services/api";
import "../css/Home.scss";

export default function UserHome() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadPopular = async () => {
      const data = await getPopularMovies();
      setMovies(data);
    };
    loadPopular();
  }, []);

  return (
    <div className="home">
      <h2 style={{ textAlign: "center", color: "#fff" }}>Welcome back!</h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
