import CardGroup from 'react-bootstrap/CardGroup';
import SongCard from './SongCard';
import Song from '../interfaces/ISong';

interface Props {
  sortedSongList: Song[][];
  groupNames: string[];
  searchResult: string;
}

function SongCardGroup({ sortedSongList, groupNames, searchResult }: Props) {
  return (
    <>
      {sortedSongList.map((group, index) => {
        return (
          group.length !== 0 && (
            <div key={'container-' + index}>
              <h3 key={'header-' + index} className='cardGroupHeader'>
                {groupNames[index]}
              </h3>
              <CardGroup key={index}>
                {group.map(
                  (song: Song, index: number) =>
                    song.title.toLowerCase().includes(searchResult.trim().toLowerCase()) && <SongCard key={index} song={song}></SongCard>
                )}
              </CardGroup>
            </div>
          )
        );
      })}
    </>
  );
}

export default SongCardGroup;
