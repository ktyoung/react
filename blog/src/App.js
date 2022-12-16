/* eslint-disable */
// ↑ eslint(자동으로 warning 잡아주는 기능) 끄기

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() { // ← App()도 컴포넌트임

  let logo = 'ReactBlog';
  let post = '안양 맛집';
  
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동맛집', '파이썬 독학']);
  let [likeCount, addLikeCount] = useState(0);

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
        <h4>{ 글제목[0] } <span onClick={ () => { addLikeCount(likeCount + 1) } }>👍</span> { likeCount } </h4>
        <p>12월 15일 발행</p>
      </div>

      <div className='list'>
        <h4>{ 글제목[1] }</h4>
        <p>12월 15일 발행</p>
      </div>

      <div className='list'>
        <h4>{ 글제목[2] }</h4>
        <p>12월 15일 발행</p>
      </div>
      
      {/* 컴포넌트로 만들면 좋은 것? */}
      {/* 1. 사이트에서 반복적으로 출현하는 HMTL 덩어리 */}
      {/* 2. 내용이 자주 변경될 것 같은 HTML */}
      {/* 3. 다른 페이지를 만들고 싶을 때 그 페이지의 HTML 덩어리 */}
      {/* 4. 다른 팀원과 협업할 때 HTML */}

      {/* 컴포넌트의 단점? */}
      {/* 1. state 사용 시 불편함이 있음 → state는 component 내부에 정의되어 있지 않으므로 */}

      <Modal></Modal>
      {/* <Modal/> → 위와 같이 동작함*/}

    </div>
  );
}

// 컴포넌트 만들기
// 1. function 생성 → function App() {} 외부에 생성하기
// 2. return() 안에 html 작성
// 3. <함수명></함수명>쓰기

// 컴포넌트 이름은 영어 대문자로 시작
function Modal() {
  return (
    <div className='modal'>
      <h4>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
    // <div></div> → 2개의 태그를 병렬로 사용할 수 없음!
    // ┕ 병렬로 사용하려면 전체 html을 <></> (fragment)로 감싸면 사용 가능하다.
  );
}

// ===== (참고) 컴포넌트 만드는 문법 2 ===== //
// let Modal = () => {
//   return (
//     <div></div>
//   );
// }

// const는 값이 변경되었을 때 에러를 출력함(실수 방지)
// const Modal = () => {
//   return (
//     <div></div>
//   );
// }
// ===== //

export default App;
