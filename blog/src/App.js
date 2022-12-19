/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { render } from '@testing-library/react';

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

  let date = new Date();
  let [today, setToday] = useState([date.getFullYear()+"년 ", date.getMonth()+1+"월 ", date.getDate()+"일 발행"]);


  let [modal, setModal] = useState(false);
  function toggleModal() {
    if (modal == true) {
      setModal(false);
    } else {
      setModal(true);
    }
  }

  function addText() {
    if (inputText != "") {
      let copy = [...글제목];
      copy.unshift(inputText);
      글제목변경(copy);

      let copyLike = [...likeCount];
      copyLike.unshift(0);
      setLikeCount(copyLike)
    } else {
      alert("내용을 입력해 주세요.");
    }
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
              <p>{ today }</p>
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
      <Modal2></Modal2>
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

// (참고 1) class 문법으로도 컴포넌트 생성 가능
// 1. class 컴포넌트명 extends React.Component {}
// 2. constructor() { super() } render() {} 작성
// 3. render() { return( html 코드 작성) }
class Modal2 extends React.Component {
  // (참고 5) class 컴포넌트에서 props 데이터는 constroctor()에 저장됨
  constructor(props) {
    super(props);
    // (참고 2) class 컴포넌트에서 state 생성
    // 1. this.state = { 작명 : 값, 작명 : 값, ... }
    this.state = {
      name : 'kim',
      age : 20
    }
  }
  render() {
    return(
      <div>
        class 컴포넌트입니다. <br/> 
        {/* (참고 3) class 컴포넌트에서 state 사용 */}
        나이는 {this.state.age}입니다. <br/> 
        {/* (참고 4) class 컴포넌트에서 state 수정 */}
        <button onClick={ () => {
          this.setState({ age : 26 })
        } }>수정</button>
      </div>
    )
  }
}

export default App;
