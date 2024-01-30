import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import SongCard from '../components/SongCard';
import Song from '../interfaces/ISong';
import FavoriteData from '../interfaces/IFavorite';

interface Props {
  songs: Song[];
  currentPage: number;
  favoriteData: FavoriteData;
}

function RandomSong({ songs, currentPage, favoriteData }: Props) {
  useEffect(() => {
    if (currentPage == 2) {
      getRandomSong();
    }
  }, [currentPage]);

  const [randomSong, setRandomSong] = useState({} as Song);

  const getRandomSong = () => {
    const eligibleSongs = songs.filter((song) => song !== randomSong);
    setRandomSong(eligibleSongs[Math.floor(Math.random() * eligibleSongs.length)]);
  };

  return (
    <div className='d-flex flex-column align-items-center'>
      <Button className='randomButton' onClick={getRandomSong} variant='secondary'>
        Random Song
      </Button>
      <SongCard song={randomSong} saved={favoriteData.favoriteSongs.includes(randomSong.title)} onSave={favoriteData.onSave}></SongCard>
    </div>
  );
}

export default RandomSong;
