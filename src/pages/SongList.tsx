import { useEffect, useState } from 'react';
import { Form, Dropdown, DropdownButton } from 'react-bootstrap';
import SongCardGroup from '../components/SongCardGroup';
import * as SongSorter from '../SongSorter';
import Song from '../interfaces/ISong';
import FavoriteData from '../interfaces/IFavorite';
import SortBar from '../components/SortBar';

interface Props {
  songs: Song[];
  currentPage: number;
  favoriteData: FavoriteData;
}

function SongList({ songs, currentPage, favoriteData }: Props) {
  useEffect(() => {
    setSearchResult('');
  }, [currentPage]);

  const [searchResult, setSearchResult] = useState('');
  const [sortMode, setSortMode] = useState('title');
  const [sortedSongList, setSortedSongList] = useState([songs]);
  const [groupNames, setGroupNames] = useState(['']);

  const sortSongs = (mode: string) => {
    setSortMode(mode);
    switch (mode) {
      case 'title':
        let sortedByTitle = SongSorter.sortbyTitle(songs);

        setSortedSongList(sortedByTitle.songList);
        setGroupNames(sortedByTitle.groupNames);
        break;

      case 'difficulty':
        let sortedByDifficulty = SongSorter.sortbyDifficulty(songs);

        setSortedSongList(sortedByDifficulty.songList);
        setGroupNames(sortedByDifficulty.groupNames);
        break;

      case 'game':
        let sortedByGame = SongSorter.sortbyGame(songs);

        setSortedSongList(sortedByGame.songList);
        setGroupNames(sortedByGame.groupNames);
        break;

      case 'mode':
        let sortedByMode = SongSorter.sortbyMode(songs);

        setSortedSongList(sortedByMode.songList);
        setGroupNames(sortedByMode.groupNames);
        break;

      case 'artist':
        let sortedByArtist = SongSorter.sortbyArtist(songs);

        setSortedSongList(sortedByArtist.songList);
        setGroupNames(sortedByArtist.groupNames);
        break;
    }
  };

  return (
    <div className='container-fluid'>
      <div className='songListControls d-flex flex-row justify-content-center'>
        <Form>
          <Form.Control type='text' placeholder='Search' className='mr-sm-2' onChange={(e) => setSearchResult(e.currentTarget.value)} />
        </Form>
        <DropdownButton
          title={`Sort by: ${sortMode == 'mode' ? 'Coaches' : sortMode.charAt(0).toUpperCase() + sortMode.substring(1)}`}
          id='navbar-sort-dropdown'
          variant='secondary'
          data-bs-theme='dark'
        >
          <Dropdown.Item onClick={() => sortSongs('title')}>Title</Dropdown.Item>
          <Dropdown.Item onClick={() => sortSongs('difficulty')}>Difficulty</Dropdown.Item>
          <Dropdown.Item onClick={() => sortSongs('game')}>Game</Dropdown.Item>
          <Dropdown.Item onClick={() => sortSongs('mode')}>Coaches</Dropdown.Item>
          <Dropdown.Item onClick={() => sortSongs('artist')}>Artist</Dropdown.Item>
        </DropdownButton>
      </div>
      <div className='listContainer'>
        <SortBar sections={groupNames}></SortBar>
        <SongCardGroup
          sortedSongList={sortedSongList}
          groupNames={groupNames}
          searchResult={searchResult}
          favoriteData={favoriteData}
        ></SongCardGroup>
      </div>
    </div>
  );
}

export default SongList;
