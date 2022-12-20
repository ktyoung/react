import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import shoes1 from "./images/shoes1.jpg";
import shoes2 from "./images/shoes2.jpg";
import shoes3 from "./images/shoes3.jpg";
import { useState } from 'react';
import data from './data.js';
// import 문법
// import 작명 from '파일경로';
// import a from './data.js';

// 여러 변수를 import 하려면?
// import {변수1, 변수2, ...} form '경로'
// (참고) export 했던 변수명을 그대로 사용해야 함
// import {a, b} from './data.js';

function App() {

  // 데이터는 다른 js 파일에 넣어서 사용할 수 있음

  // 다른 파일에 있는 변수를 가져오려면?
  // 1. 다른 파일에 있는 변수를 export
  // 2. 사용하려는 파일에서 import
  let [shoes] = useState(data);

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
            <img src={ shoes1 } width="80%" />
            {/* (참고) 데이터를 사용할 땐 시작 기호만 잘 보면 됨! */}
            {/* 1. 시작이 [대괄호]면 array 자료형 */}
              {/* 1-1. 인덱싱으로 사용할 object 자료형 추출 */}
            {/* 2. 시작이 {중괄호}면 object 자료형 */}
              {/* 2-1. 자료 이름으로 사용할 데이터 추출 */}
            <h4>{shoes[0].title}</h4>
            <p>{shoes[0].content}</p>
            <p>{shoes[0].price}</p>
          </Col>
          <Col xs md={4}>
            <img src={ shoes2 } width="80%" />
            <h4>{shoes[1].title}</h4>
            <p>{shoes[1].content}</p>
            <p>{shoes[1].price}</p>
          </Col>
          <Col xs md={4}>
            <img src={ shoes3 } width="80%" />
            <h4>{shoes[2].title}</h4>
            <p>{shoes[2].content}</p>
            <p>{shoes[2].price}</p>
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default App;
