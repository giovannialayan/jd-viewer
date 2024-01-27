import { useState } from 'react';
import data from './assets/songs.json';
import NavBar from './components/NavBar';
import SongCardGroup from './components/SongCardGroup';
import * as SongSorter from './SongSorter';

function App() {
  const [searchResult, setSearchResult] = useState('');
  const [sortMode, setSortMode] = useState('title');
  const [sortedSongList, setSortedSongList] = useState([data.songs]);
  const [groupNames, setGroupNames] = useState(['']);

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

  return (
    <div className='container-fluid'>
      <NavBar setSearchResult={setSearchResult} sortMode={sortMode} sortSongs={sortSongs}></NavBar>
      <SongCardGroup sortedSongList={sortedSongList} groupNames={groupNames} searchResult={searchResult}></SongCardGroup>
    </div>
  );
}

export default App;
