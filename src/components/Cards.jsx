import React, { useContext } from "react";
import { Context } from "../Context/PlayerContext";
import { FaPlay, FaPause } from "react-icons/fa";

export default function Cards({ track }) {
  const { setTrack, currentTrack, setPlaying, playing } = useContext(Context);

  const handlePlay = () => {
    if (currentTrack === track && playing) {
      setPlaying((playing) => !playing);
    } else if (currentTrack === track && !playing) {
      setPlaying((playing) => !playing);
    } else {
      setTrack(track);
    }
  };

  return (
    <div
      className={`group flex h-auto w-[45%] cursor-pointer flex-col items-center justify-center gap-3 p-2 text-white hover:rounded-lg hover:bg-white/10 lg:w-[16rem] ${
        currentTrack === track && "rounded-lg bg-white/10"
      }`}
      onClick={handlePlay}
    >
      <div className="relative flex items-center justify-center">
        <img
          src={
            track.images?.coverart ||
            "https://www.rootzwiki.com/attachments/unkownalbum-jpg.19745/"
          }
          alt="cover"
          className="w-[85%] rounded-lg lg:h-52 lg:w-52"
        />
        <div className="absolute left-[50%] top-[50%] m-0 hidden translate-x-[-50%] rounded-full bg-black/50 p-2 group-hover:block">
          {currentTrack === track && playing ? (
            <FaPause fontSize={20} />
          ) : (
            <FaPlay fontSize={20} className="pl-0.5" />
          )}
        </div>
      </div>
      <div className="w-full text-ellipsis text-center">
        <p className="truncate text-center text-sm font-bold lg:text-base lg:leading-5">
          {track.title}
        </p>
        <p className="truncate text-xs text-gray-400 lg:text-sm">
          {track.subtitle}
        </p>
      </div>
    </div>
  );
}
