import { useEffect, useState } from 'react';
import data from './assets/songs.json';
import SongList from './pages/SongList';
import RandomSong from './pages/RandomSong';
import NavBar from './components/NavBar';
import Favorites from './pages/Favorites';

const localStoragePrefix = 'jdviewer.';
const favoritesKey = 'favorites';

function App() {
  const [page, setPage] = useState(0);
  const [favoriteSongs, setFavoriteSongs] = useState([] as string[]);
  const [itemsLoaded, setItemsLoaded] = useState(false);

  useEffect(() => {
    const items = localStorage.getItem(localStoragePrefix + favoritesKey);

    if (items) {
      setFavoriteSongs(JSON.parse(items));
    }

    setItemsLoaded(true);
  }, []);

  useEffect(() => {
    if (itemsLoaded) {
      localStorage.setItem(localStoragePrefix + favoritesKey, JSON.stringify(favoriteSongs));
    }
  }, [favoriteSongs]);

  const goToPage = (targetPage: number) => {
    setPage(targetPage);
  };

  const editFavorite = (songId: string) => {
    if (favoriteSongs.includes(songId)) {
      setFavoriteSongs((favoriteSongs) => favoriteSongs.filter((id) => id !== songId));
    } else {
      setFavoriteSongs((favoriteSongs) => [...favoriteSongs, songId]);
    }
  };

  return (
    <div className='container-fluid'>
      <NavBar currentPage={page} onNav={goToPage}></NavBar>
      {page === 0 && <SongList songs={data.songs} currentPage={page} favoriteData={{ favoriteSongs, onSave: editFavorite }}></SongList>}
      {page === 1 && <Favorites songs={data.songs} currentPage={page} favoriteData={{ favoriteSongs, onSave: editFavorite }}></Favorites>}
      {page === 2 && <RandomSong songs={data.songs} currentPage={page} favoriteData={{ favoriteSongs, onSave: editFavorite }}></RandomSong>}
    </div>
  );
}

export default App;
