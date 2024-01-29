import { useState } from 'react';
import { Button } from 'react-bootstrap';
import data from './assets/songs.json';
import NavBar from './components/NavBar';
import SongCardGroup from './components/SongCardGroup';
import SongCard from './components/SongCard';
import * as SongSorter from './SongSorter';
import Song from './interfaces/ISong';

function App() {
  const [searchResult, setSearchResult] = useState('');
  const [sortMode, setSortMode] = useState('title');
  const [sortedSongList, setSortedSongList] = useState([data.songs]);
  const [groupNames, setGroupNames] = useState(['']);
  const [page, setPage] = useState(0);
  const [randomSong, setRandomSong] = useState({} as Song);

  const sortSongs = (mode: string) => {
    setSortMode(mode);
    switch (mode) {
      case 'title':
        let sortedByTitle = SongSorter.sortbyTitle(data.songs);

        setSortedSongList(sortedByTitle.songList);
        setGroupNames(sortedByTitle.groupNames);
        break;

      case 'difficulty':
        let sortedByDifficulty = SongSorter.sortbyDifficulty(data.songs);

        setSortedSongList(sortedByDifficulty.songList);
        setGroupNames(sortedByDifficulty.groupNames);
        break;

      case 'game':
        let sortedByGame = SongSorter.sortbyGame(data.songs);

        setSortedSongList(sortedByGame.songList);
        setGroupNames(sortedByGame.groupNames);
        break;

      case 'mode':
        let sortedByMode = SongSorter.sortbyMode(data.songs);

        setSortedSongList(sortedByMode.songList);
        setGroupNames(sortedByMode.groupNames);
        break;

      case 'artist':
        let sortedByArtist = SongSorter.sortbyArtist(data.songs);

        setSortedSongList(sortedByArtist.songList);
        setGroupNames(sortedByArtist.groupNames);
        break;
    }
  };

  const goToPage = (targetPage: number) => {
    setPage(targetPage);

    setSearchResult('');

    switch (targetPage) {
      case 1:
        getRandomSong();
        break;
    }
  };

  const getRandomSong = () => {
    const eligibleSongs = data.songs.filter((song) => song !== randomSong);
    setRandomSong(eligibleSongs[Math.floor(Math.random() * eligibleSongs.length)]);
  };

  return (
    <>
      {page === 0 && (
        <div className='container-fluid'>
          <NavBar
            displayArr={[true, true, true]}
            onNav={() => goToPage(1)}
            targetLocation='Random'
            setSearchResult={setSearchResult}
            sortMode={sortMode}
            sortSongs={sortSongs}
          ></NavBar>
          <SongCardGroup sortedSongList={sortedSongList} groupNames={groupNames} searchResult={searchResult}></SongCardGroup>
        </div>
      )}
      {page === 1 && (
        <div className='container-fluid'>
          <NavBar
            displayArr={[false, false, true]}
            onNav={() => goToPage(0)}
            targetLocation='Song List'
            setSearchResult={setSearchResult}
            sortMode={sortMode}
            sortSongs={sortSongs}
          ></NavBar>
          <div className='d-flex flex-column align-items-center'>
            <Button className='randomButton' onClick={getRandomSong} variant='secondary'>
              Random Song
            </Button>
            <SongCard song={randomSong}></SongCard>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
