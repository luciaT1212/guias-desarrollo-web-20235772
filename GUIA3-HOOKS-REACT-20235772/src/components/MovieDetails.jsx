import { useState } from "react";
import { useFetchMovieDetails } from "../hooks/useFetchMovieDetails";
import StarRating from "./StarRating";

export function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const { movie, isLoading, error } = useFetchMovieDetails(selectedId);
  const [userRating, setUserRating] = useState(0);

  const isWatched = watched.some((m) => m.imdbID === selectedId);
  const watchedUserRating = watched.find((m) => m.imdbID === selectedId)?.userRating;

  if (isLoading) return <p className="loader">Cargando...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!movie) return null;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newMovie = {
      imdbID: selectedId,
      Title: title,
      Year: year,
      Poster: poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ")[0]),
      userRating,
    };

    onAddWatched(newMovie);
    onCloseMovie();
  }

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster de ${title}`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDb rating
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          {!isWatched ? (
            <>
              <StarRating maxRating={10} size={18} onSetRating={setUserRating} />
              {userRating > 0 && (
                <button className="btn-add" onClick={handleAdd}>
                  + Agregar a la lista
                </button>
              )}
            </>
          ) : (
            <p>Has calificado esta pelicula con {watchedUserRating} ⭐</p>
          )}
        </div>

        <p>
          <em>{plot}</em>
        </p>
        <p>
          <b>Elenco:</b> {actors}
        </p>
        <p>
          <b>Director:</b> {director}
        </p>
      </section>
    </div>
  );
}