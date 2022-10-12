import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://shazam-core.p.rapidapi.com/v1/";

const Context = createContext();

const Provider = ({ children }) => {
  const [mainPlayer, setMainPlayer] = useState(false);
  const [playerRef, setPlayerRef] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [seekValue, setSeekValue] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [tracks, setTracks] = useState([]);
  const [searchedTracks, setSearchedTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [mobile, setMobile] = useState(false);
  const [genre, setGenre] = useState("POP");

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPod|BlackBerry|IEMobile/i.test(navigator.userAgent)
    ) {
      setMobile(true);
    } else {
      setMobile(false);
    }
    if (window.innerWidth < 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }
    const resize = window.addEventListener("resize", () => {
      if (
        /Android|webOS|iPhone|iPod|BlackBerry|IEMobile/i.test(
          navigator.userAgent
        )
      ) {
        setMobile(true);
      } else {
        setMobile(false);
      }
      if (window.innerWidth < 768) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    });
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const setPlayer = () => {
    setMainPlayer(!mainPlayer);
  };

  const setTrack = (track) => {
    if (track.hub.actions) {
      setCurrentTrack(track);
      setPlaying(false);
    } else {
      alert("This track is not available for streaming");
    }
  };

  const getWorldChart = async () => {
    setSearchedTracks([]);
    setLoading(true);
    const options = {
      params: { genre_code: genre },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    };
    const { data } = await axios.get("/charts/genre-world", options);
    setTracks(data);
    setLoading(false);
  };

  const searchTrack = async (search) => {
    setGenre("");
    setLoading(true);
    const options = {
      params: { query: search, search_type: "SONGS" },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    };
    const { data } = await axios.get("/search/multi", options);
    setSearchedTracks(data.tracks.hits);
    setLoading(false);
  };

  const clearSearchTracks = () => {
    setSearchedTracks([]);
  };

  const skipTrack = (direction) => {
    const searchIndex = searchedTracks.findIndex(
      (track) => track.track.url === currentTrack.url
    );
    const trackIndex = tracks.findIndex(
      (track) => track.url === currentTrack.url
    );
    if (direction === "forward") {
      if (searchedTracks.length > 0) {
        if (shuffle) {
          setCurrentTrack(
            searchedTracks[Math.floor(Math.random() * searchedTracks.length)]
              .track
          );
        } else {
          setCurrentTrack(searchedTracks[searchIndex + 1].track);
        }
      } else {
        if (shuffle) {
          setCurrentTrack(tracks[Math.floor(Math.random() * tracks.length)]);
        } else {
          setCurrentTrack(tracks[trackIndex + 1]);
        }
      }
    } else {
      if (playerRef.current.currentTime > 2) {
        playerRef.current.currentTime = 0;
        setTimeout(() => {
          setPlaying(true);
          playerRef.current.play();
        }, 250);
      } else {
        if (searchedTracks.length > 0) {
          if (shuffle) {
            setCurrentTrack(
              searchedTracks[Math.floor(Math.random() * searchedTracks.length)]
                .track
            );
          } else {
            setCurrentTrack(searchedTracks[searchIndex - 1].track);
          }
        } else {
          if (shuffle)
            setCurrentTrack(tracks[Math.floor(Math.random() * tracks.length)]);
          setCurrentTrack(tracks[trackIndex - 1]);
        }
      }
    }
    setPlaying(false);
  };

  useEffect(() => {
    getWorldChart();
    // eslint-disable-next-line
  }, [genre]);

  useEffect(() => {
    if (!currentTrack) {
      setMainPlayer(false);
    }
  }, [currentTrack]);

  const changeVolume = (value) => {
    setVolume(value);
    playerRef.current.volume = value;
  };

  const value = {
    skipTrack,
    setTrack,
    currentTrack,
    tracks,
    searchTrack,
    getWorldChart,
    mainPlayer,
    setPlayer,
    playerRef,
    setPlayerRef,
    playing,
    setPlaying,
    seekValue,
    setSeekValue,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    searchedTracks,
    shuffle,
    setShuffle,
    repeat,
    setRepeat,
    loading,
    clearSearchTracks,
    volume,
    changeVolume,
    mobile,
    setGenre,
    genre,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
