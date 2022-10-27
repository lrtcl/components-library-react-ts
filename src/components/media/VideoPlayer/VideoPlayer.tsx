import React, { useRef, FunctionComponent } from "react";
import useVideoPlayer from "../../../hooks/useVideoPlayer";

export interface VideoPlayerProps {
  source: string,
  title?: string,
  muted: boolean,
  playLabel: string,
  pauseLabel: string,
  progressbarLabel: string,
  muteLabel: string,
  unmuteLabel: string,
  poster?: string
};

const VideoPlayer: FunctionComponent<VideoPlayerProps> = ({
  source,
  title,
  muted = false,
  playLabel = "Play",
  pauseLabel = "Pause",
  progressbarLabel = "Seek",
  muteLabel = "Mute",
  unmuteLabel = "Unmute",
  poster
}: VideoPlayerProps) => {
  const videoElement = useRef(null);
  const { playerState, togglePlay, stop, toggleMute, handleOnTimeUpdate, handleTimeSelection, handleOnLoadedMetadata } = useVideoPlayer(videoElement, muted);

  return (
    <div className="mylib--videoPlayer">
      <div>{title}</div>
      <video
        ref={videoElement}
        src={source}
        muted={muted}
        poster={poster}
        onTimeUpdate={handleOnTimeUpdate}
        onLoadedMetadata={handleOnLoadedMetadata}
        onClick={togglePlay}
        preload="metadata"
        playsInline
      />
      <button onClick={togglePlay}>
        {playerState.isPlaying ? pauseLabel : playLabel}
      </button>
      <button onClick={stop}>
        Stop
      </button>
      <button onClick={toggleMute}>
        {playerState.isMuted ? unmuteLabel : muteLabel}
      </button>
      <input
        type="range"
        min="0"
        max="100"
        step="0.01"
        value={playerState.progress}
        aria-label={progressbarLabel}
        onChange={(e) => handleTimeSelection(e)}
      />
      <div>{playerState.currentTime} / {playerState.duration}</div>
    </div>
  );
}

export default VideoPlayer;
