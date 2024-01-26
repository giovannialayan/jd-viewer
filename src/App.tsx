import { useState } from 'react';
import SongCard from './components/SongCard';
import data from './assets/songs.json';
import CardGroup from 'react-bootstrap/CardGroup';

function App() {
  return (
    <div className='container-fluid'>
      <CardGroup>
        {data.songs.map((song, index) => (
          <SongCard
            key={index}
            title={song.title}
            difficulty={song.difficulty}
            game={song.game}
            mode={song.mode}
            artist={song.artist}
            thumbnail={song.thumbnail}
            gameplay={song.gameplay}
          ></SongCard>
        ))}
      </CardGroup>
    </div>
  );
}

export default App;
