/* eslint-disable */
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Col, Alert, Button } from 'react-bootstrap';
import React, { createContext, useEffect, useState } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './routes/Detail.js';
import axios from 'axios';
import Cart from './routes/Cart.js';
import { useQuery } from '@tanstack/react-query';

export let Context1 = createContext();

// react-query
// 실시간 데이터를 계속 가져와야하는 사이트에서 사용하면 좋음

// (참고 1) react-query 설치
// 1. npm install @tanstack/react-query 
// 2. index.js 세팅(QueryClient, QueryClientProvider, useQuery)

function App() {

  useEffect( () => {
    localStorage.setItem('watched', JSON.stringify( [] ))
  }, [])

  let [shoes, setShoes] = useState(data);
  let [stock, setStock] = useState([10, 11, 12]);
  let [clickCount, setClickCount] = useState(1);
  let [visible, setVisible] = useState(true);
  let navigate = useNavigate();

  // useQuery로 ajax 요청하기
  // 장점 1. 성공/실패/로딩 여부 쉽게 파악 가능
  // 장점 2. 주지적으로 ajax 요청을 자동으로 수행함(refetch)
  // 장점 3. ajax 요청 실패 시 retry를 자동으로 수행함
  // 장점 4. state 공유 안 해도 됨 (ajax 요청해서 데이터 가져오는 코드를 자식 컴포넌트에서 그대로 재사용하면 됨)
  // 장점 5. ajax 결과 캐싱 기능 
  //  5-1. ajax 성공 결과를 5분 동안 기억함 → 5분 내 같은 경로로 ajax 재요청할 경우 5분 전(최초 결과)를 먼저 보여줌 → 이후 다음 GET 요청
  let result = useQuery(['data'], () => {
    return axios.get('https://codingapple1.github.io/userdata.json').then( (a) => {
      return a.data
    } )
    // ,{ staleTime : 2000 } → refetch 주기(ms) 설정
  })

  // result.data → ajax 요청 성공 시 가져오는 데이터
  // result.isLoading → ajax 요청(로딩) 중이면 true
  // result.error → ajax 요청 실패하면 true

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
