import React, { useRef, FunctionComponent } from "react";
import useVideoPlayer from "../../../hooks/useVideoPlayer";
import "./VideoPlayer.css";

export interface VideoPlayerProps {
  source: string,
  title?: string,
  showTitle: boolean,
  muted: boolean,
  playLabel: string,
  pauseLabel: string,
  stopLabel: string,
  progressbarLabel: string,
  muteLabel: string,
  unmuteLabel: string,
  poster?: string,
  captions?: string
};

const VideoPlayer: FunctionComponent<VideoPlayerProps> = ({
  source,
  title,
  showTitle = false,
  muted = false,
  playLabel = "Play",
  pauseLabel = "Pause",
  stopLabel = "Stop",
  progressbarLabel = "Seek",
  muteLabel = "Mute",
  unmuteLabel = "Unmute",
  poster,
  captions
}: VideoPlayerProps) => {
  const videoElement = useRef(null);
  const {
    playerState,
    togglePlay,
    stop,
    toggleMute,
    handleOnTimeUpdate,
    handleTimeSelection,
    handleOnLoadedMetadata,
    handleOnEnded
  } = useVideoPlayer(videoElement, muted);

  return (
    <div className="mylib--videoPlayer">
      {(title && showTitle) && (
        <div className="mylib--videoPlayer__title">{title}</div>
      )}
      <div className="mylib--videoPlayer__video-wrapper">
        <video
          className="mylib--videoPlayer__video"
          ref={videoElement}
          muted={muted}
          poster={poster}
          onTimeUpdate={handleOnTimeUpdate}
          onLoadedMetadata={handleOnLoadedMetadata}
          onEnded={handleOnEnded}
          onClick={togglePlay}
          preload="metadata"
          playsInline
        >
          <source src={source} />
          <track kind="captions" label="français" srcLang="fr" src={captions} />
        </video>
      </div>
      <div className="mylib--videoPlayer__controls">
        <input
          className="mylib--videoPlayer__progressbar"
          type="range"
          min="0"
          max="100"
          step="0.01"
          value={playerState.progress}
          aria-label={progressbarLabel}
          onChange={(e) => handleTimeSelection(e)}
        />
        <button className="mylib--videoPlayer__button mylib--videoPlayer__play" onClick={togglePlay}>
          {playerState.isPlaying ? pauseLabel : playLabel}
        </button>
        <button className="mylib--videoPlayer__button mylib--videoPlayer__stop" onClick={stop}>
          {stopLabel}
        </button>
        <div className="mylib--videoPlayer__time">
          {playerState.currentTime} / {playerState.duration}
        </div>
        <button className="mylib--videoPlayer__button mylib--videoPlayer__mute" onClick={toggleMute}>
          {playerState.isMuted ? unmuteLabel : muteLabel}
        </button>
      </div>
    </div>
  );
}

export default VideoPlayer;
