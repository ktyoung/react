import { useParams } from "react-router-dom";
// styled-components 사용
import styled from "styled-components";


// (참고 1) styled-components의 장점?
// 1. CSS 파일에서 작성할 필요 없음
// 2. 스타일이 다른 js 파일을 간섭하지 않음
// 3. 페이지 로딩 시간이 단축됨

// (참고 2) styled-components의 단점?
// 1. JS 파일이 매우 복잡해짐
// 2. 중복 스타일은 컴포넌트 간 import해서 사용할 것 → CSS와 차이가 없음
// 3. 협업 시 CSS 담당의 숙련도 이슈

// (참고 3) 스타일이 다른 컴포넌트에 적용되는 것을 방지하려면?
// 컴포넌트.module.css 로 작명 → 해당 컴포넌트에만 스타일이 적용됨
let Btn = styled.button `
    // props 문법으로 스타일을 동적으로 설정할 수 있다
    background : ${ props => props.bg };
    color : ${ props => props.bg == "blue" ? 'white' : 'black' };
    padding : 10px;
`

let NewBtn = styled.button(Btn) `
    // 기존 스타일을 복사하여 사용할 수도 있다
`

// styled-components를 사용하면 JS 파일에서 css 적용 가능
// 컴포넌트처럼 사용이 가능하다

function Detail(props) {
    
    let {id} = useParams();

    return (
        <div className="container">
            {/* styled-components 사용하기 */}
            <Btn bg="yellow">버튼</Btn>
            <Btn bg="blue">버튼</Btn>
            <div className="row">
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes"+ (parseInt(id)+1) +".jpg"} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{ props.shoes.find(shoes => shoes.id === parseInt(id)).title }</h4>
                    <p>{ props.shoes.find(shoes => shoes.id === parseInt(id)).content }</p>
                    <p>{ props.shoes.find(shoes => shoes.id === parseInt(id)).price }원</p>
                    <button className="btn btn-danger">주문하기</button> 
                </div>
            </div>
        </div> 
    );
}

export default Detail;