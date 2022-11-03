import type { StoryObj, Meta } from "@storybook/react";
import React from "react";
import VideoPlayer, { VideoPlayerProps } from "../../../components/media/VideoPlayer/VideoPlayer";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Media/Video player",
  component: VideoPlayer
} as Meta<typeof VideoPlayer>;

export const Sandbox = (args:VideoPlayerProps) => {
  return (
    <VideoPlayer {...args} />
  );
};
Sandbox.args = {
  sources: [
    "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
    "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4",
    "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4"
  ],
  poster: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg",
  captions: [
    {
      kind: "captions",
      src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt",
      srcLang: "fr",
      label: "Français",
      default: false
    },
    {
      kind: "captions",
      src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt",
      srcLang: "en",
      label: "English",
      default: true
    }
  ],
  title: "Tears of Steel",
  showTitle: true,
  interfaceLabels: {
    play: "Lecture",
    pause: "Pause",
    stop: "Arrêt",
    fullscreen: "Plein écran",
    quitfullscreen: "Quitter le plein écran",
    mute: "Désactiver le son",
    unmute: "Activer le son",
    progressbar: "Chercher"
  },
};
