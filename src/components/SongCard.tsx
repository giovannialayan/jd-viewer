import Song from '../interfaces/ISong';

interface Props {
  song: Song;
  saved: boolean;
  onSave: (songName: string) => void;
}

const SongCard = ({ song, saved, onSave }: Props) => {
  return (
    <div className='card'>
      <a href={song.gameplay} target='_blank'>
        <img src={song.thumbnail} className='card-img-top' alt={`${song.title} thumbnail`} />
      </a>
      <div className='card-body'>
        <h5 className='card-title'>{song.title}</h5>
        <p className='card-text'>Difficulty: {song.difficulty}</p>
        <p className='card-text'>Game: {song.game}</p>
        <p className='card-text'>Coaches: {song.mode}</p>
        <p className='card-text'>Artist: {song.artist}</p>
        <a className='favoriteButton' onClick={() => onSave(song.title)}>
          <img src={saved ? './src/assets/full-heart.svg' : './src/assets/empty-heart.svg'} width='40' height='40' role='button'></img>
        </a>
      </div>
    </div>
  );
};

export default SongCard;
