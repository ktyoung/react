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

  let [title, setTitle] = useState(0);

  let [inputText, setInputText] = useState('');

  let [modal, setModal] = useState(false);
  function toggleModal() {
    if (modal == true) {
      setModal(false);
    } else {
      setModal(true);
    }
  }

  // 새로운 글 추가하기
  function addText() {
    글제목변경(글제목.concat(inputText))
  }

  // 기존 글 삭제하기
  function removeText(key) {
    let newArr = 글제목.filter(a => a !== key)
    글제목변경(newArr);
  }

  return (
    <div className="App">
      <div className='black-nav'>
        <h4>{ logo }</h4>
      </div>

      {
        // 왜 <span> 태그를 눌러도 모달창이 뜨는가?
        // 이벤트 버블링(클릭 이벤트는 상위 html로 퍼짐) 때문
        // ※※※ 이벤트 버블링을 방지하려면 : e.stopPropagation() ※※※ //
        글제목.map(function(a, i){
          return (
            <div className='list' key={ i }>
              <h4 onClick={ () => { toggleModal(); setTitle(i); }}>{ a } 
              <span onClick={ (e) => { 
                e.stopPropagation();
                let copy = [...likeCount];
                copy[i] += 1;
                setLikeCount(copy);
               } }>👍
              </span> { likeCount[i] } </h4>
              <p>12월 15일 발행</p>
              <button className='del-btn' 
                onClick={ () => { removeText(a) } }>삭제</button>
            </div>
          )
        })
      }

      {/* <input> 태그 */}
      {/* 1. 다양한 type이 있음 */}
      {/* 2. <input> 태그에 뭔가 입력 시 코드를 실행하고 싶으면 onChange / onInput */}
      {/* 3. 매우 다양한 이벤트 핸들러가 있음. onMouseOver, onScroll 등등... */}
      {/* 4. <input>에 입력한 값 가져오는 방법? */}
      {/* 4-1. 매개변수로 e 전달 → e.target.value */}
      {/* 5. <input>에 입력된 값을 저장하려면? */}
      {/* 5-1. state 변경 함수를 사용해 저장한다 */}
      <input onChange={ (e) => { setInputText(e.target.value); } } />
      <button onClick={ addText }>글발행</button>

      {/* (참고 1) dropdown 박스는 <select> 태그 */}
      {/* (참고 2) 긴 텍스트 입력 시에는 <textarea> 태그 */}
      {/* (참고 3) state 변경 함수는 늦게 처리됨(비동기처리) */}

      {
        modal == true ? <Modal 글제목={글제목} rename={rename} title={title} /> : null
      }
    </div>
  );
}

function Modal(props) {
  return (
    <div className='modal'>
      <h4>{ props.글제목[props.title] }</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={ () => { props.rename() } }>글수정</button>
    </div>
  );
}

export default App;
