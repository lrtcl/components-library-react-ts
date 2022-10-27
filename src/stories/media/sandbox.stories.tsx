import type { StoryObj, Meta } from "@storybook/react";
import React from "react";
import VideoPlayer, { VideoPlayerProps } from "../../components/media/VideoPlayer/VideoPlayer";
// import video from "../assets/videos/tears-of-steel-battle-clip-medium.mp4";
// import poster from "../assets/images/poster.jpg"

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
  title: "Tears of Steel",
  playLabel: "Lecture",
  pauseLabel: "Pause",
  progressbarLabel: "Chercher",
  muteLabel: "Désactiver le son",
  unmuteLabel: "Activer le son",
  poster: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
};
