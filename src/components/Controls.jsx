import React from "react";
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";
import {
  BsFillVolumeDownFill,
  BsFillVolumeMuteFill,
  BsFillVolumeUpFill,
} from "react-icons/bs";
import { BiShuffle } from "react-icons/bi";
import { BsArrowRepeat } from "react-icons/bs";
import { Context } from "../Context/PlayerContext";

export default function Controls() {
  const {
    playing,
    setPlaying,
    skipTrack,
    shuffle,
    setShuffle,
    repeat,
    setRepeat,
    volume,
    changeVolume,
    mobile,
  } = React.useContext(Context);
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="flex items-center gap-8">
        <button onClick={() => setShuffle((prev) => !prev)}>
          <BiShuffle fontSize={22} color={shuffle ? "green" : "white"} />
        </button>
        <button onClick={() => skipTrack("backward")}>
          <FaStepBackward fontSize={24} />
        </button>
        <button onClick={() => setPlaying((playing) => !playing)}>
          {playing ? <FaPause fontSize={24} /> : <FaPlay fontSize={24} />}
        </button>
        <button onClick={() => skipTrack("forward")}>
          <FaStepForward fontSize={24} />
        </button>
        <button onClick={() => setRepeat((prev) => !prev)}>
          <BsArrowRepeat fontSize={22} color={repeat ? "green" : "white"} />
        </button>
      </div>
      {!mobile && (
        <div className="flex w-full items-center justify-center gap-1">
          <input
            value={volume * 100}
            step="any"
            type="range"
            className="h-[6px] w-full cursor-pointer rounded-full bg-transparent"
            onChange={(e) => changeVolume(e.target.value / 100)}
          />
          {volume > 0.6 ? (
            <BsFillVolumeUpFill
              fontSize={24}
              onClick={() => changeVolume(0)}
              className="cursor-pointer"
            />
          ) : volume > 0 ? (
            <BsFillVolumeDownFill
              fontSize={24}
              onClick={() => changeVolume(0)}
              className="cursor-pointer"
            />
          ) : (
            <BsFillVolumeMuteFill
              fontSize={24}
              onClick={() => changeVolume(1)}
              className="cursor-pointer"
            />
          )}
        </div>
      )}
    </div>
  );
}
