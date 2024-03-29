import { Nav, Navbar } from 'react-bootstrap';
import NavBarIcons from './NavBarIcons';

interface Props {
  onNav: (target: number) => void;
  currentPage: number;
}

function NavBar({ onNav, currentPage }: Props) {
  return (
    <div className='row navContainer'>
      <div className='col-sm topIcons d-flex flex-row justify-content-end align-content-center'>
        <NavBarIcons></NavBarIcons>
      </div>
      <Navbar className='navbar d-flex flex-row justify-content-center col-sm'>
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
      <div className='col-sm sideIcons d-flex flex-row justify-content-end align-content-center'>
        <NavBarIcons></NavBarIcons>
      </div>
    </div>
  );
}

export default NavBar;
