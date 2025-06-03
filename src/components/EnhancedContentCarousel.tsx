
import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Movie } from '@/types/movie';

interface EnhancedContentCarouselProps {
  title: string;
  movies: Movie[];
  showProgress?: boolean;
  onMovieClick: (movie: Movie) => void;
}

const EnhancedContentCarousel = ({ 
  title, 
  movies, 
  showProgress = false, 
  onMovieClick 
}: EnhancedContentCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;

    const scrollAmount = carouselRef.current.clientWidth * 0.8;
    const newScrollLeft = carouselRef.current.scrollLeft + 
      (direction === 'right' ? scrollAmount : -scrollAmount);

    carouselRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });

    setTimeout(() => {
      updateScrollButtons();
    }, 300);
  };

  const updateScrollButtons = () => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  return (
    <section className="px-4 md:px-8 mb-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{title}</h2>
        
        <div className="relative group">
          {/* Left Arrow */}
          {canScrollLeft && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity w-12 h-12"
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>
          )}
          
          {/* Content Grid */}
          <div 
            ref={carouselRef}
            className="overflow-x-auto scrollbar-hide"
            onScroll={updateScrollButtons}
          >
            <div className="flex gap-2 md:gap-4 pb-4">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="flex-shrink-0 w-32 md:w-48 lg:w-56 group/item cursor-pointer"
                  onClick={() => onMovieClick(movie)}
                >
                  <div className="relative overflow-hidden rounded-lg aspect-[2/3] bg-gray-800">
                    <img
                      src={movie.capa}
                      alt={movie.titulo}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Progress bar for continue watching */}
                    {showProgress && movie.progress && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                        <div 
                          className="h-full bg-[#E50914] transition-all duration-300"
                          style={{ width: `${movie.progress}%` }}
                        />
                      </div>
                    )}
                    
                    {/* Hover overlay with play button */}
                    <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                        <button className="w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-black ml-1" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Content badges */}
                    {movie.categoria?.includes('Novo') && (
                      <div className="absolute top-2 left-2 bg-[#E50914] text-white text-xs px-2 py-1 rounded">
                        NOVO
                      </div>
                    )}
                    
                    {movie.categoria?.includes('Original') && (
                      <div className="absolute top-2 right-2 bg-[#E50914] text-white text-xs px-2 py-1 rounded">
                        ORIGINAL
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-2">
                    <h3 className="text-white text-sm font-medium line-clamp-2 mb-1">
                      {movie.titulo}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{movie.ano}</span>
                      <span>•</span>
                      <span>{movie.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Arrow */}
          {canScrollRight && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity w-12 h-12"
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default EnhancedContentCarousel;
