import { useEffect, useState } from "react";

export const API_KEY = "9436cefa";

export function useFetchMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
        );

        if (!res.ok) throw new Error("Error al cargar peliculas");

        const data = await res.json();

        if (data.Response === "False") throw new Error(data.Error);

        setMovies(data.Search);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  return { movies, isLoading, error };
}