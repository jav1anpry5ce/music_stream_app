import React, { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { Context } from "../Context/PlayerContext";

export default function Search() {
  const { searchTrack } = useContext(Context);
  const [text, setText] = React.useState("");
  const ref = React.useRef(null);
  const clearSearch = () => {
    ref.current.reset();
    setText("");
    ref.current.search.focus();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    searchTrack(text);
  };
  return (
    <form
      className="mx-auto flex w-full items-center justify-center gap-2 p-2"
      onSubmit={onSubmit}
      ref={ref}
    >
      <div className="group relative inline-flex w-full max-w-[1020px] grow overflow-hidden rounded bg-gray-700/80 font-semibold text-white placeholder-white outline-none focus-within:bg-gray-800/90 focus-within:shadow-md">
        <input
          name="search"
          placeholder="Song Search..."
          className="w-full appearance-none overflow-hidden bg-transparent p-2 text-white outline-none"
          onChange={(e) => setText(e.target.value)}
        />
        {text && (
          <button
            className="absolute right-14 top-[10%] hidden rounded-full bg-slate-500/10 p-2 transition-all duration-200 ease-in-out hover:bg-red-600 group-focus-within:block"
            type="button"
            onClick={clearSearch}
          >
            <AiOutlineClose />
          </button>
        )}
        <button type="submit" className="overflow-hidden bg-gray-900 px-4">
          <BsSearch fontSize={24} />
        </button>
      </div>
    </form>
  );
}
