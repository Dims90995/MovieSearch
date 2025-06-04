const API_KEY = "afe1bd10006f94ebd4177f24413c2493";
const BASE_URL = "https://api.themoviedb.org/3";

// TMDB endpoints
export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.results;
};

// === Your MongoDB backend API ===
const BACKEND_BASE = "http://localhost:27017";

// Get saved movies from your database
export const getSavedMovies = async () => {
  const response = await fetch(`${BACKEND_BASE}/movies`);
  const data = await response.json();
  return data;
};

// Save a movie to your database
export const saveMovie = async (movie) => {
  const response = await fetch(`${BACKEND_BASE}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(movie)
  });
  const data = await response.json();
  return data;
};

// === User API ===
export const createUser = async (user) => {
  const res = await fetch("http://localhost:5000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  return res.json();
};


export const getUsers = async () => {
  const response = await fetch("http://localhost:5000/users");
  const data = await response.json();
  return data;
};

export const loginUser = async (email, password) => {
  const res = await fetch("http://localhost:5000/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
};


export const getUserProfile = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.json();
};