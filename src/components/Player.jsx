import React from "react";
import { Context } from "../Context/PlayerContext";
import Controls from "./Controls";
import Playback from "./Playback";
import { motion } from "framer-motion";

export default function Player() {
  const { setPlayer, currentTrack, mainPlayer } = React.useContext(Context);

  const variants = {
    initial: {
      opacity: 0,
      scale: 0,
      y: "50vh",
      x: "-50vw",
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
    },
  };

  return (
    <motion.div
      variants={variants}
      initial={mainPlayer ? "animate" : "initial"}
      animate={mainPlayer ? "animate" : "initial"}
      transition={{
        duration: 0.75,
        ease: "backInOut",
      }}
      className="absolute bottom-0 right-0 left-0 z-50 flex h-[100%] flex-col items-center justify-center gap-4 bg-gradient-to-tr from-fuchsia-500 to-slate-900"
    >
      {/* <button className="absolute right-10 top-10 text-white">X</button> */}
      <img
        src={currentTrack?.images?.coverart}
        alt=""
        className="h-64 w-64 rounded-md object-cover lg:h-96 lg:w-96"
        onClick={setPlayer}
      />
      <div className="flex w-[90%] flex-col items-center gap-4 rounded-2xl bg-black/40 p-4 text-white lg:w-[25rem]">
        <div className="-mb-3 flex flex-col items-center justify-center text-center">
          <p className="font-bold lg:leading-none">{currentTrack?.title}</p>
          <p className="text-center text-sm text-gray-300">
            {currentTrack?.subtitle}
          </p>
        </div>
        <Playback />
        <Controls />
      </div>
    </motion.div>
  );
}
