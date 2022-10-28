import React, { useRef, FunctionComponent } from "react";
import useVideoPlayer from "../../../hooks/useVideoPlayer";
import "./VideoPlayer.css";

type InterfaceLabels = {
  play: string,
  pause: string,
  stop: string,
  mute: string,
  unmute: string,
  fullscreen: string,
  quitfullscreen: string,
  progressbar: string
};

type Caption = {
  kind: string,
  src: string,
  srcLang: string,
  label: string,
  default?: boolean
};

export interface VideoPlayerProps {
  /**
   * The sources of the video
   */
  sources: string[],
  title?: string,
  showTitle: boolean,
  muted: boolean,
  interfaceLabels: InterfaceLabels,
  poster?: string,
  captions?: Caption[]
};

/**
 * Get the extension out of a file name
 */
const getExtension = (filename:string) => {
  return filename.substring(filename.lastIndexOf(".") + 1);
}

const VideoPlayer: FunctionComponent<VideoPlayerProps> = ({
  sources,
  title,
  showTitle = false,
  muted = false,
  interfaceLabels,
  poster,
  captions
}: VideoPlayerProps) => {
  const videoElement = useRef(null);
  const {
    playerState,
    togglePlay,
    stopVideo,
    toggleMute,
    toggleFullscreen,
    handleOnTimeUpdate,
    handleTimeSelection,
    handleOnLoadedMetadata,
    handleOnEnded
  } = useVideoPlayer(videoElement, muted);
  const defaultInterfaceLabels: InterfaceLabels = {
    play: "Play",
    pause: "Pause",
    stop: "Stop",
    mute: "Mute",
    unmute: "Unmute",
    fullscreen: "Full screen",
    quitfullscreen: "Quit full screen",
    progressbar: "Seek"
  };
  interfaceLabels = { ...defaultInterfaceLabels, ...interfaceLabels };

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
          crossOrigin="true"
        >
          {sources.map(source => (
            <source
              src={source}
              type={`video/${getExtension(source)}`}
            />
          ))}
          {captions && captions.map(caption => (
            <track kind={caption.kind} src={caption.src} srcLang={caption.srcLang} label={caption.label} default={caption.default} />
          ))}
        </video>
      </div>
      <div className="mylib--videoPlayer__controls">
        {/* Progress bar */}
        <input
          className="mylib--videoPlayer__progressbar"
          type="range"
          min="0"
          max="100"
          step="0.01"
          value={playerState.progress}
          aria-label={interfaceLabels.play}
          onChange={(e) => handleTimeSelection(e)}
        />
        {/* Play button */}
        <button
          className="mylib--videoPlayer__button mylib--videoPlayer__play"
          type="button"
          onClick={togglePlay}
        >
          {playerState.isPlaying ? interfaceLabels.pause : interfaceLabels.play}
        </button>
        {/* Stop button */}
        <button
          className="mylib--videoPlayer__button mylib--videoPlayer__stop"
          type="button"
          onClick={stopVideo}
        >
          {interfaceLabels.stop}
        </button>
        {/* Current time / Duration display */}
        <div className="mylib--videoPlayer__time">
          {playerState.currentTime} / {playerState.duration}
        </div>
        {/* Fullscreen button */}
        <button
          className="mylib--videoPlayer__button mylib--videoPlayer__fullscreen"
          type="button"
          onClick={toggleFullscreen}
        >
          {playerState.isFullscreen ? interfaceLabels.quitfullscreen : interfaceLabels.fullscreen}
        </button>
        {/* Mute button */}
        <button
          className="mylib--videoPlayer__button mylib--videoPlayer__mute"
          type="button"
          onClick={toggleMute}
        >
          {playerState.isMuted ? interfaceLabels.unmute : interfaceLabels.mute}
        </button>
      </div>
    </div>
  );
}

export default VideoPlayer;
