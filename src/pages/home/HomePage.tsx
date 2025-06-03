
import React, { useState } from 'react';
import HeroSection from "@/components/HeroSection";
import EnhancedContentCarousel from "@/components/EnhancedContentCarousel";
import MovieModal from "@/components/MovieModal";
import { useMovies } from "@/hooks/useMovies";
import { Movie } from "@/types/movie";

const HomePage = () => {
  const { 
    movies, 
    loading, 
    error, 
    getMoviesByGenre, 
    getContinueWatching, 
    getNewReleases, 
    getSimilarMovies 
  } = useMovies();
  
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  const continueWatchingMovies = getContinueWatching();
  const comedyMovies = getMoviesByGenre('Comédia');
  const dramaMovies = getMoviesByGenre('Drama');
  const newReleases = getNewReleases();
  const crimeMovies = getMoviesByGenre('Crime');
  const similarMovies = selectedMovie ? getSimilarMovies(selectedMovie) : [];

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Menu */}
            <div className="flex items-center space-x-8">
              <h1 className="text-[#E50914] text-2xl font-bold tracking-tight">
                MoovFlix
              </h1>
              <div className="hidden md:flex space-x-6">
                <a href="#" className="text-white hover:text-gray-300 transition-colors font-medium">Início</a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">Séries</a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">Filmes</a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">Jogos</a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">Bombando</a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">Minha lista</a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">Navegar por idiomas</a>
              </div>
            </div>
            
            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-gray-300 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="relative text-white hover:text-gray-300 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5l-5-5h5z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-[#E50914] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
              </button>
              <div className="w-8 h-8 bg-[#E50914] rounded cursor-pointer hover:bg-[#E50914]/80 transition-colors"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection type="homepage" />
      
      {/* Content Carousels */}
      <div className="pb-16">
        {/* Continue Watching */}
        {continueWatchingMovies.length > 0 && (
          <EnhancedContentCarousel 
            title="Continuar assistindo como João" 
            movies={continueWatchingMovies}
            showProgress={true}
            onMovieClick={handleMovieClick}
          />
        )}
        
        {/* New Releases */}
        <EnhancedContentCarousel 
          title="Lançamentos" 
          movies={newReleases}
          onMovieClick={handleMovieClick}
        />
        
        {/* Comedy Movies */}
        {comedyMovies.length > 0 && (
          <EnhancedContentCarousel 
            title="Filmes de comédia" 
            movies={comedyMovies}
            onMovieClick={handleMovieClick}
          />
        )}
        
        {/* Drama Series */}
        {dramaMovies.length > 0 && (
          <EnhancedContentCarousel 
            title="Séries dramáticas aclamadas pela crítica para maratonar" 
            movies={dramaMovies}
            onMovieClick={handleMovieClick}
          />
        )}
        
        {/* Crime Movies */}
        {crimeMovies.length > 0 && (
          <EnhancedContentCarousel 
            title="Histórias reais" 
            movies={crimeMovies}
            onMovieClick={handleMovieClick}
          />
        )}
        
        {/* Popular on MoovFlix */}
        <EnhancedContentCarousel 
          title="Populares na MoovFlix" 
          movies={movies.slice(0, 6)}
          onMovieClick={handleMovieClick}
        />
      </div>
      
      {/* Movie Modal */}
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        similarMovies={similarMovies}
      />
      
      {/* Footer */}
      <footer className="px-4 md:px-8 py-16 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-6 mb-8">
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </a>
          </div>
          
          <div className="text-gray-400 text-sm">
            <p>&copy; 2023 MoovFlix Brasil. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
