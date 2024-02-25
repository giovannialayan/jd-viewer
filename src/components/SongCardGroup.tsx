import CardGroup from 'react-bootstrap/CardGroup';
import SongCard from './SongCard';
import Song from '../interfaces/ISong';
import FavoriteData from '../interfaces/IFavorite';

interface Props {
  sortedSongList: Song[][];
  groupNames: string[];
  searchResult: string;
  favoriteData: FavoriteData;
}

function SongCardGroup({ sortedSongList, groupNames, searchResult, favoriteData }: Props) {
  const songHasSearch = (song: Song, search: string) => {
    return song.title.toLowerCase().includes(search.trim().toLowerCase()) || song.artist.toLowerCase().includes(search.trim().toLowerCase());
  };

  return (
    <>
      {sortedSongList.map((group, index) => {
        return (
          group.length !== 0 &&
          group.some((song) => songHasSearch(song, searchResult)) && (
            <div key={'container-' + index} id={groupNames[index]} className='cardGroupContainer'>
              <h3 key={'header-' + index} className='cardGroupHeader'>
                {groupNames[index]}
              </h3>
              <CardGroup key={index}>
                {group.map(
                  (song: Song, index: number) =>
                    songHasSearch(song, searchResult) && (
                      <SongCard
                        key={index}
                        song={song}
                        saved={favoriteData.favoriteSongs.includes(song.id.toString())}
                        onSave={favoriteData.onSave}
                      ></SongCard>
                    )
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
