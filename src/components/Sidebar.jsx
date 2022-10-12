import React, { useContext } from "react";
import { Context } from "../Context/PlayerContext";
import { motion } from "framer-motion";
import Search from "./Search";
import MusicGenre from "../utils/MusicGenre";

export default function Sidebar() {
  const { currentTrack, mobile, setGenre, genre } = useContext(Context);

  const variants = {
    initial: {
      height: "100%",
    },
    animate: {
      height: 893,
    },
  };
  if (!mobile)
    return (
      <motion.div
        variants={variants}
        initial={currentTrack ? "animate" : "initial"}
        animate={currentTrack ? "animate" : "initial"}
        transition={{
          duration: 0.6,
          ease: "linear",
        }}
        className="absolute top-0 left-0 bottom-0 z-20 w-[18rem] bg-gradient-to-tr from-[#10084f] to-[#3c002c] text-white"
      >
        <Search />
        <div className="mt-8 flex flex-col items-start justify-start gap-2 px-3">
          {MusicGenre.map((g) => (
            <button
              onClick={() => setGenre(g.value)}
              className={`hover:text-yellow-400 ${
                g.value === genre ? "text-yellow-400" : "text-white"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </motion.div>
    );
  return null;
}
