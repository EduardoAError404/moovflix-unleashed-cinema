
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
    isLoading,
    togglePlayPause,
    seek,
    setVolume,
    toggleMute,
    toggleFullscreen: playerToggleFullscreen
  } = useVideoPlayer(videoRef);

  // Configurar vídeo quando o filme for encontrado
  useEffect(() => {
    if (movie && videoRef.current) {
      console.log('Configurando vídeo para:', movie.titulo);
      console.log('URL do vídeo:', movie.video_url);
      
      const video = videoRef.current;
      
      // Configurações do vídeo
      video.crossOrigin = 'anonymous';
      video.preload = 'auto';
      
      // Definir a URL do vídeo
      video.src = movie.video_url;
      
      // Restaurar posição salva se existir
      const savedPosition = localStorage.getItem(`moovflix_position_${movie.id}`);
      if (savedPosition) {
        video.addEventListener('loadedmetadata', () => {
          video.currentTime = parseFloat(savedPosition);
        }, { once: true });
      }
      
      // Tentar reproduzir automaticamente
      video.addEventListener('canplay', () => {
        console.log('Vídeo pode ser reproduzido');
        video.play().catch(error => {
          console.error('Erro ao tentar reproduzir automaticamente:', error);
        });
      }, { once: true });
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
        <h1 className="moovflix-logo text-2xl font-bold tracking-tight">MoovFlix</h1>
      </div>

      {/* Elemento de Vídeo */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        playsInline
        controls={false}
        onError={(e) => {
          console.error('Erro no elemento de vídeo:', e);
          const video = e.target as HTMLVideoElement;
          if (video.error) {
            console.error('Código do erro:', video.error.code);
            console.error('Mensagem do erro:', video.error.message);
          }
        }}
      />

      {/* Indicador de Carregamento */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-white text-xl">Carregando vídeo...</div>
        </div>
      )}

      {/* Overlay de Play Grande (quando pausado) */}
      {!isPlaying && !isLoading && (
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
