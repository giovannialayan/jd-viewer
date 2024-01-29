import { Nav, Navbar, Form, DropdownButton, Dropdown, Button } from 'react-bootstrap';

interface Props {
  setSearchResult: (result: string) => void;
  sortMode: string;
  sortSongs: (sortMode: 'title' | 'difficulty' | 'game' | 'mode' | 'artist') => void;
  displayArr: boolean[];
  onNav: () => void;
  targetLocation: string;
}

function NavBar({ displayArr, onNav, targetLocation, setSearchResult, sortMode, sortSongs }: Props) {
  return (
    <Navbar className='navbar'>
      {displayArr[0] && (
        <Form>
          <Form.Control type='text' placeholder='Search' className=' mr-sm-2' onChange={(e) => setSearchResult(e.currentTarget.value)} />
        </Form>
      )}
      {displayArr[1] && (
        <DropdownButton
          title={`Sort by: ${sortMode == 'mode' ? 'Coaches' : sortMode.charAt(0).toUpperCase() + sortMode.substring(1)}`}
          id='navbar-sort-dropdown'
          variant='secondary'
          data-bs-theme='dark'
        >
          <Dropdown.Item onClick={() => sortSongs('title')}>Title</Dropdown.Item>
          <Dropdown.Item onClick={() => sortSongs('difficulty')}>Difficulty</Dropdown.Item>
          <Dropdown.Item onClick={() => sortSongs('game')}>Game</Dropdown.Item>
          <Dropdown.Item onClick={() => sortSongs('mode')}>Coaches</Dropdown.Item>
          <Dropdown.Item onClick={() => sortSongs('artist')}>Artist</Dropdown.Item>
        </DropdownButton>
      )}
      {displayArr[2] && (
        <Nav.Link className='text-light' onClick={onNav}>
          {targetLocation}
        </Nav.Link>
      )}
    </Navbar>
  );
}

export default NavBar;
