
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovies } from '@/hooks/useMovies';
import { ArrowLeft, Flag } from 'lucide-react';

const VideoPlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movies, loading } = useMovies();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSubtitlesMenu, setShowSubtitlesMenu] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showEpisodesOverlay, setShowEpisodesOverlay] = useState(false);
  const [previewTime, setPreviewTime] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [previewPosition, setPreviewPosition] = useState(0);
  
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout>();
  const movie = movies.find(m => m.id === id);

  // Initialize video
  useEffect(() => {
    if (movie && videoRef.current) {
      const video = videoRef.current;
      video.src = movie.video_url;
      video.crossOrigin = 'anonymous';
      video.preload = 'auto';
      
      const savedPosition = localStorage.getItem(`moovflix-position-${movie.id}`);
      if (savedPosition) {
        video.addEventListener('loadedmetadata', () => {
          video.currentTime = parseFloat(savedPosition);
        }, { once: true });
      }
    }
  }, [movie]);

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false);
      // Auto-play on desktop
      if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        video.play();
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      // Save position every 5 seconds
      if (Math.floor(video.currentTime) % 5 === 0) {
        localStorage.setItem(`moovflix-position-${movie?.id}`, video.currentTime.toString());
      }
    };

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1));
      }
    };

    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
      startHideControlsTimer();
    };
    const handlePause = () => {
      setIsPlaying(false);
      setShowControls(true);
      clearTimeout(hideControlsTimeoutRef.current);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('pause', handlePause);
    };
  }, [movie]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          skipBack();
          break;
        case 'ArrowRight':
          e.preventDefault();
          skipForward();
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(Math.min(1, volume + 0.1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(Math.max(0, volume - 0.1));
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        case 'Escape':
          e.preventDefault();
          if (isFullscreen) {
            toggleFullscreen();
          } else {
            navigate(-1);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [volume, isFullscreen, navigate]);

  // Fullscreen detection
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Volume control
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const startHideControlsTimer = () => {
    clearTimeout(hideControlsTimeoutRef.current);
    hideControlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (isPlaying) {
      startHideControlsTimer();
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const skipBack = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
    }
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 10);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    if (videoRef.current) {
      videoRef.current.currentTime = pos * duration;
    }
  };

  const handleProgressBarHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    setPreviewTime(pos * duration);
    setPreviewPosition(e.clientX);
    setShowPreview(true);
  };

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
  const bufferedPercentage = duration ? (buffered / duration) * 100 : 0;

  if (loading) {
    return (
      <div className="moovflix-player-container">
        <div className="loading-spinner">
          <div className="netflix-spinner"></div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="moovflix-player-container">
        <div className="error-message">Vídeo não encontrado</div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`moovflix-player-container ${!isPlaying ? 'video-paused' : ''} ${isLoading ? 'video-loading' : ''}`}
      onMouseMove={handleMouseMove}
      onClick={(e) => {
        if (e.target === e.currentTarget || e.target === videoRef.current) {
          togglePlay();
        }
      }}
    >
      {/* Video Element */}
      <video ref={videoRef} className="video-element" />

      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        <ArrowLeft size={24} />
      </button>

      {/* Flag Button */}
      <button className="flag-button">
        <Flag size={24} />
      </button>

      {/* Big Play Button Overlay */}
      <div className="big-play-overlay">
        <button className="big-play-button" onClick={togglePlay}>
          <svg viewBox="0 0 24 24" className="big-play-icon">
            <path d="M6 4l15 8-15 8z" fill="currentColor" />
          </svg>
        </button>
      </div>

      {/* Loading Spinner */}
      <div className="loading-spinner">
        <div className="netflix-spinner"></div>
      </div>

      {/* Video Controls */}
      <div className={`video-controls-container ${!showControls ? 'hidden' : ''}`}>
        {/* Progress Bar */}
        <div className="progress-container">
          <div 
            className="progress-bar"
            onClick={handleProgressBarClick}
            onMouseMove={handleProgressBarHover}
            onMouseLeave={() => setShowPreview(false)}
          >
            <div className="progress-buffer" style={{ width: `${bufferedPercentage}%` }} />
            <div className="progress-played" style={{ width: `${progressPercentage}%` }} />
            <div className="scrubber-handle" style={{ left: `${progressPercentage}%` }} />
          </div>

          {/* Preview Thumbnail */}
          {showPreview && (
            <div 
              className="preview-thumbnail-container"
              style={{ left: previewPosition, transform: 'translateX(-50%)' }}
            >
              <div className="preview-thumbnail" style={{ backgroundImage: `url(${movie.capa})` }} />
              <div className="preview-time">{formatTime(previewTime)}</div>
            </div>
          )}
        </div>

        {/* Controls Row */}
        <div className="controls-row">
          {/* Left Controls */}
          <div className="left-controls">
            <button className="control-button play-pause-button" onClick={togglePlay}>
              {isPlaying ? (
                <svg viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" fill="currentColor" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24">
                  <path d="M6 4l15 8-15 8z" fill="currentColor" />
                </svg>
              )}
            </button>

            <button className="control-button skip-back-button" onClick={skipBack}>
              <svg viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
                <path d="M11 8v3.5l-3-1.5v3l3-1.5V15l4-3.5z" fill="currentColor"/>
                <text x="12" y="12" textAnchor="middle" dominantBaseline="middle" fontSize="6" fill="currentColor">10</text>
              </svg>
            </button>

            <button className="control-button skip-forward-button" onClick={skipForward}>
              <svg viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
                <path d="M13 8v3.5l3-1.5v3l-3-1.5V15l-4-3.5z" fill="currentColor"/>
                <text x="12" y="12" textAnchor="middle" dominantBaseline="middle" fontSize="6" fill="currentColor">10</text>
              </svg>
            </button>

            <div className="volume-container">
              <button className="control-button volume-button" onClick={toggleMute}>
                <svg viewBox="0 0 24 24">
                  {isMuted || volume === 0 ? (
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" fill="currentColor"/>
                  ) : (
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="currentColor"/>
                  )}
                </svg>
              </button>
              <div className="volume-slider">
                <div className="volume-progress" style={{ width: `${(isMuted ? 0 : volume) * 100}%` }} />
                <div className="volume-handle" style={{ left: `${(isMuted ? 0 : volume) * 100}%` }} />
              </div>
            </div>

            <div className="time-display">
              <span className="current-time">{formatTime(currentTime)}</span>
              <span className="time-separator">/</span>
              <span className="total-time">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Center Controls */}
          <div className="center-controls">
            <h2 className="video-title">{movie.titulo}</h2>
          </div>

          {/* Right Controls */}
          <div className="right-controls">
            <button className="control-button next-episode-button">
              <svg viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" fill="currentColor"/>
              </svg>
            </button>

            <button className="control-button episodes-button" onClick={() => setShowEpisodesOverlay(!showEpisodesOverlay)}>
              <svg viewBox="0 0 24 24">
                <path d="M3 3h18v4H3V3zm0 6h18v4H3V9zm0 6h18v4H3v-4z" fill="currentColor"/>
              </svg>
            </button>

            <button className="control-button subtitles-button" onClick={() => setShowSubtitlesMenu(!showSubtitlesMenu)}>
              <svg viewBox="0 0 24 24">
                <path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1zm7 0h-1.5v-.5h-2v3h2V13H18v1c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1z" fill="currentColor"/>
              </svg>
            </button>

            <button className="control-button playback-speed-button" onClick={() => setShowSpeedMenu(!showSpeedMenu)}>
              <svg viewBox="0 0 24 24">
                <path d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44z" fill="currentColor"/>
                <path d="M10.59 15.41a2 2 0 0 0 2.83 0l5.66-5.66a2 2 0 0 0-2.83-2.83L12 11.17 7.76 6.93a2 2 0 0 0-2.83 2.83l5.66 5.65z" fill="currentColor"/>
              </svg>
            </button>

            <button className="control-button fullscreen-button" onClick={toggleFullscreen}>
              {isFullscreen ? (
                <svg viewBox="0 0 24 24">
                  <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" fill="currentColor"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" fill="currentColor"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay Menus */}
      {showSubtitlesMenu && (
        <div className="subtitles-menu">
          <div className="menu-item selected">Desativado</div>
          <div className="menu-item">Português</div>
          <div className="menu-item">Inglês</div>
        </div>
      )}

      {showSpeedMenu && (
        <div className="playback-speed-menu">
          <div className="menu-item">0.5x</div>
          <div className="menu-item">0.75x</div>
          <div className="menu-item selected">Normal</div>
          <div className="menu-item">1.25x</div>
          <div className="menu-item">1.5x</div>
        </div>
      )}

      {showEpisodesOverlay && (
        <div className="episodes-overlay">
          <div className="episodes-header">
            <h3>Episódios</h3>
            <button onClick={() => setShowEpisodesOverlay(false)}>✕</button>
          </div>
          <div className="episodes-list">
            <div className="episode-item current">
              <div className="episode-thumbnail" style={{ backgroundImage: `url(${movie.capa})` }} />
              <div className="episode-info">
                <h4>1. {movie.titulo}</h4>
                <p>{movie.duracao}</p>
                <p className="episode-synopsis">{movie.sinopse.substring(0, 100)}...</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayerPage;
