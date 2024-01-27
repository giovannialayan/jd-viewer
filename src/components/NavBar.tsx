import { NavDropdown, Nav, Navbar, Form, DropdownButton, Dropdown } from 'react-bootstrap';

interface Props {
  setSearchResult: (result: string) => void;
  sortMode: string;
  sortSongs: (sortMode: 'title' | 'difficulty' | 'game' | 'mode' | 'artist') => void;
}

function NavBar({ setSearchResult, sortMode, sortSongs }: Props) {
  return (
    <Navbar>
      <Form>
        <Form.Control type='text' placeholder='Search' className=' mr-sm-2' onChange={(e) => setSearchResult(e.currentTarget.value)} />
      </Form>
      <DropdownButton
        title={`Sort by: ${sortMode == 'mode' ? 'Coaches' : sortMode.charAt(0).toUpperCase() + sortMode.substring(1)}`}
        id='navbar-sort-dropdown'
        variant='secondary'
        data-bs-theme='dark'
      >
        <Dropdown.Item onClick={() => sortSongs('title')} active>
          Title
        </Dropdown.Item>
        <Dropdown.Item onClick={() => sortSongs('difficulty')}>Difficulty</Dropdown.Item>
        <Dropdown.Item onClick={() => sortSongs('game')}>Game</Dropdown.Item>
        <Dropdown.Item onClick={() => sortSongs('mode')}>Coaches</Dropdown.Item>
        <Dropdown.Item onClick={() => sortSongs('artist')}>Artist</Dropdown.Item>
      </DropdownButton>
    </Navbar>
  );
}

export default NavBar;
