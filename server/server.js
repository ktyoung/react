// (참고 1) nodejs로 서버 구동하는 방법
// 1. nodejs 설치
// 2. 작업 폴더 생성 후 열기
// 3. server.js 파일 생성(기본 코드 작성)
// 4. 터미널에서 npm init -y 및 npm install express

const express = require('express');
const path = require('path');
const app = express();

app.listen(8080, function () {
  console.log('listening on 8080')
}); 

// (참고 3) 코드 수정할 때마다 build 작업을 해야하는가?
// 1. 사이트를 발행할 때 한 번만 해주면 됨
// 2. 로컬 작업 환경에서는 localhost로 미리보기 띄우고 개발 진행하면 문제 없음
//  2-1. 리액트 → 서버 ajax 요청 시 경로를 잘 입력해야 함
//   예) http://서버주소/product
//  2-2. 서버에 cors 옵션 켜놓으면 됨

// Node+Express 서버와 React 연동하려면?
// 4. 3을 사용하려면 아래 코드를 추가
//  4-1. 사용하려면 npm install cors
//  4-2. express.json()은 유저가 보낸 array/object 데이터를 출력하기 위해 필요
//  4-3. cors는 다른 도메인끼리 ajax 요청을 주고받을 때 필요
app.use(express.json());
var cors = require('cors');
app.use(cors());

// 2. 1을 사용하려면 특정 폴더의 파일을 전송 가능하게 설정해야함
app.use(express.static(path.join(__dirname, 'shop/build')));

// 1. 사용자가 사이트에 접속하면 build 한 html 파일을 보여주면 됨
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'shop/build/index.html'));
})

// 3. DB 데이터를 리액트에서 보여주려면?
//  (참고 2) server-side rendering과 client-side rendering
//  1. server-side rendering은 html을 서버가 만들어서 보내주는 것
//    1-1. DB에서 데이터 추출 → html 파일에 삽입 → html 파일을 서버가 전송
//  2. client-side rendering은 html을 리액트(JS)가 만들어서 보내주는 것
//    2-1. 사용자가 GET 요청을 하면 DB에서 데이터를 추출해서 보내주는 API 작성
//    2-2. 리액트는 서버 주소(위에서 설계한 API)로 GET 요청 → 데이터를 받아옴
//    2-3. 받은 데이터를 사용
app.get('/product', function(request, response) {
    response.json({name : "black shoes"});
})

// 4. 리액트 라우터(서브 페이지) 사용하는 경우 아래 코드를 최하단에 추가
app.get('*', function (request, response) {
    response.sendFile(path.join(__dirname, 'shop/build/index.html'));
})