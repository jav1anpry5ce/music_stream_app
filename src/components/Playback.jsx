import React from "react";
import { motion } from "framer-motion";
import { Context } from "../Context/PlayerContext";
const format = require("format-duration");

export default function Playback() {
  const { seekValue, setSeekValue, currentTime, duration, playerRef } =
    React.useContext(Context);

  return (
    <div className="flex w-full items-center justify-center gap-3">
      <p>{format(currentTime * 1000)}</p>
      <motion.input
        id="track"
        type="range"
        min={0}
        max={100}
        step="any"
        value={seekValue}
        onChange={(e) => {
          setSeekValue(e.target.value);
          const seekto = playerRef.current.duration * (+e.target.value / 100);
          playerRef.current.currentTime = seekto;
        }}
        className="mt-0.5 h-[6px] w-full cursor-pointer rounded-full bg-transparent"
      />
      <p>{format(currentTime * 1000 - duration * 1000)}</p>
    </div>
  );
}
