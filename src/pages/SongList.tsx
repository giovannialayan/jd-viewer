import { useEffect, useState } from 'react';
import { Form, Dropdown, DropdownButton } from 'react-bootstrap';
import SongCardGroup from '../components/SongCardGroup';
import * as SongSorter from '../SongSorter';
import Song from '../interfaces/ISong';
import FavoriteData from '../interfaces/IFavorite';
import '../assets/SongListStyle.css';

interface Props {
  songs: Song[];
  currentPage: number;
  favoriteData: FavoriteData;
}

function SongList({ songs, currentPage, favoriteData }: Props) {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const shouldShowScrollButton = () => {
      window.scrollY > 100 ? setShowScrollToTop(true) : setShowScrollToTop(false);
    };

    window.addEventListener('scroll', shouldShowScrollButton);

    return () => {
      window.removeEventListener('scroll', shouldShowScrollButton);
    };
  }, []);

  useEffect(() => {
    setSearchResult('');
  }, [currentPage]);

  const [searchResult, setSearchResult] = useState('');
  const [sortMode, setSortMode] = useState('title');
  const [sortedSongList, setSortedSongList] = useState([songs]);
  const [groupNames, setGroupNames] = useState([] as string[]);
  const [currentGroup, setCurrentGroup] = useState('');

  const sortSongs = (mode: string) => {
    if (sortMode === mode) {
      return;
    }

    setSortMode(mode);
    switch (mode) {
      case 'title':
        let sortedByTitle = SongSorter.sortbyTitle(songs);

        setSortedSongList(sortedByTitle.songList);
        setGroupNames(sortedByTitle.groupNames);
        setCurrentGroup('');
        break;

      case 'difficulty':
        let sortedByDifficulty = SongSorter.sortbyDifficulty(songs);

        setSortedSongList(sortedByDifficulty.songList);
        setGroupNames(sortedByDifficulty.groupNames);
        setCurrentGroup(sortedByDifficulty.groupNames[0]);
        break;

      case 'game':
        let sortedByGame = SongSorter.sortbyGame(songs);

        setSortedSongList(sortedByGame.songList);
        setGroupNames(sortedByGame.groupNames);
        setCurrentGroup(sortedByGame.groupNames[0]);
        break;

      case 'mode':
        let sortedByMode = SongSorter.sortbyMode(songs);

        setSortedSongList(sortedByMode.songList);
        setGroupNames(sortedByMode.groupNames);
        setCurrentGroup(sortedByMode.groupNames[0]);
        break;

      case 'artist':
        let sortedByArtist = SongSorter.sortbyArtist(songs);

        setSortedSongList(sortedByArtist.songList);
        setGroupNames(sortedByArtist.groupNames);
        setCurrentGroup(sortedByArtist.groupNames[0]);
        break;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToGroup = (groupName: string) => {
    const targetGroup = document.getElementById(groupName);

    if (targetGroup) {
      targetGroup.scrollIntoView();
      setCurrentGroup(groupName);
    }
  };

  return (
    <div className='container-fluid'>
      <div className='songListControls d-flex flex-row justify-content-center bg-dark'>
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
          {/* <Dropdown.Item onClick={() => sortSongs('artist')}>Artist</Dropdown.Item> */}
        </DropdownButton>
        {groupNames.length && (
          <DropdownButton title={`Go To: ${currentGroup}`} id='navbar-sort-dropdown' variant='secondary' data-bs-theme='dark'>
            {groupNames.map((groupName) => {
              return (
                <Dropdown.Item
                  key={'goto-' + groupName}
                  onClick={() => {
                    goToGroup(groupName);
                  }}
                >
                  {groupName}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        )}
        {showScrollToTop && (
          <div className='d-flex justify-content-center'>
            <a
              className='scrollIcon'
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              role='button'
            >
              <img src='arrow-up-circle-fill.svg'></img>
            </a>
          </div>
        )}
      </div>
      <div className='listContainer'>
        <SongCardGroup
          data-spy='scroll'
          data-target=''
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
