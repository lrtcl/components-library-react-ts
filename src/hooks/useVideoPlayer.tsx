import React, { useState, useEffect } from "react";

const useVideoPlayer = (videoPlayerElement: React.RefObject<HTMLDivElement>, videoElement: React.RefObject<HTMLVideoElement>, muted?: boolean) => {
  const [playerState, setPlayerState] = useState({
    progress: 0,
    currentTime: "00:00",
    duration: "00:00",
    isMuted: muted || false
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  /**
   * Convert time into string
   */
  const convertTimeToString = (time: number) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);
    let minutesString: string;
    let secondsString: string;

    if (minutes < 10) {
      minutesString = "0" + minutes.toString();
    } else {
      minutesString = minutes.toString();
    }
    if (seconds < 10) {
      secondsString = "0" + seconds.toString();
    } else {
      secondsString = seconds.toString();
    }

    return (minutesString + ":" + secondsString);
  };

  /**
   * Handle the loaded metadata event
   */
  useEffect(() => {
    function handleOnLoadedMetadata() {
      if (videoElement.current) {
        setPlayerState({
          ...playerState,
          duration: convertTimeToString(videoElement.current.duration)
        });
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
    setIsPlaying(!isPlaying);
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
      setIsPlaying((isPlaying) => {
        if (isPlaying) return false;
        return true;
      });
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
    setPlayerState({
      ...playerState,
      progress: 0
    });
  };

  /**
   * Handle the progress update
   */
  const handleOnTimeUpdate = () => {
    if (videoElement.current) {
      const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100;
      setPlayerState({
        ...playerState,
        progress,
        currentTime: convertTimeToString(videoElement.current.currentTime)
      })
    }
  };

  /**
   * Handle the manual time selection
   */
  const handleTimeSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetProgress = Number(event.target.value);
    if (videoElement.current) {
      videoElement.current.currentTime = videoElement.current.duration * (targetProgress / 100);
      setPlayerState({
        ...playerState,
        progress: targetProgress,
        currentTime: convertTimeToString(videoElement.current.currentTime)
      });
    }
  };

  /**
   * Handle the muted state
   */
  const toggleMute = () => {
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted
    });
  };

  useEffect(() => {
    if (videoElement.current) {
      playerState.isMuted ? videoElement.current.muted = true : videoElement.current.muted = false;
    }
  }, [playerState.isMuted, videoElement]);

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
    setPlayerState({
      ...playerState
    });
  };

  return {
    playerState,
    isPlaying,
    isFullscreen,
    togglePlay,
    stopVideo,
    toggleMute,
    toggleFullscreen,
    handleOnTimeUpdate,
    handleTimeSelection,
    handleOnEnded
  };
};

export default useVideoPlayer;
