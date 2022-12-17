/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() { 

  let logo = 'ReactBlog';
  let post = '안양 맛집';
  
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동맛집', '파이썬 독학']);
  let [likeCount, setLikeCount] = useState([0, 0, 0]);

  // map : 반복문
  // 1. array의 자료 개수만큼 함수 내부 코드를 실행함
  // 2. 함수의 매개변수는 array 안에 있던 자료
  // 3. return 값을 array로 담아줌

  let [modal, setModal] = useState(false);
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

      {/* <button className='sort-btn' 
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
      </div> */}

      {/* 같은 html 반복 생성하는 법 */}
      {/* state의 크기 == 블로그의 글 개수 */}
      {/* 1. 매개변수로 i를 전달하면 서로 다른 블로그 글이 출력됨 */}
      {/* 2. 두 번째 매개변수는 반복문을 수행할 때마다 0부터 1씩 증가하는 정수 : 0 → 1 → 2 → ... */}
      {
        // 글제목의 개수만큼 반복
        // return 값을 array로 반환
        // 매개변수로 2개 사용 가능
        글제목.map(function(a, i){
          return (
            // 반복문으로 html 생성하면 key={ html마다 다른 숫자 } 추가해야함 → 반복 생성한 UI가 각각 다른 key 값을 가져야함
            <div className='list' key={ i }>
              <h4 onClick={ toggleModal }>{ a } 
              {/* ※※※ array 자료 변경 시에는 copy한 후 copy본을 수정 ※※※ */}
              <span onClick={ () => { 
                let copy = [...likeCount];
                copy[i] += 1;
                setLikeCount(copy);
               } }>👍
              </span> { likeCount[i] } </h4>
              {console.log(likeCount[i])}
              {/* <h4>{ 글제목[i] }</h4> → 매개변수 i를 이용해도 출력 가능하다 */}
              <p>12월 15일 발행</p>
            </div>
          )
        })
      }

      {
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
