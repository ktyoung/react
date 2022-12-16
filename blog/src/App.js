/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() { 

  let logo = 'ReactBlog';
  let post = '안양 맛집';
  
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동맛집', '파이썬 독학']);
  let [likeCount, setLikeCount] = useState(0);

  // 모달창(UI)의 현재 상태(닫힘/열림)를 state에 저장
  let [modal, setModal] = useState(false);
  // 모달창 토글 함수
  function toggleModal() {
    if (modal == true) {
      setModal(false);
    } else {
      setModal(true);
    }
  }

  return (
    <div className="App">
      <div className='black-nav'>
        <h4>{ logo }</h4>
      </div>

      <button className='sort-btn' 
        onClick={ () => {
          let copy = [...글제목];
          copy.sort();
          글제목변경(copy)
        } }>제목 정렬</button>

      <div className='list'>
        <button onClick={ () => { 
          let copy = [...글제목];
          copy[0] = "여자 코트 추천";
          글제목변경(copy);
          } }>제목 변경</button>
        <h4>{ 글제목[0] } <span onClick={ () => { setLikeCount(likeCount + 1) } }>👍</span> { likeCount } </h4>
        <p>12월 15일 발행</p>
      </div>

      <div className='list'>
        <h4>{ 글제목[1] }</h4>
        <p>12월 15일 발행</p>
      </div>

      <div className='list'>
        <h4 onClick={ toggleModal }>{ 글제목[2] }</h4>
        <p>12월 15일 발행</p>
      </div>
      
      {/* 동적인 UI 만드는 3-step */}
      {/* 1. html css로 미리 디자인 완성 */}
      {/* 2. UI의 현재 상태를 state로 저장 */}
      {/* 3. state에 따라 UI가 어떻게 보일지 작성(조건문 등으로) */}

      {/* html 중간에 조건문 쓰려먼 삼항연산자 사용 */}
      {
        // null은 비어있는 html 용으로 자주 사용함
        modal == true ? <Modal/> : null
      }
    </div>
  );
}

function Modal() {
  return (
    <div className='modal'>
      <h4>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  );
}

export default App;
