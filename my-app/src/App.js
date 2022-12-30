import React from 'react';
import logo from './logo.svg';
import './App.css';

// PWA(Progressive Web App)?
// 웹사이트를 안드로이드/iOS 모바일 앱처럼 사용할 수 있게 만드는 일종의 웹개발 기술

// (참고 1) PWA 프로젝트 생성 방법
// 1. npx create-react-app 프로젝트명 --template cra-template-pwa
//  1-1. 기존 프로젝트를 PWA 프로젝트로 변경할 수는 없음! 새로운 PWA 프로젝트를 만들고 기존 코드(라이브러리)를 복사-붙여넣으면 됨.
// 2. manifest.json(=앱 정보)와 service-worker.js 두 파일이 있어야 PWA 조건이 충족됨
//  2-1. service-worker.js 생성하려면 index.js 파일 수정
//  2-2. npm run build 실행하면 service-worker.js 파일(오프라인에서도 사이트를 열 수 있게 도와줌)이 생김

// (참고 2) PWA 확인 방법
// 1. build 된 파일을 호스팅하거나, build 된 index.html을 미리보기(extensions 등 활용)
// 2. 브라우저에서 설치 버튼이 생기면 PWA
// 3. 브라우저-개발자도구-Application에서 PWA 설정 확인 가능

// (참고 3) 특정 파일들을 캐싱되지 않게 설정하려면?
// 1. node_module/react-scripts/config/webpack.config.js
// 2. InjectManifest - exclude 부분을 정규식을 활용해 수정하면 됨

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
