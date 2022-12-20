// (참고) 함수, 컴포넌트도 export 가능

let a = 10;
let b = 100;

// export 문법
// export default 변수명;
// export default a;

// 여러 변수를 export 하려면?
// export { 변수1, 변수2, ...}
export {a, b};

// 서버에서 보낸 데이터라 가정함
// let data=[ {},{},{} → object 자료형 ] → array 자료형
// object 자료형은 자료 이름을 작성해서 사용해야 함
// array 자료형은 인덱싱하여 사용
let data = [
  {
    id : 0,
    title : "White and Black",
    content : "Born in France",
    price : 120000
  },

  {
    id : 1,
    title : "Red Knit",
    content : "Born in Seoul",
    price : 110000
  },

  {
    id : 2,
    title : "Grey Yordan",
    content : "Born in the States",
    price : 130000
  }
] 

export default data;