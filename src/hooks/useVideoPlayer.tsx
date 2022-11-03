import React, { useState, useEffect, useCallback } from "react";
import { Caption } from "../components/media/VideoPlayer/VideoPlayer";

const useVideoPlayer = (videoPlayerElement: React.RefObject<HTMLDivElement>, videoElement: React.RefObject<HTMLVideoElement>, muted?: boolean, captions?: Caption[]) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(muted || false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");

  /**
   * Convert time into string
   */
  const convertTimeToString = useCallback((time: number) => {
    time = Math.floor(time);
    let hours = Math.floor(time / 3600);
    time %= 3600;
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    let hoursString: string;
    let minutesString: string;
    let secondsString: string;

    hoursString = hours.toString().padStart(2, "0");
    minutesString = minutes.toString().padStart(2, "0");
    secondsString = seconds.toString().padStart(2, "0");

    if (hours > 0) {
      return (hoursString + ":" + minutesString + ":" + secondsString);
    } else {
      return (minutesString + ":" + secondsString);
    }
  }, []);

  /**
   * Handle the loaded metadata event
   */
  useEffect(() => {
    function handleOnLoadedMetadata() {
      if (videoElement.current) {
        setDuration(convertTimeToString(videoElement.current?.duration));
      }
    }
    videoElement.current?.addEventListener('loadeddata', handleOnLoadedMetadata);
    return () => {
      videoElement.current?.removeEventListener('loadeddata', handleOnLoadedMetadata);
    }
  }, []);

  /**
   * Play and pause the video
   */
  const togglePlay = () => {
    setIsPlaying(isPlaying => !isPlaying);
  };

  useEffect(() => {
    if (isPlaying && (videoElement.current?.paused || videoElement.current?.ended)) {
      videoElement.current?.play();
    } else if (!isPlaying && !videoElement.current?.paused) {
      videoElement.current?.pause();
    }
  }, [isPlaying, videoElement]);

  useEffect(() => {
    function handleOnClick() {
      setIsPlaying(isPlaying => !isPlaying);
    }
    function handleOnPlay() {
      setIsPlaying(true);
    }
    function handleOnPause() {
      setIsPlaying(false);
    }
    videoElement.current?.addEventListener('click', handleOnClick);
    videoElement.current?.addEventListener('play', handleOnPlay);
    videoElement.current?.addEventListener('pause', handleOnPause);
    return () => {
      videoElement.current?.removeEventListener('click', handleOnClick);
      videoElement.current?.removeEventListener('play', handleOnPlay);
      videoElement.current?.removeEventListener('pause', handleOnPause);
    }
  }, []);

  /**
   * Stop the video
   */
  const stopVideo = () => {
    if (videoElement.current) {
      videoElement.current.currentTime = 0;
    }
    setIsPlaying(false);
    setProgress(0);
  };

  /**
   * Handle the progress update
   */
  const handleOnTimeUpdate = () => {
    if (videoElement.current) {
      const currentProgress = (videoElement.current.currentTime / videoElement.current.duration) * 100;
      setProgress(currentProgress);
      setCurrentTime(convertTimeToString(videoElement.current.currentTime));
    }
  };

  /**
   * Handle the manual time selection
   */
  const handleTimeSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetProgress = Number(event.target.value);
    if (videoElement.current) {
      videoElement.current.currentTime = videoElement.current.duration * (targetProgress / 100);
      setProgress(targetProgress);
      setCurrentTime(convertTimeToString(videoElement.current.currentTime));
    }
  };

  /**
   * Handle the muted state
   */
  const toggleMute = () => {
    setIsMuted(isMuted => !isMuted);
  };

  useEffect(() => {
    if (videoElement.current) {
      isMuted ? videoElement.current.muted = true : videoElement.current.muted = false;
    }
  }, [isMuted, videoElement]);

  /**
   * Handle the fullscreen state
   */
  const toggleFullscreen = () => {
    if (document.fullscreenElement !== null) {
      // The document is in fullscreen mode
      document.exitFullscreen();
    } else {
      // The document is not in fullscreen mode
      videoPlayerElement.current?.requestFullscreen();
    }
  };

  /**
   * Add a listener for the onFullcreenChange event
   */
  useEffect(() => {
    function handleOnFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener('fullscreenchange', handleOnFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleOnFullscreenChange);
  }, []);

  /**
   * Toggle a class on the video player when changing the fullscreen status
   */
  useEffect(() => {
    if (isFullscreen) {
      videoPlayerElement.current?.classList.add("is-fullscreen");
    } else {
      videoPlayerElement.current?.classList.remove("is-fullscreen");
    }
  }, [isFullscreen]);

  /**
   * Handle the video ending event
   */
  const handleOnEnded = () => {
    setIsPlaying(false);
  };

  /**
   * Handle the subtitles
   */
  console.log(captions);

  return {
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
  };
};

export default useVideoPlayer;
