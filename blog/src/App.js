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
              <h4 onClick={ () => { toggleModal(); setTitle(i); }}>{ a } 
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

      {
        modal == true ? <Modal 글제목={글제목} rename={rename} title={title} /> : null
      }
    </div>
  );
}

function Modal(props) {
  // state를 자식 컴포넌트에 생성해도 됨
  // 그러나, state가 다양한 컴포넌트에 필요하면 최상위 컴포넌트(App)에 생성해야함
  // let [title, setTitle] = useState(0);
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
