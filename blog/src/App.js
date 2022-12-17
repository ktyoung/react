/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() { 

  let logo = 'ReactBlog';
  let post = '안양 맛집';
  
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동맛집', '파이썬 독학']);
  function rename() {
    let copy = [...글제목];
    copy[0] = "여자 코트 추천";
    글제목변경(copy);
  }

  let [likeCount, setLikeCount] = useState([0, 0, 0]);

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

      {
        글제목.map(function(a, i){
          return (
            <div className='list' key={ i }>
              <h4 onClick={ toggleModal }>{ a } 
              <span onClick={ () => { 
                let copy = [...likeCount];
                copy[i] += 1;
                setLikeCount(copy);
               } }>👍
              </span> { likeCount[i] } </h4>
              <p>12월 15일 발행</p>
            </div>
          )
        })
      }

      {/* props 문법 사용 방법 (부모 → 자식 state 전송하는 법) */}
      {/* 1. <자식컴포넌트 작명={state이름} /> */}
      {
        // (참고) props로 문자도 전송 가능
        modal == true ? <Modal 글제목={글제목} color="skyblue" rename={rename} /> : null
      }
    </div>
  );
}

// state가 function App() {}에 정의되어 있으므로 state를 임의로 사용 불가함
// props 문법을 사용하면 자식이 부모의 state를 사용 가능함
// props 전송은 부모 → 자식만 가능함!

// 2. props 매개변수 등록 후 props.작명 사용
function Modal(props) {
  return (
    // 다양한 색의 모달창이 필요하다면?
    // background 스타일을 props로 받아와 사용(함수의 매개변수처럼 활용 가능)
    <div className='modal' style={{background : props.color}}>
      <h4>{ props.글제목[0] }</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={ () => { props.rename() } }>글수정</button>
    </div>
  );
}

export default App;
