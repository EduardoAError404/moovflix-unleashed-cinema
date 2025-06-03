
import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import moviesData from '@/data/movies.json';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // In a real app, this would be an API call
      // For now, we'll use the imported JSON data
      setMovies(moviesData as Movie[]);
      setLoading(false);
    } catch (err) {
      setError('Failed to load movies');
      setLoading(false);
    }
  }, []);

  const getMoviesByGenre = (genre: string): Movie[] => {
    return movies.filter(movie => 
      movie.genero.toLowerCase().includes(genre.toLowerCase())
    );
  };

  const getContinueWatching = (): Movie[] => {
    return movies.filter(movie => movie.progress && movie.progress > 0);
  };

  const getNewReleases = (): Movie[] => {
    const currentYear = new Date().getFullYear();
    return movies.filter(movie => 
      parseInt(movie.ano) >= currentYear - 2
    );
  };

  const getSimilarMovies = (movie: Movie): Movie[] => {
    const genres = movie.genero.split(',').map(g => g.trim().toLowerCase());
    return movies
      .filter(m => m.id !== movie.id)
      .filter(m => 
        genres.some(genre => 
          m.genero.toLowerCase().includes(genre)
        )
      )
      .slice(0, 6);
  };

  return {
    movies,
    loading,
    error,
    getMoviesByGenre,
    getContinueWatching,
    getNewReleases,
    getSimilarMovies
  };
};
