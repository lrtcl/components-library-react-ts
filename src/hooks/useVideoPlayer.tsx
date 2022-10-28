import React, { useState, useEffect } from "react";

const useVideoPlayer = (videoElement: React.RefObject<HTMLVideoElement>, muted?: boolean) => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    currentTime: "00:00",
    duration: "00:00",
    isMuted: muted || false,
    isFullscreen: false
  });

  /**
   * Convert time into string
   */
  const convertTimeToString = (time:number) => {
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
  }

  /**
   * Handle the loaded metadata event
   */
  const handleOnLoadedMetadata = () => {
    if (videoElement.current) {
      setPlayerState({
        ...playerState,
        duration: convertTimeToString(videoElement.current.duration)
      });
    }
  };

  /**
   * Handle the playing state
   */
  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying
    });
  };

  useEffect(() => {
    if (videoElement.current) {
      playerState.isPlaying ? videoElement.current.play() : videoElement.current.pause();
    }
  }, [playerState.isPlaying, videoElement]);

  /**
   * Stop the video
   */
  const stopVideo = () => {
    if (videoElement.current) {
      videoElement.current.currentTime = 0;
    }
    setPlayerState({
      ...playerState,
      isPlaying: false,
      progress: 0
    });
  }

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
  }

  /**
   * Handle the manual time selection
   */
  const handleTimeSelection = (event:React.ChangeEvent<HTMLInputElement>) => {
    const targetProgress = Number(event.target.value);
    if (videoElement.current) {
      videoElement.current.currentTime = videoElement.current.duration * (targetProgress / 100);
      setPlayerState({
        ...playerState,
        progress: targetProgress,
        currentTime: convertTimeToString(videoElement.current.currentTime)
      });
    }
  }

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
    setPlayerState({
      ...playerState,
      isFullscreen: !playerState.isFullscreen
    });
  }

  /**
   * Handle the video ending event
   */
  const handleOnEnded = () => {
    setPlayerState({
      ...playerState,
      isPlaying: false
    });
  }

  return {
    playerState,
    togglePlay,
    stopVideo,
    toggleMute,
    toggleFullscreen,
    handleOnTimeUpdate,
    handleTimeSelection,
    handleOnLoadedMetadata,
    handleOnEnded
  }
};

export default useVideoPlayer;
