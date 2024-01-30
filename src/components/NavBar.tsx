import { Nav, Navbar } from 'react-bootstrap';

interface Props {
  onNav: (target: number) => void;
  currentPage: number;
}

function NavBar({ onNav, currentPage }: Props) {
  return (
    <Navbar className='navbar d-flex flex-row justify-content-center'>
      <Nav.Link className={'text-light' + (currentPage == 0 ? ' navSelected' : '')} onClick={() => onNav(0)}>
        Song List
      </Nav.Link>
      <Nav.Link className={'text-light' + (currentPage == 1 ? ' navSelected' : '')} onClick={() => onNav(1)}>
        Favorites
      </Nav.Link>
      <Nav.Link className={'text-light' + (currentPage == 2 ? ' navSelected' : '')} onClick={() => onNav(2)}>
        Random
      </Nav.Link>
    </Navbar>
  );
}

export default NavBar;
