import React from "react";
import { Context } from "../Context/PlayerContext";
import Controls from "./Controls";
import Playback from "./Playback";
import { motion, useMotionValue } from "framer-motion";

export default function MiniPlayer() {
  const { setPlayer, playing, currentTrack } = React.useContext(Context);
  const rotate = useMotionValue(0);
  const variants = {
    initial: {
      rotate: rotate.get() || 0,
    },
    animate: {
      rotate: [rotate.get() || 0, rotate.get() + 360],
    },
  };
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
      className="absolute bottom-0 w-[100%] overflow-hidden bg-transparent p-4 backdrop-blur-lg"
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <div className="mb-3 flex flex-col items-center justify-center text-white lg:-mb-3">
        <p className="font-bold lg:leading-none">{currentTrack?.title}</p>
        <p className="text-center text-sm text-gray-200">
          {currentTrack?.subtitle}
        </p>
      </div>
      <div className="mx-auto flex w-full max-w-[85%] flex-col items-center justify-between gap-2 text-white lg:flex-row lg:gap-8">
        <motion.img
          style={{ rotate }}
          src={currentTrack?.images?.coverart}
          alt=""
          className="h-[60px] w-[60px] rounded-full object-cover"
          onClick={setPlayer}
          variants={variants}
          animate={playing ? "animate" : "initial"}
          initial="initial"
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />
        <Playback />
        <Controls />
      </div>
    </motion.div>
  );
}
