/* eslint-disable */

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './routes/Detail.js';

function App() {

  let [shoes] = useState(data);

  // 페이지 이동을 도와주는 내부 함수가 내장된 useNavigate()
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            {/* navigate('경로')로 원하는 링크로 이동하게 설정할 수 있다 */}
            {/* navigate(정수)를 입력하면 입력한 수만큼 뒤로가기/앞으로 가기 기능 설정 가능 
                  예) navigate(1) 1페이지 앞으로, navigate(-2) 2페이지 뒤로 */}
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
                    <Card shoes={shoes[i]} i={i} />
                  );
                })
              }
            </Row>
          </Container>
          </>
        } />
        <Route path="/detail" element={ <Detail/> } />

        {/* path="*"은 위에 작성한 페이지 외 모든 페이지를 의미함(오류 페이지) */}
        <Route path="*" element={ <div>존재하지 않는 페이지</div> } />

        {/* 
          서브 경로를 만들 때 유용한 Nested Routes 
          /about/member(location) 경로와 같음 
        */}

        {/* 
        (참고 1) Nested Routes의 장점?
        1. route 작성이 간단해짐
        2. 부모 element와 본인의 element, 총 2개의 element를 화면에 출력함 
          2-1. 정상적으로 출력하려면 <About> 컴포넌트 안에 <div>를 어디에 출력할 지 표기해야 함 
                → 출력 위치를 정하는 것이 <Outlet> 
        3. 여러 유사한 페이지를 작성할 때 사용하면 좋음
        */}
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
      {/* Nested Routes의 출력 위치를 결정하는 <Outlet></Outlet> */}
      <Outlet></Outlet>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사 정보</h4>
      {/* Nested Routes의 출력 위치를 결정하는 <Outlet></Outlet> */}
      <Outlet></Outlet>
    </div>
  );
}

function Card(props) {
  return (
    <Col xs md={4}>
      <img src={"https://codingapple1.github.io/shop/shoes" + (props.i+1) + ".jpg"} width="80%" />
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.content }</p>
      <p>{ props.shoes.price }</p>
    </Col>
  );
}

export default App;
