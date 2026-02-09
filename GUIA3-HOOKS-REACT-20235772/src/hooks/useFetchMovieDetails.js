import { useEffect, useState } from "react";
import { API_KEY } from "./useFetchMovies";

export function useFetchMovieDetails(selectedId) {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selectedId) return;

    async function fetchMovie() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
        );

        if (!res.ok) throw new Error("Error al cargar detalles");

        const data = await res.json();
        if (data.Response === "False") throw new Error(data.Error);

        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovie();
  }, [selectedId]);

  return { movie, isLoading, error };
}