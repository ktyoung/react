import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// react bootstrap 컴포넌트를 사용하려면 import 해주기
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
// html에서 이미지를 사용하려면 import 해주기
import bg from './images/bg.png';

function App() {
  return (
    <div className="App">
      {/* 컴포넌트는 className으로 CSS 커스터마이징 가능 */}
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#cart">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* 이미지 import한 변수명을 url()에 삽입 */}
      <div className='main-bg' style={{ backgroundImage : 'url(' + bg + ')' }}></div>

    </div>
  );
}

export default App;
