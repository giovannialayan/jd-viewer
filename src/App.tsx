import { useEffect, useState } from 'react';
import data from './assets/songs.json';
import SongList from './pages/SongList';
import RandomSong from './pages/RandomSong';
import NavBar from './components/NavBar';
import _ from 'lodash';
import Favorites from './pages/Favorites';

function App() {
  const [page, setPage] = useState(0);
  const [favoriteSongs, setFavoriteSongs] = useState([] as string[]);
  const [itemsLoaded, setItemsLoaded] = useState(false);

  useEffect(() => {
    const items = localStorage.getItem('favorites');

    if (items) {
      setFavoriteSongs(JSON.parse(items));
    }

    setItemsLoaded(true);
  }, []);

  useEffect(() => {
    if (itemsLoaded) {
      localStorage.setItem('favorites', JSON.stringify(favoriteSongs));
    }
  }, [favoriteSongs]);

  const goToPage = (targetPage: number) => {
    setPage(targetPage);
  };

  const editFavorite = (songName: string) => {
    if (favoriteSongs.includes(songName)) {
      setFavoriteSongs((favoriteSongs) => _.remove(favoriteSongs, (s) => s === songName));
    } else {
      setFavoriteSongs((favoriteSongs) => [...favoriteSongs, songName]);
    }

    setFavoriteSongs((favoriteSongs) => favoriteSongs.sort()); //write sort that doesnt care about casing or that compares against their pos in data.songs
  };

  return (
    <div className='container-fluid'>
      <NavBar currentPage={page} onNav={goToPage}></NavBar>
      {page === 0 && <SongList songs={data.songs} currentPage={page} favoriteSongs={favoriteSongs} onSave={editFavorite}></SongList>}
      {page === 1 && <Favorites songs={data.songs} currentPage={page} favoriteSongs={favoriteSongs} onSave={editFavorite}></Favorites>}
      {page === 2 && <RandomSong songs={data.songs} favoriteSongs={favoriteSongs} currentPage={page} onSave={editFavorite}></RandomSong>}
    </div>
  );
}

export default App;
