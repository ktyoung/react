/* eslint-disable */

// (참고 1) import 시 본인이 만든 파일은 './경로'의 형태
// 라이브러리의 경우 라이브러리 명만 입력되어 있음
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import data from './data.js';
// react-route-dom 컴포넌트 사용을 위해 import
import { Routes, Route, Link } from 'react-router-dom'

// html에서 다른 페이지로 이동하려면 다른 html을 연결했음
// 리액트에서 다른 페이지로 이동하려면?
// 1. 다른 페이지의 컴포넌트를 생성
// 2. 해당 페이지로 접속 시 1의 컴포넌트를 보여줌

// (참고 2) react-router-dom 라이브러리를 사용하면 쉽게 사용 가능함
// 1. 터미널에 npm install react-router-dom@6 입력(6버전)
// 2. index.js에 <BrowserRouter> 코드 추가

function App() {

  let [shoes] = useState(data);

  return (
    <div className="App">
      {/* (참고 3) Route 컴포넌트? */}
      {/* 1. <Route />는 페이지와 같음 */}
        {/* 1-1. <Route path="/url경로" element={ <출력할 html> } /> */}
        {/* 1-2. 메인 페이지는 path="/" */}
      
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            {/* 페이지 이동 버튼은 <Link to="경로"></Link> */}
            <Link className='link' to="/">홈</Link>
            <Link className='link' to="/detail">상세페이지</Link>
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
      </Routes>
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

function Detail() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">상품명</h4>
          <p>상품설명</p>
          <p>120000원</p>
          <button className="btn btn-danger">주문하기</button> 
        </div>
      </div>
    </div> 
  );
}

export default App;
