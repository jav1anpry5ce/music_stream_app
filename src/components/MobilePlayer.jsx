import React from "react";
import { Context } from "../Context/PlayerContext";
import { FaPlay, FaPause } from "react-icons/fa";
import { motion } from "framer-motion";

export default function MobilePlayer() {
  const { setPlayer, playing, currentTrack, setPlaying } =
    React.useContext(Context);

  const main = {
    initial: {
      opacity: 0.5,
      y: 200,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <motion.div
      variants={main}
      initial={currentTrack ? "animate" : "initial"}
      animate={currentTrack ? "animate" : "initial"}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-2 py-0.5 text-white backdrop-blur-lg"
    >
      <div className="flex items-center gap-2">
        <img
          src={currentTrack?.images?.coverart}
          alt=""
          className="h-10 w-10 rounded"
          onClick={setPlayer}
        />
        <div className="leading-none text-white">
          <p className="text-xs font-bold">{currentTrack?.title}</p>
          <p className="text-xs text-gray-200">{currentTrack?.subtitle}</p>
        </div>
      </div>
      <button onClick={() => setPlaying((prev) => !prev)}>
        {playing ? <FaPause fontSize={18} /> : <FaPlay fontSize={18} />}
      </button>
    </motion.div>
  );
}
