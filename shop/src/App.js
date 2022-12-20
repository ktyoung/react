import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// react bootstrap 컴포넌트를 사용하려면 import를 해줘야 함
import { Button, Navbar, Container, Nav } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      {/* 컴포넌트는 className으로 CSS 커스터마이징 가능 */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Button variant="primary">Primary</Button>

    </div>
  );
}

export default App;
