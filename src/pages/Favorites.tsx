import { useEffect } from 'react';
import SongList from './SongList';
import Song from '../interfaces/ISong';
import FavoriteData from '../interfaces/IFavorite';

interface Props {
  songs: Song[];
  currentPage: number;
  favoriteData: FavoriteData;
}

function Favorites({ songs, currentPage, favoriteData }: Props) {
  useEffect(() => {}, []);

  return (
    <SongList
      songs={songs.filter((song) => favoriteData.favoriteSongs.includes(song.title))}
      currentPage={currentPage}
      favoriteData={favoriteData}
    ></SongList>
  );
}

export default Favorites;
