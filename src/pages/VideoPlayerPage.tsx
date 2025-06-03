
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovies } from '@/hooks/useMovies';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';
import VideoControls from '@/components/VideoControls';
import { ArrowLeft } from 'lucide-react';

const VideoPlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movies, loading } = useMovies();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout>();

  const movie = movies.find(m => m.id === id);
  
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    buffered,
    togglePlayPause,
    seek,
    setVolume,
    toggleMute,
    toggleFullscreen: playerToggleFullscreen
  } = useVideoPlayer(videoRef);

  useEffect(() => {
    if (movie && videoRef.current) {
      videoRef.current.src = movie.video_url;
      // Restaurar posição salva se existir
      const savedPosition = localStorage.getItem(`moovflix_position_${movie.id}`);
      if (savedPosition) {
        videoRef.current.currentTime = parseFloat(savedPosition);
      }
    }
  }, [movie]);

  // Auto-ocultar controles
  const startHideControlsTimer = () => {
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }
    hideControlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    startHideControlsTimer();
  };

  const handleClick = () => {
    setShowControls(true);
    startHideControlsTimer();
  };

  // Salvar posição a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      if (movie && videoRef.current && !videoRef.current.paused) {
        localStorage.setItem(`moovflix_position_${movie.id}`, videoRef.current.currentTime.toString());
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [movie]);

  // Atalhos de teclado
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seek(Math.max(0, currentTime - 10));
          break;
        case 'ArrowRight':
          e.preventDefault();
          seek(Math.min(duration, currentTime + 10));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(Math.min(1, volume + 0.1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(Math.max(0, volume - 0.1));
          break;
        case 'KeyM':
          e.preventDefault();
          toggleMute();
          break;
        case 'KeyF':
          e.preventDefault();
          handleToggleFullscreen();
          break;
        case 'Escape':
          e.preventDefault();
          if (isFullscreen) {
            handleToggleFullscreen();
          } else {
            navigate(-1);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentTime, duration, volume, isPlaying, isFullscreen, navigate, togglePlayPause, seek, setVolume, toggleMute]);

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Carregando vídeo...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Vídeo não encontrado</div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="moovflix-player-container relative w-full h-screen bg-black overflow-hidden cursor-none"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      style={{ cursor: showControls ? 'default' : 'none' }}
    >
      {/* Botão Voltar */}
      <button
        onClick={handleBackClick}
        className={`fixed top-6 left-6 z-50 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Logo MoovFlix */}
      <div className={`fixed top-6 right-6 z-50 transition-all duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        <h1 className="text-red-600 text-2xl font-bold tracking-tight">MoovFlix</h1>
      </div>

      {/* Elemento de Vídeo */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        preload="auto"
        onLoadedMetadata={() => {
          // Auto-play quando o vídeo carregar
          videoRef.current?.play();
        }}
        onError={() => {
          console.error('Erro ao carregar o vídeo');
        }}
      />

      {/* Overlay de Play Grande (quando pausado) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <button
            onClick={togglePlayPause}
            className="bg-black/50 hover:bg-black/70 text-white p-6 rounded-full transition-all duration-200 hover:scale-110"
          >
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      )}

      {/* Controles de Vídeo */}
      <VideoControls
        movie={movie}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isMuted={isMuted}
        buffered={buffered}
        showControls={showControls}
        isFullscreen={isFullscreen}
        onTogglePlayPause={togglePlayPause}
        onSeek={seek}
        onVolumeChange={setVolume}
        onToggleMute={toggleMute}
        onToggleFullscreen={handleToggleFullscreen}
        onSkipBack={() => seek(Math.max(0, currentTime - 10))}
        onSkipForward={() => seek(Math.min(duration, currentTime + 10))}
      />
    </div>
  );
};

export default VideoPlayerPage;
