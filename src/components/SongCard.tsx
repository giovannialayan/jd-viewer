interface Props {
  title: string;
  difficulty: string;
  game: string;
  mode: string;
  artist: string;
  thumbnail: string;
  gameplay: string;
}

const SongCard = ({ title, difficulty, game, mode, artist, thumbnail, gameplay }: Props) => {
  return (
    <div className='card'>
      <img src={thumbnail} className='card-img-top' alt={`${title} thumbnail`} />
      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>
        <p className='card-text'>Difficulty: {difficulty}</p>
        <p className='card-text'>Game: {game}</p>
        <p className='card-text'>Coaches: {mode}</p>
        <p className='card-text'>Artist: {artist}</p>
        <a href={gameplay} target='_blank' className='btn btn-primary'>
          watch dance
        </a>
      </div>
    </div>
  );
};

export default SongCard;
