/* eslint-disable */

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import data from './data.js';

function App() {

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
          <Product data={data}/>
        </Row>
      </Container>
    </div>
  );
}

function Product(props) {
  return props.data.map( (shoe, i) => {
    return (
      <Col xs md={4}>
        <img src={"https://codingapple1.github.io/shop/shoes" + (i+1) + ".jpg"} width="80%" />
        <h4>{ shoe.title }</h4>
        <p>{ shoe.content }</p>
        <p>{ shoe.price }</p>
      </Col>
    );
  })
}

export default App;
