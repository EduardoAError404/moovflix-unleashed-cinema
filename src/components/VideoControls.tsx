
import React, { useState } from 'react';
import { Movie } from '@/types/movie';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize,
  Subtitles,
  Settings
} from 'lucide-react';

interface VideoControlsProps {
  movie: Movie;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  buffered: number;
  showControls: boolean;
  isFullscreen: boolean;
  onTogglePlayPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
  onSkipBack: () => void;
  onSkipForward: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  movie,
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  buffered,
  showControls,
  isFullscreen,
  onTogglePlayPause,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleFullscreen,
  onSkipBack,
  onSkipForward
}) => {
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [previewTime, setPreviewTime] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    onSeek(clickPosition * duration);
  };

  const handleProgressBarMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const hoverPosition = (e.clientX - rect.left) / rect.width;
    setPreviewTime(hoverPosition * duration);
    setShowPreview(true);
  };

  const handleProgressBarMouseLeave = () => {
    setShowPreview(false);
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
  const bufferedPercentage = duration ? (buffered / duration) * 100 : 0;
  const volumePercentage = volume * 100;

  return (
    <div className={`absolute bottom-0 left-0 right-0 z-40 transition-all duration-300 ${
      showControls ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Gradiente de fundo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      
      <div className="relative p-6">
        {/* Barra de Progresso */}
        <div className="mb-4">
          <div
            className="relative h-1 bg-white/30 cursor-pointer group hover:h-1.5 transition-all duration-200"
            onClick={handleProgressBarClick}
            onMouseMove={handleProgressBarMouseMove}
            onMouseLeave={handleProgressBarMouseLeave}
          >
            {/* Barra de Buffer */}
            <div
              className="absolute top-0 left-0 h-full bg-white/50"
              style={{ width: `${bufferedPercentage}%` }}
            />
            
            {/* Barra de Progresso */}
            <div
              className="absolute top-0 left-0 h-full bg-red-600"
              style={{ width: `${progressPercentage}%` }}
            />
            
            {/* Indicador de Progresso */}
            <div
              className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ left: `${progressPercentage}%`, marginLeft: '-6px' }}
            />

            {/* Preview de Tempo */}
            {showPreview && (
              <div
                className="absolute bottom-2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-sm"
                style={{ left: `${(previewTime / duration) * 100}%` }}
              >
                {formatTime(previewTime)}
              </div>
            )}
          </div>
        </div>

        {/* Controles */}
        <div className="flex items-center justify-between">
          {/* Controles da Esquerda */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onTogglePlayPause}
              className="text-white hover:text-gray-300 transition-colors p-2"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
            </button>

            <button
              onClick={onSkipBack}
              className="text-white hover:text-gray-300 transition-colors p-2"
            >
              <SkipBack className="w-6 h-6" />
            </button>

            <button
              onClick={onSkipForward}
              className="text-white hover:text-gray-300 transition-colors p-2"
            >
              <SkipForward className="w-6 h-6" />
            </button>

            {/* Controle de Volume */}
            <div 
              className="flex items-center space-x-2"
              onMouseEnter={() => setIsVolumeVisible(true)}
              onMouseLeave={() => setIsVolumeVisible(false)}
            >
              <button
                onClick={onToggleMute}
                className="text-white hover:text-gray-300 transition-colors p-2"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>

              <div className={`transition-all duration-300 ${isVolumeVisible ? 'w-20 opacity-100' : 'w-0 opacity-0'} overflow-hidden`}>
                <div className="relative h-1 bg-white/30 cursor-pointer group">
                  <div
                    className="absolute top-0 left-0 h-full bg-white"
                    style={{ width: `${volumePercentage}%` }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volumePercentage}
                    onChange={(e) => onVolumeChange(parseInt(e.target.value) / 100)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Display de Tempo */}
            <div className="text-white text-sm font-medium">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Título Central */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h2 className="text-white text-xl font-semibold">{movie.titulo}</h2>
          </div>

          {/* Controles da Direita */}
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-gray-300 transition-colors p-2">
              <Subtitles className="w-6 h-6" />
            </button>

            <button className="text-white hover:text-gray-300 transition-colors p-2">
              <Settings className="w-6 h-6" />
            </button>

            <button
              onClick={onToggleFullscreen}
              className="text-white hover:text-gray-300 transition-colors p-2"
            >
              {isFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;
