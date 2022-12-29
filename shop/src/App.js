/* eslint-disable */
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Col, Alert, Button } from 'react-bootstrap';
import React, { createContext, useEffect, useState, lazy, Suspense } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
// Detail, Cart 컴포넌트는 메인 페이지에서 즉시 로드할 필요가 없음!
// import Detail from './routes/Detail.js';
// import Cart from './routes/Cart.js';
// lazy import → "필요해질 때 import하라"
const Detail = lazy( () => import('./routes/Detail.js') );
const Cart = lazy( () => import('./routes/Cart.js') );


export let Context1 = createContext();

// (참고 1) 크롬 확장프로그램 React Developer Tools를 사용하면 리액트 사이트를 컴포넌트로 미리볼 수 있음
// 장점 1. state 및 props확인 및 수정 가능
// Profiler 기능을 사용하면? 성능을 저하시키는 컴포넌트를 쉽게 찾을 수 있다 (렌더링 시간 확인 가능함)
// 지연시간이 발생하는 대부분의 이유는 ajax 요청 등(서버에서 데이터를 가져오는 작업)에서 발생함

// (참고 2) Redux Developer Tools
// 장점 1. Redux store에 있던 state 전부 확인 가능
// 장점 2. dispatch 때마다 무엇이 어떻게 바뀌었는지 로그를 작성함 (state 변경 내역 확인 가능)
// 장점 3. store가 복잡해지면 유용

// (참고 3) Single Page Application 특징
// 1. 발행하면 js 파일 하나에 모든 코드를 작성함 (사이즈가 매우 커짐 → 로딩 속도가 느림)
// 2. 메인 페이지 로딩 속도 개선을 위해 lazy import를 사용할 수 있다 (Line 10 참고)
// 3. lazy import한 컴포넌트 코드는 사이트 발행 시 별도의 js파일로 분리됨
// 4. 단점 : Cart, Detail 컴포넌트 로드 시 로딩시간이 발생할 수 있음
//  4-1. 개선 방법? <Suspense> 컴포넌트를 사용하면 로딩 중 UI를 삽입할 수 있음
//  4-2. <Suspense>로 <Routes> 전체를 감싸도 됨

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

      {/* 컴포넌트가 로드되기 전까지 <Suspense fallback={ 로딩 UI }>가 출력됨 */}
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
