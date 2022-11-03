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

export type Caption = {
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
  const videoPlayerElement = useRef<null | HTMLDivElement>(null);
  const videoElement = useRef<null | HTMLVideoElement>(null);
  const {
    isPlaying,
    togglePlay,
    stopVideo,
    isFullscreen,
    toggleFullscreen,
    isMuted,
    toggleMute,
    progress,
    currentTime,
    duration,
    handleOnTimeUpdate,
    handleTimeSelection,
    handleOnEnded
  } = useVideoPlayer(videoPlayerElement, videoElement, muted, captions);
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
    <div className="mylib--videoPlayer" ref={videoPlayerElement}>
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
          onEnded={handleOnEnded}
          preload="metadata"
          playsInline
          crossOrigin="true"
        >
          {sources.map((source, index) => (
            <source
              src={source}
              type={`video/${getExtension(source)}`}
              key={index}
            />
          ))}
          {captions && captions.map((caption, index) => (
            <track
              kind={caption.kind}
              src={caption.src}
              srcLang={caption.srcLang}
              label={caption.label}
              default={caption.default}
              key={index}
            />
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
          value={progress}
          aria-label={interfaceLabels.play}
          onChange={(e) => handleTimeSelection(e)}
        />
        {/* Play button */}
        <button
          className="mylib--videoPlayer__button mylib--videoPlayer__play"
          type="button"
          onClick={togglePlay}
        >
          {isPlaying ? interfaceLabels.pause : interfaceLabels.play}
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
          {currentTime} / {duration}
        </div>
        {/* Fullscreen button */}
        <button
          className="mylib--videoPlayer__button mylib--videoPlayer__fullscreen"
          type="button"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? interfaceLabels.quitfullscreen : interfaceLabels.fullscreen}
        </button>
        {/* Mute button */}
        <button
          className="mylib--videoPlayer__button mylib--videoPlayer__mute"
          type="button"
          onClick={toggleMute}
        >
          {isMuted ? interfaceLabels.unmute : interfaceLabels.mute}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
