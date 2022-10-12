import React from "react";
import { motion } from "framer-motion";
import { Context } from "../Context/PlayerContext";
const format = require("format-duration");

export default function Playback() {
  const { seekValue, setSeekValue, currentTime, duration, playerRef } =
    React.useContext(Context);

  return (
    <div className="group relative flex w-full flex-col items-center justify-center">
      <div className="flex w-full items-center gap-3">
        <p>{format(currentTime * 1000)}</p>
        <div className="relative m-0 -mt-0.5 w-full p-0 leading-none">
          <motion.input
            id="track"
            type="range"
            value={seekValue}
            onChange={(e) => {
              setSeekValue(e.target.value);
              const seekto =
                playerRef.current.duration * (+e.target.value / 100);
              playerRef.current.currentTime = seekto;
            }}
            // className="h-[5px] w-full appearance-none rounded-full bg-gray-500/50 transition-all duration-300 ease-in-out"
            className="h-[6px] w-full cursor-pointer rounded-full"
          />
        </div>
        <p>{format(currentTime * 1000 - duration * 1000)}</p>
      </div>
    </div>
  );
}
