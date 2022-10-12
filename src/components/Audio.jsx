import React, { useEffect, useRef } from "react";
import { Context } from "../Context/PlayerContext";

export default function Audio() {
  const ref = useRef();
  const {
    setCurrentTime,
    setSeekValue,
    setDuration,
    setPlaying,
    playing,
    setPlayerRef,
    currentTrack,
    skipTrack,
    repeat,
    mobile,
  } = React.useContext(Context);

  useEffect(() => {
    setPlayerRef(ref);
    if (mobile) {
      ref.current.volume = 1;
    } else {
      ref.current.volume = 0.3;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ref.current) {
      playing ? ref.current.play() : ref.current.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  const onPlaying = () => {
    setSeekValue((ref.current.currentTime / ref.current.duration) * 100);
    setDuration(ref.current.duration);
    setCurrentTime(ref.current.currentTime);
  };

  const onLoad = () => {
    setPlaying(true);
    setSeekValue((ref.current.currentTime / ref.current.duration) * 100);
    setCurrentTime(ref.current.currentTime);
    setDuration(ref.current.duration);
  };

  const onEnd = () => {
    setPlaying(false);
    setSeekValue(0);
    setCurrentTime(0);
    skipTrack("forward");
  };
  return (
    <audio
      onTimeUpdate={onPlaying}
      onLoadedMetadata={onLoad}
      loop={repeat}
      onEnded={onEnd}
      ref={ref}
      src={currentTrack?.hub?.actions && currentTrack?.hub?.actions[1]?.uri}
    />
  );
}
