const API_KEY = "afe1bd10006f94ebd4177f24413c2493";
const BASE_URL = "https://api.themoviedb.org/3";


const BACKEND_BASE = import.meta.env.VITE_API_URL;


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


export const getSavedMovies = async () => {
  const response = await fetch(`${BACKEND_BASE}/movies`);
  return response.json();
};

export const saveMovie = async (movie) => {
  const response = await fetch(`${BACKEND_BASE}/movies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie)
  });
  return response.json();
};

export const createUser = async (user) => {
  const res = await fetch(`${BACKEND_BASE}/yourdbname/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  return res.json();
};

export const getUsers = async () => {
  const response = await fetch(`${BACKEND_BASE}/yourdbname/users`);
  return response.json();
};

export const getUserProfile = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BACKEND_BASE}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.json();
};

export const registerUser = async (user) => {
  const res = await fetch(`${BACKEND_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  return res.json();
};

export const loginUser = async ({ email, password }) => {
  const res = await fetch(`${BACKEND_BASE}/users/login`, {
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

export const saveRating = async (movieId, rating) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BACKEND_BASE}/api/ratings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ movieId, rating })
  });

  return res.json();
};

export const getUserRating = async (movieId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("No token found — user probably not logged in");
    return { rating: 0 };
  }

  const res = await fetch(`${BACKEND_BASE}/api/ratings/user/${movieId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      console.warn(`Token rejected with status ${res.status}`);
      localStorage.removeItem("token");
      return { rating: 0 };
    }
    throw new Error(`Failed to fetch user rating: ${res.status}`);
  }

  return res.json();
};

export const getAverageRating = async (movieId) => {
  const res = await fetch(`${BACKEND_BASE}/api/ratings/average/${movieId}`);
  return res.json();
};

export const getMovieDetails = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  if (!response.ok) throw new Error("Failed to fetch movie details");
  return response.json();
};
