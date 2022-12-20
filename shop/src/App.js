import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
// import 해야하는 이미지가 너무 많다면 public 폴더를 사용해도 됨
import shoes1 from "./images/shoes1.jpg";
import shoes2 from "./images/shoes2.jpg";
import shoes3 from "./images/shoes3.jpg";

function App() {
  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#cart">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className='main-bg'></div>

      <Container>
        <Row>
          <Col xs md={4}>
            {/* (참고) 이미지 사용 방법
            1. 이미지의 절대주소 (외부에 호스팅 한 이미지 사용 시)
            2. public 폴더 사용 
              2-1. public 폴더에 있는 이미지 사용하려면 아래 문법을 권장함 (사이트 발행 시 하위 경로로 인해 문제가 생길 수 있음)
              <img src={process.env.PUBLIC_URL + '/logo192.png'} width="80%" />
            3. import 후 사용
              3-1. import 할 이미지가 너무 많다면? public 폴더를 사용! */}
            <img src={ shoes1 } width="80%" />
            <h4>상품명</h4>
            <p>상품설명</p>
          </Col>
          <Col xs md={4}>
            <img src={ shoes2 } width="80%" />
            <h4>상품명</h4>
            <p>상품설명</p>
          </Col>
          <Col xs md={4}>
            <img src={ shoes3 } width="80%" />
            <h4>상품명</h4>
            <p>상품설명</p>
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default App;
