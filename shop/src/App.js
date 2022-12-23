/* eslint-disable */

// (참고 1) Single Page Application의 단점?
// 컴포넌트 간 state 공유가 어려움... 자식의 자식 컴포넌트에서 부모 state를 사용하려면
// 부모 → 자식 → 자식 → ... 여러 번의 props 전송이 필요함

// (참고 2) props 전송없이 state 공유할 수 있는 방법?
// 1. Context API (리액트 기본 문법) → 성능 이슈와 컴포넌트 재활용 이슈로 자주 사용하지는 않음
// 2. Redux 등 외부 라이브러리

// (참고 3) Context API를 잘 사용하지 않는 이유?
// 1. state 변경 시 불필요한 것까지 재랜더링 함
// 2. 컴포넌트 재사용이 어려움
// → 외부 라이브러리를 많이 사용함

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Col, Alert, Button } from 'react-bootstrap';
import React, { createContext, useState } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './routes/Detail.js';
import axios from 'axios';

// Context API 사용 방법
// 세팅 1. createContext() → Context == state 보관함을 생성함
export let Context1 = createContext();

function App() {

  let [shoes, setShoes] = useState(data);
  // Detail, TabContent에서 사용할 재고(stock) state 생성
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
          // 세팅 3. value= { { 공유할 state1, state2, ... } }
          <Context1.Provider value={ { stock, shoes } }>
            {/* 세팅 2. <Context.Provider></Context.Provider>로 원하는 컴포넌트 감싸기 */}
            <Detail shoes={ shoes } /> 
          </Context1.Provider>
          } />

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
