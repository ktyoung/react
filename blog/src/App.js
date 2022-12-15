import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  // 1. state를 사용하는 이유?
  // 데이터를 수정하면 state를 쓰던 html이 자동으로 재렌더링이 됨.
  // 일반 변수는 새로고침을 해야 재렌더링이 됨
  // 자주 변경되는 html 부분은 state로 만들어 놓으면 좋다

  // 2.사용 예시는? 
  // 웹페이지에서 필터 기능을 적용할 때 새로고침 없이 실시간 반영되게 할 수 있음

  // 자료를 잠깐 저장할 땐 변수 선언 후 사용(var, let, const)
  let logo = 'ReactBlog';
  let post = '안양 맛집';
  
  // ==== state를 사용해도 됨 ===== //
  // 1. import { useState } from 'react';
  // 2. useState('데이터')
  // 3. let[작명1, 작명2]
  // → 작명1 == state명, 작명2 == state 변경 도와주는 함수
  let [글제목, b] = useState(['남자 코트 추천', '안양 우동 맛집', '파이썬 독학']);
  // ===== //

  // ===== (참고) Destructuring 문법 ===== //
  // → array 안에 있는 자료를 변수로 추출해 사용하는 문법

  // 1. 1과 2라는 값을 따로 추출해 사용하고 싶다면?
  // let num = [1, 2];

  // 2. 각각의 값을 변수로 만들어서 사용
  // let x = num[0];
  // let y = num[1];

  // 2-1. 더 쉽게 사용하려면...
  // let [x, y] = [1, 2] → x == 1, y == 2
  // ===== //

  return (
    <div className="App">
      <div className='black-nav'>
        <h4>{ logo }</h4>
      </div>

      <div className='list'>
        <h4>{ 글제목[0] }</h4>
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

    // return() 안에는 태그 2개를 병렬로 기입할 수 없다
    // return(
    //   <div></div>
    //   <div></div>
    // );
  );
}

export default App;
