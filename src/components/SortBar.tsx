import { Nav } from 'react-bootstrap';
import '../assets/SortBarStyle.css';

interface Props {
  sections: string[];
}

function SortBar({ sections }: Props) {
  return (
    //add scrollspy
    <Nav className='sidebar'>
      {sections.map((section) => (
        <Nav.Item key={section}>
          <Nav.Link href={'#' + section}>{section}</Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}

export default SortBar;
