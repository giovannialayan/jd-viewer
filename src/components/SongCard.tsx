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
        <img src={song.thumbnail} className='card-img-top songThumbnail' alt={`${song.title} thumbnail`} />
      </a>
      <div className='card-body'>
        <h5 className='card-title'>{song.title}</h5>
        <p className='card-text'>Difficulty: {song.difficulty}</p>
        <p className='card-text'>Game: {song.game}</p>
        <p className='card-text'>Coaches: {song.mode}</p>
        <p className='card-text'>Artist: {song.artist}</p>
        <div className='favoriteButton'>
          <img onClick={() => onSave(song.title)} src={saved ? 'full-heart.svg' : 'empty-heart.svg'} role='button'></img>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
