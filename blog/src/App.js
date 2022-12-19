/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

// 페이지를 새로고침 하면 추가한 글이 사라지는 이유?
// 새로고침 시 html, js 파일을 다시 읽기 때문
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

  function addText() {
    let copy = [...글제목];
    copy.unshift(inputText);
    글제목변경(copy);
  }

  function removeText(key, n) {
    let copy = [...글제목];
    copy.splice(key, n);
    글제목변경(copy);
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
                onClick={ () => { removeText(i, 1) } }>삭제</button>
            </div>
          )
        })
      }

      <input onChange={ (e) => { setInputText(e.target.value); } } />
      <button onClick={ addText }>글발행</button>

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
