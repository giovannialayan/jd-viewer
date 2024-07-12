import fs from 'fs';

const setSongIds = () => {
  const songs = JSON.parse(fs.readFileSync('./src/assets/songs.json'));

  const newSongsIndexes = [];
  const newSongs = songs.songs.filter((song, index) => {
    if (song.id === -1) {
      newSongsIndexes.push(index);
    }
    return song.id === -1;
  });

  let lastId = 0;

  for (let i = 0; i < songs.songs.length; i++) {
    if (songs.songs[i].id > lastId) {
      lastId = songs.songs[i].id;
    }
  }

  for (let i = 0; i < newSongs.length; i++) {
    lastId++;
    newSongs[i].id = lastId;
  }

  fs.writeFileSync(
    './src/assets/songs.json',
    JSON.stringify({
      songs: songs.songs.map((song, index) => {
        if (newSongsIndexes.includes(index)) {
          return newSongs[newSongsIndexes.indexOf(index)];
        } else {
          return song;
        }
      }),
    })
  );
};

setSongIds();
