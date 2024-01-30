import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import SongCard from '../components/SongCard';
import Song from '../interfaces/ISong';

interface Props {
  songs: Song[];
  currentPage: number;
  onSave: (songName: string) => void;
  favoriteSongs: string[];
}

function RandomSong({ songs, currentPage, onSave, favoriteSongs }: Props) {
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
      <SongCard song={randomSong} saved={favoriteSongs.includes(randomSong.title)} onSave={onSave}></SongCard>
    </div>
  );
}

export default RandomSong;
