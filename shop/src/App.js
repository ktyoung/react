/* eslint-disable */
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Col, Alert, Button } from 'react-bootstrap';
import React, { createContext, useState } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './routes/Detail.js';
import axios from 'axios';
import Cart from './routes/Cart.js';

export let Context1 = createContext();

// Redux를 사용하면 props 없이 state 공유 가능

// (참고 1) Redux 사용 방법
// 1. 설치 : npm install @reduxjs/toolkit react-redux
// 2. 세팅
//  2-1. store.js 파일 생성 (state 보관 장소) 및 기본 코드 작성
//  2-2. index.js 파일에서 <Provider store={store}> 작성

function App() {

  let [shoes, setShoes] = useState(data);
  let [stock, setStock] = useState([10, 11, 12]);
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

        <Route path="/detail/:id" element={ 
          <Context1.Provider value={ { stock, shoes } }>
            <Detail shoes={ shoes } /> 
          </Context1.Provider>
          } />

        <Route path="/cart" element={ <Cart/> }/>

        <Route path="*" element={ <div>존재하지 않는 페이지</div> } />

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
