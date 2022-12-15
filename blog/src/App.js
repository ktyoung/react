/* eslint-disable */
// ↑ eslint(자동으로 warning 잡아주는 기능) 끄기

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

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

      {/* state 변경 함수 특징 */}
      {/* 기존 state == 신규 state의 경우 변경하지 않음 */}

      {/* array/object 특징 */}
      {/* 변수의 값이 저장되는 것이 아닌 주소 값이 저장됨 */}

      <div className='list'>
        <button onClick={ () => { 
          // state가 arrat/object면 shallow copy를 만들어서 수정해야 함
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
    </div>
  );
}

export default App;
