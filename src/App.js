import { useContext } from "react";
import {
  Player,
  MiniPlayer,
  Cards,
  MobilePlayer,
  Sidebar,
  Search,
} from "./components";
import Audio from "./components/Audio";
import { Context } from "./Context/PlayerContext";
import { BounceLoader } from "react-spinners";

function App() {
  const { tracks, currentTrack, searchedTracks, loading, mobile } =
    useContext(Context);

  return (
    <main className="relative flex h-screen max-w-full flex-col overflow-hidden bg-gradient-to-tl from-[#122e51] to-[#000]">
      <Audio />
      {mobile && <Search />}
      <div className="relative flex h-full gap-4 overflow-hidden">
        <Sidebar />
        {loading ? (
          <div className="absolute left-[55%] top-[50%] translate-y-[-100%]">
            <BounceLoader color="#fff" />
          </div>
        ) : (
          <div
            className={`flex h-full flex-wrap items-center justify-center gap-3 overflow-y-auto py-5 scrollbar-hide ${
              !mobile && currentTrack && "pb-[120px]"
            } ${!mobile && "ml-[18rem]"} ${
              mobile && currentTrack && "pb-[50px]"
            }`}
          >
            {searchedTracks.length > 0
              ? searchedTracks.map((track) => (
                  <Cards key={track.track.key} track={track.track} />
                ))
              : tracks.map((track, index) => (
                  <Cards key={index} track={track} />
                ))}
            {tracks.length === 0 && !loading && (
              <p className="absolute left-[48%] text-2xl font-bold uppercase text-white">
                Something went wrong!
              </p>
            )}
          </div>
        )}
      </div>
      <Player />
      {mobile ? <MobilePlayer /> : <MiniPlayer />}
    </main>
  );
}

export default App;
