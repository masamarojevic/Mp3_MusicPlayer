import { createContext, useCallback, useState } from "react";
const SongContext = createContext();

const SongContextProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  //callback function for adding the new song to the playlist
  const addSongToPlaylist = useCallback((newSong) => {
    setSongs((prevSongs) => [...prevSongs, newSong]);
  }, []);

  return (
    <SongContext.Provider
      value={{
        songs,
        setSongs,
        playlist,
        setPlaylist,
        addSongToPlaylist,
        playlistName,
        setPlaylistName,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};
export { SongContext, SongContextProvider };
