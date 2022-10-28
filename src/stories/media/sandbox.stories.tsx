import type { StoryObj, Meta } from "@storybook/react";
import React from "react";
import VideoPlayer, { VideoPlayerProps } from "../../components/media/VideoPlayer/VideoPlayer";

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
  source: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
  poster: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg",
  captions: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt",
  title: "Tears of Steel",
  showTitle: true,
  playLabel: "Lecture",
  pauseLabel: "Pause",
  stopLabel: "Arrêt",
  progressbarLabel: "Chercher",
  muteLabel: "Désactiver le son",
  unmuteLabel: "Activer le son"
};
