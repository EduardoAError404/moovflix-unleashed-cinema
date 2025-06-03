
import React, { useEffect, useState } from 'react';
import { X, Play, Plus, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Movie } from '@/types/movie';
import { Button } from '@/components/ui/button';

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  similarMovies?: Movie[];
}

const MovieModal = ({ movie, isOpen, onClose, similarMovies = [] }: MovieModalProps) => {
  const [isInMyList, setIsInMyList] = useState(false);
  const [userRating, setUserRating] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !movie) return null;

  const handleAddToList = () => {
    setIsInMyList(!isInMyList);
  };

  const handleRating = (rating: 'up' | 'down') => {
    setUserRating(userRating === rating ? null : rating);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full h-full overflow-y-auto">
        <div className="max-w-4xl mx-auto bg-[#141414] rounded-lg my-8 animate-scale-in">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Movie Header */}
          <div className="relative h-96 overflow-hidden rounded-t-lg">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${movie.capa})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {movie.titulo}
              </h1>
              
              <div className="flex flex-wrap gap-4 items-center">
                <Button className="bg-white hover:bg-gray-200 text-black font-bold px-8 py-3 rounded">
                  <Play className="w-5 h-5 mr-2" />
                  Assistir
                </Button>
                
                <button
                  onClick={handleAddToList}
                  className={`w-12 h-12 rounded-full border-2 border-gray-400 hover:border-white flex items-center justify-center transition-all ${
                    isInMyList ? 'bg-white text-black' : 'bg-transparent text-white'
                  }`}
                >
                  <Plus className="w-6 h-6" />
                </button>
                
                <button
                  onClick={() => handleRating('up')}
                  className={`w-12 h-12 rounded-full border-2 border-gray-400 hover:border-white flex items-center justify-center transition-all ${
                    userRating === 'up' ? 'bg-green-600 border-green-600' : 'bg-transparent'
                  } text-white`}
                >
                  <ThumbsUp className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => handleRating('down')}
                  className={`w-12 h-12 rounded-full border-2 border-gray-400 hover:border-white flex items-center justify-center transition-all ${
                    userRating === 'down' ? 'bg-red-600 border-red-600' : 'bg-transparent'
                  } text-white`}
                >
                  <ThumbsDown className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Movie Details */}
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="flex flex-wrap gap-4 items-center mb-4 text-sm">
                  <span className="text-green-500 font-semibold">99% compatível</span>
                  <span className="text-white">{movie.ano}</span>
                  <span className="text-white">{movie.duracao}</span>
                  <span className="border border-gray-400 px-2 py-1 text-xs text-gray-300">
                    HD
                  </span>
                  <span className="border border-gray-400 px-2 py-1 text-xs text-gray-300">
                    {movie.rating}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.categoria?.map((cat, index) => (
                    <span
                      key={index}
                      className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <p className="text-white text-lg mb-6 leading-relaxed">
                  {movie.sinopse}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-gray-400 text-sm">Elenco: </span>
                  <span className="text-white text-sm">{movie.elenco}</span>
                </div>
                
                <div>
                  <span className="text-gray-400 text-sm">Diretor: </span>
                  <span className="text-white text-sm">{movie.diretor}</span>
                </div>
                
                <div>
                  <span className="text-gray-400 text-sm">Gêneros: </span>
                  <span className="text-white text-sm">{movie.genero}</span>
                </div>
              </div>
            </div>

            {/* Similar Titles */}
            {similarMovies.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-white mb-6">Títulos semelhantes</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {similarMovies.slice(0, 6).map((similarMovie) => (
                    <div
                      key={similarMovie.id}
                      className="bg-[#2F2F2F] rounded-lg overflow-hidden cursor-pointer hover:bg-[#404040] transition-colors"
                    >
                      <div className="aspect-video bg-gray-800">
                        <img
                          src={similarMovie.capa}
                          alt={similarMovie.titulo}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-white font-semibold text-sm">
                            {similarMovie.titulo}
                          </h3>
                          <button className="w-8 h-8 bg-transparent border border-gray-400 hover:border-white rounded-full flex items-center justify-center text-white">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex gap-2 text-xs text-gray-400 mb-2">
                          <span>{similarMovie.ano}</span>
                          <span>{similarMovie.duracao}</span>
                        </div>
                        <p className="text-gray-300 text-xs line-clamp-3">
                          {similarMovie.sinopse}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* About Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6">
                Sobre {movie.titulo}
              </h2>
              <div className="grid md:grid-cols-2 gap-8 text-sm">
                <div className="space-y-4">
                  <div>
                    <span className="text-gray-400">Diretor: </span>
                    <span className="text-white">{movie.diretor}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Elenco: </span>
                    <span className="text-white">{movie.elenco}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Gêneros: </span>
                    <span className="text-white">{movie.genero}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-gray-400">Ano de lançamento: </span>
                    <span className="text-white">{movie.ano}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Duração: </span>
                    <span className="text-white">{movie.duracao}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Classificação: </span>
                    <span className="text-white">{movie.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
