import { useEffect } from 'react';
import SongList from './SongList';
import Song from '../interfaces/ISong';

interface Props {
  songs: Song[];
  favoriteSongs: string[];
  onSave: (songName: string) => void;
  currentPage: number;
}

function Favorites({ songs, favoriteSongs, onSave, currentPage }: Props) {
  useEffect(() => {}, []);

  return (
    <SongList
      songs={songs.filter((song) => favoriteSongs.includes(song.title))}
      currentPage={currentPage}
      favoriteSongs={favoriteSongs}
      onSave={onSave}
    ></SongList>
  );
}

export default Favorites;
