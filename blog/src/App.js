/* eslint-disable */
// ↑ eslint(자동으로 warning 잡아주는 기능) 끄기

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let logo = 'ReactBlog';
  let post = '안양 맛집';
  
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '안양 우동 맛집', '파이썬 독학']);
  let [likeCount, addLikeCount] = useState(0);

  return (
    <div className="App">
      <div className='black-nav'>
        <h4>{ logo }</h4>
      </div>

      <div className='list'>
        <button onClick={ () => { 글제목변경(글제목 = ['여자 코트 추천', '안양 우동 맛집', '파이썬 독학']) } }>제목 변경</button>
        {/* onClick 이벤트 핸들러 사용법 */}
        {/* 1. onClick={ 실행할 함수명 } */}
        {/* 2. onClick={ function() {실행할 코드} } */}
        {/* 3. onClick={ () => {실행할 코드} } */}

        {/* ※※※ state 변경하는 법 ※※※ */}
        {/* state변경함수(새로운state) */}
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
    </div>
  );
}

export default App;
