interface FavoriteData {
  favoriteSongs: string[];
  onSave: (song: string) => void;
}

export default FavoriteData;
