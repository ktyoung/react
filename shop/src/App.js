/* eslint-disable */
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Col, Alert, Button } from 'react-bootstrap';
import React, { createContext, useEffect, useState, lazy, Suspense } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
const Detail = lazy( () => import('./routes/Detail.js') );
const Cart = lazy( () => import('./routes/Cart.js') );
const Test = lazy( () => import('./routes/Test.js') );


export let Context1 = createContext();

function App() {

  useEffect( () => {
    localStorage.setItem('watched', JSON.stringify( [] ))
  }, [])

  let [shoes, setShoes] = useState(data);
  let [stock, setStock] = useState([10, 11, 12]);
  let [clickCount, setClickCount] = useState(1);
  let [visible, setVisible] = useState(true);
  let navigate = useNavigate();
  let result = useQuery(['data'], () => {
    return axios.get('https://codingapple1.github.io/userdata.json').then( (a) => {
      return a.data
    } )
  })

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className='link' onClick={ () => { navigate('/') } }>홈</Nav.Link>
            <Nav.Link className='link' onClick={ () => { navigate('/cart') } }>장바구니</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            { result.isLoading && '로딩 중입니다.' }
            { result.error && '오류입니다.' }
            { result.data && '반가워요, ' + result.data.name + '!' }
          </Nav>
        </Container>
      </Navbar>

      <Suspense fallback={ <div>로딩 중입니다.</div> }>
        <Routes>
          <Route path="/" element={ 
            <>
            <div className='main-bg'></div>

            <Container>
              <Row>
                {
                  shoes.map(function(shoe, i) {
                    return (
                      <Card shoes={shoes[i]} i={i} key={i}  />
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
              <Detail shoes={ shoes } /> 
            } />

          <Route path="/cart" element={ <Cart/> }/>

          <Route path="/test" element={ <Test/> }/>

          <Route path="*" element={ <div>존재하지 않는 페이지</div> } />

        </Routes>
      </Suspense>
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
