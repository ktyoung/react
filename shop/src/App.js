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

function App() {

  // 브라우저 Local Storage 사용법 (문자만 저장 가능! → array/object는 JSON으로 변환하면 저장 가능함)
  // 1. 데이터 추가 : localStorage.setItem('데이터이름', '데이터');
  // 2. 데이터 읽기 : localStorage.getItem('데이터이름');
  // 3. 데이터 삭제 : localStorage.removeItem('데이터이름')
  // 4. 데이터 수정하는 문법은 없음. 데이터를 꺼내 수정하고 다시 넣으면 됨
  // 5. Session Storage에 데이터 작업을 하려면? localStorage를 sessionStorage로

  let obj = {name : 'kim'};
  // JSON.stringify(obj); // array/object를 JSON 변환하는 JSON.stringify()
  // localStorage.setItem('data', obj); // → object 자료형을 직접 추가할 수 없음
  localStorage.setItem('data', JSON.stringify(obj)); // → JSON 변환 후 데이터 추가

  let getItem = localStorage.getItem('data'); // 출력하면 JSON 형태로 출력됨(array/object형이 아님!) 
                                              // → JSON을 array/object 형으로 바꿔야 편집이 가능함
  JSON.parse(getItem); // → JSON을 array/object 변환하는 JSON.parse()

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
            <Nav.Link className='link' onClick={ () => { navigate('/cart') } }>장바구니</Nav.Link>
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
