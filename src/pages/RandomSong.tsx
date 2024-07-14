import { useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import SongCard from '../components/SongCard';
import Song from '../interfaces/ISong';
import FavoriteData from '../interfaces/IFavorite';
import * as SongSorter from '../SongSorter';
import SortedSongs from '../interfaces/ISortedSongs';

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
  const [possibleSongLists, setPossibleSongLists] = useState([songs] as Song[][]);
  const [topFilter, setTopFilter] = useState('none');
  const [currentBottomfilter, setCurrentBottomFilter] = useState(0);
  const [bottomFilterList, setBottomFilterList] = useState([] as string[]);

  const getRandomSong = () => {
    const eligibleSongs = possibleSongLists[currentBottomfilter].filter((song) => song !== randomSong);
    setRandomSong(eligibleSongs[Math.floor(Math.random() * eligibleSongs.length)]);
  };

  const selectFilter = (filter: string) => {
    setTopFilter(filter);

    let sortedSongList = {} as SortedSongs;

    switch (filter) {
      case 'none':
        sortedSongList = SongSorter.sortbyTitle(songs);
        break;

      case 'difficulty':
        sortedSongList = SongSorter.sortbyDifficulty(songs);
        break;

      case 'game':
        sortedSongList = SongSorter.sortbyGame(songs);
        break;

      case 'mode':
        sortedSongList = SongSorter.sortbyMode(songs);
        break;

      case 'favorites':
        sortedSongList = { songList: [songs.filter((song) => favoriteData.favoriteSongs.includes(song.id.toString()))], groupNames: [] };
        break;
    }

    setPossibleSongLists(sortedSongList.songList);
    setBottomFilterList(sortedSongList.groupNames);

    setCurrentBottomFilter(0);
  };

  return (
    <div className='d-flex flex-column align-items-center'>
      <Button className='mb-4 mt-3' onClick={getRandomSong} variant='secondary'>
        Random Song
      </Button>
      <DropdownButton
        title={`Filter: ${topFilter == 'mode' ? 'Coaches' : topFilter.charAt(0).toUpperCase() + topFilter.substring(1)}`}
        className={bottomFilterList.length > 0 ? 'mb-3' : 'mb-5'}
        variant='secondary'
        data-bs-theme='dark'
      >
        <Dropdown.Item onClick={() => selectFilter('none')}>None</Dropdown.Item>
        <Dropdown.Item onClick={() => selectFilter('difficulty')}>Difficulty</Dropdown.Item>
        <Dropdown.Item onClick={() => selectFilter('game')}>Game</Dropdown.Item>
        <Dropdown.Item onClick={() => selectFilter('mode')}>Coaches</Dropdown.Item>
        <Dropdown.Item onClick={() => selectFilter('favorites')}>Favorites</Dropdown.Item>
      </DropdownButton>
      {bottomFilterList.length > 0 && (
        <DropdownButton title={bottomFilterList[currentBottomfilter]} className='mb-5' variant='secondary' data-bs-theme='dark'>
          {bottomFilterList.map((bottomFilter, i) => {
            return (
              <Dropdown.Item key={bottomFilterList[i]} onClick={() => setCurrentBottomFilter(i)}>
                {bottomFilter}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
      )}
      <SongCard song={randomSong} saved={favoriteData.favoriteSongs.includes(randomSong.title)} onSave={favoriteData.onSave}></SongCard>
    </div>
  );
}

export default RandomSong;
