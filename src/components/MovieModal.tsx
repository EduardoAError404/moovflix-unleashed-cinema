
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Play, Plus, ThumbsUp, ThumbsDown, Share } from 'lucide-react';
import { Movie } from '@/types/movie';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import EnhancedContentCarousel from './EnhancedContentCarousel';

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  similarMovies: Movie[];
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, isOpen, onClose, similarMovies }) => {
  const navigate = useNavigate();
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);

  if (!isOpen || !movie) return null;

  const handleWatchClick = () => {
    navigate(`/watch/${movie.id}`);
    onClose();
  };

  const handleSimilarMovieClick = (selectedMovie: Movie) => {
    // Atualizar o modal com o novo filme
    window.location.reload(); // Temporário - idealmente seria passar o callback para atualizar o estado
  };

  const truncatedSynopsis = movie.sinopse.length > 200 
    ? movie.sinopse.substring(0, 200) + '...'
    : movie.sinopse;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="relative min-h-screen overflow-y-auto">
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-60 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Hero Section */}
        <div className="relative h-[60vh] overflow-hidden">
          <img
            src={movie.capa}
            alt={movie.titulo}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          {/* Conteúdo sobre a imagem */}
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.titulo}</h1>
            
            {/* Botões de Ação */}
            <div className="flex items-center space-x-4 mb-6">
              <Button
                onClick={handleWatchClick}
                className="bg-white text-black hover:bg-gray-200 font-semibold px-8 py-3 text-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                {movie.progress && movie.progress > 0 ? 'Continuar assistindo' : 'Assistir'}
              </Button>
              
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black"
              >
                <Plus className="w-5 h-5 mr-2" />
                Minha lista
              </Button>
              
              <button className="p-3 border-2 border-white rounded-full hover:bg-white hover:text-black transition-colors">
                <ThumbsUp className="w-5 h-5" />
              </button>
              
              <button className="p-3 border-2 border-white rounded-full hover:bg-white hover:text-black transition-colors">
                <ThumbsDown className="w-5 h-5" />
              </button>
              
              <button className="p-3 border-2 border-white rounded-full hover:bg-white hover:text-black transition-colors">
                <Share className="w-5 h-5" />
              </button>
            </div>

            {/* Barra de Progresso (se aplicável) */}
            {movie.progress && movie.progress > 0 && (
              <div className="mb-4">
                <Progress value={movie.progress} className="w-full md:w-1/2 h-2" />
                <p className="text-sm text-gray-300 mt-2">{movie.progress}% assistido</p>
              </div>
            )}
          </div>
        </div>

        {/* Detalhes do Filme */}
        <div className="px-8 py-8 bg-black text-white">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna Principal */}
            <div className="lg:col-span-2">
              {/* Informações Básicas */}
              <div className="flex items-center space-x-4 mb-6 text-sm">
                <span className="text-green-500 font-semibold">
                  {Math.floor(Math.random() * 20 + 80)}% relevante
                </span>
                <span>{movie.ano}</span>
                <span className="px-2 py-1 border border-gray-500 text-xs">
                  {movie.rating || '12+'}
                </span>
                <span>{movie.duracao}</span>
                <span className="px-2 py-1 border border-gray-500 text-xs">HD</span>
              </div>

              {/* Sinopse */}
              <div className="mb-6">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {showFullSynopsis ? movie.sinopse : truncatedSynopsis}
                </p>
                {movie.sinopse.length > 200 && (
                  <button
                    onClick={() => setShowFullSynopsis(!showFullSynopsis)}
                    className="text-white hover:underline mt-2"
                  >
                    {showFullSynopsis ? 'Ver menos' : 'Ver mais'}
                  </button>
                )}
              </div>
            </div>

            {/* Coluna Lateral */}
            <div className="space-y-4 text-sm">
              <div>
                <span className="text-gray-400">Elenco: </span>
                <span className="text-white">{movie.elenco}</span>
              </div>
              
              <div>
                <span className="text-gray-400">Gêneros: </span>
                <span className="text-white">{movie.genero}</span>
              </div>
              
              <div>
                <span className="text-gray-400">Diretor: </span>
                <span className="text-white">{movie.diretor}</span>
              </div>

              {movie.categoria && (
                <div>
                  <span className="text-gray-400">Categorias: </span>
                  <span className="text-white">{movie.categoria.join(', ')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Filmes Similares */}
          {similarMovies.length > 0 && (
            <div className="mt-12">
              <EnhancedContentCarousel
                title="Títulos similares"
                movies={similarMovies}
                onMovieClick={handleSimilarMovieClick}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
