/* eslint-disable */

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Col, Alert, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './routes/Detail.js';
import axios from 'axios';

function App() {

  let [shoes, setShoes] = useState(data);
  let [clickCount, setClickCount] = useState(1);
  let [visible, setVisible] = useState(true);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className='link' onClick={ () => { navigate('/') } }>홈</Nav.Link>
            <Nav.Link className='link' onClick={ () => { navigate('/detail') } }>상세페이지</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={ 
          <>
          <div className='main-bg'></div>

          <Container>
            <Row>
              {
                shoes.map(function(shoe, i) {
                  return (
                    <Card shoes={shoes[i]} i={i} key={i} />
                  );
                })
              }
            </Row>
          </Container>
          
          {
            visible == true 
            ? <Button variant="primary" className='more-btn' onClick={ () => { 
              setClickCount(clickCount += 1)
              if (clickCount > 2) {
                setVisible(false);
              }
              axios.get("https://codingapple1.github.io/shop/data"+ parseInt(clickCount) +".json")
              .then( (result) => { 
                let copy = [...shoes, ...result.data]
                setShoes(copy)
                } )
              .catch( () => { console.log("ajax 요청 실패") } );
             } }>더보기</Button>
            : null
          }
          
          </>
        } />
        <Route path="/detail/:id" element={ <Detail shoes={ shoes } /> } />

        <Route path="*" element={ <div>존재하지 않는 페이지</div> } />

        <Route path="/about" element={ <About/> }>
          <Route path="member" element={ <div>멤버 정보</div> } />
          <Route path="location" element={ <div>위치 정보</div> } />
        </Route>

        <Route path="/event" element={ <Event/> }>
          <Route path="one" element={ <p>첫 주문 시 신발끈 서비스</p> } />
          <Route path="two" element={ <p>생일 기념 쿠폰 받기</p> } />
        </Route>

      </Routes>
    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사 정보</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Card(props) {
  return (
    <Col md={4}>
      <img src={"https://codingapple1.github.io/shop/shoes" + (props.i+1) + ".jpg"} width="80%" />
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.content }</p>
      <p>{ props.shoes.price }</p>
    </Col>
  );
}

export default App;
