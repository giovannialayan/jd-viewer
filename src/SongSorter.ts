import Song from './interfaces/ISong';

import _ from 'lodash';

const gameList = [
  'Just Dance',
  'Just Dance 2',
  'Just Dance 3',
  'Just Dance 4',
  'Just Dance 2014',
  'Just Dance 2015',
  'Just Dance 2016',
  'Just Dance 2017',
  'Just Dance 2018',
  'Just Dance 2019',
  'Just Dance 2020',
  'Just Dance 2021',
  'Just Dance 2022',
  'Just Dance 2023',
  'Just Dance 2024',
  'Just Dance Unlimited',
];

const difficultyList = ['Easy', 'Medium', 'Hard', 'Extreme'];
const modeList = ['Solo', 'Duet', 'Trio', 'Quartet'];

const sortbyTitle = (songs: Song[]) => {
  return { songList: [songs], groupNames: [''] };
};

const sortbyDifficulty = (songs: Song[]) => {
  let easyList = songs.filter((song) => song.difficulty == difficultyList[0]);
  let mediumList = songs.filter((song) => song.difficulty == difficultyList[1]);
  let hardList = songs.filter((song) => song.difficulty == difficultyList[2]);
  let extremeList = songs.filter((song) => song.difficulty == difficultyList[3]);
  return { songList: [easyList, mediumList, hardList, extremeList], groupNames: difficultyList };
};

const sortbyGame = (songs: Song[]) => {
  let gameSongList = new Map();

  for (let i = 0; i < gameList.length; i++) {
    const initArr: Song[] = [];
    gameSongList.set(gameList[i], initArr);
  }

  for (let i = 0; i < songs.length; i++) {
    gameSongList.get(songs[i].game).push(songs[i] as Song);
  }

  return { songList: Array.from(gameSongList.values()), groupNames: gameList };
};

const sortbyMode = (songs: Song[]) => {
  let soloList = songs.filter((song) => song.mode == modeList[0]);
  let duetList = songs.filter((song) => song.mode == modeList[1]);
  let trioList = songs.filter((song) => song.mode == modeList[2]);
  let quartetList = songs.filter((song) => song.mode == modeList[3]);
  return { songList: [soloList, duetList, trioList, quartetList], groupNames: modeList };
};

const sortbyArtist = (songs: Song[]) => {
  let artistSongList = new Map();
  let artistList = _.uniq(songs.map((song) => song.artist)).sort();

  for (let i = 0; i < artistList.length; i++) {
    const initArr: Song[] = [];
    artistSongList.set(artistList[i], initArr);
  }

  for (let i = 0; i < songs.length; i++) {
    artistSongList.get(songs[i].artist).push(songs[i] as Song);
  }

  return { songList: Array.from(artistSongList.values()), groupNames: artistList };
};

export { sortbyTitle, sortbyDifficulty, sortbyGame, sortbyMode, sortbyArtist };
