import logo from './logo.svg';
import './App.css';

function App() {

  let post = '안양 맛집';

  return (
    <div className="App">
      {/* class 명은 className으로 선언 */}
      <div className='black-nav'>
        {/* style 넣으려면 style={ {스타일명:'값'} } */}
        {/* 스타일명은 CamelCase로 작성 */}
        <h4 style={ {color : 'red', fontSize : '20px' } }>리액트 블로그</h4>
      </div>
      {/* 중괄호를 사용하면 데이터 바인딩이 아주 편리함 */}
      {/* 변수를 사용할 땐 { 변수명 } */}
      <h4>{ post }</h4>
    </div>
  );
}

export default App;
