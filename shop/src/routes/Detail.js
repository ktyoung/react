import { getByDisplayValue } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// (참고 1) 컴포넌트의 Lifecycle(생명주기)
// 1. 페이지에 장착(mount)되거나, 업데이트(update)되거나, 제거(unmount)됨
// 2. 생명주기 중간에 간섭(코드 실행)할 수 있음

// (참고 2) class 문법으로 컴포넌트 생성 및 간섭 코드 작성(과거 문법)
class Detail2 extends React.Component {
    componentDidMount() {
        // 컴포넌트 mount 시 실행할 코드
    }

    componentDidUpdate() {
        // 컴포넌트 update 시 실행할 코드
    }

    componentWillUnmount() {
        // 컴포넌트 unmount 시 실행할 코드
    }
}

function Detail(props) {
    // 컴포넌트 안에서 간섭 코드 작성 → useEffect 문법 사용(최신 문법)
    useEffect( () => {
        // 컴포넌트 mount, update 시 실행할 코드
        console.log("mount, update");
    })

    // (참고 3) 타이머 설정 방법
    // setTimeout( () => {실행할 코드}, 몇 초(ms)후에 실행할 것인지? )
    setTimeout( () => {
        // document.getElementsByClassName("클래스명")은 nodeList를 전달하므로...
        // 접근하고자 하는 값의 위치를 명시해줘야 모호하지 않음!
        // → 리스트 번호를 명시하면 됨
        document.getElementsByClassName('alert')[0].style.display="none";
    }, 2000 )

    // (참고 4) useEffect 바깥에 코드를 작성해도 똑같이 실행되는 것 아닌가? → useEffect 쓰는 이유?
    // 1. useEffect 내부 코드는 html 렌더링 후에 실행됨 → 효율적이고 빠른 동작이 가능해짐
    //  1-1. 기존 자바스크립트는 코드 위쪽부터 실행 → 중간에 오래 걸리는 작업이 있어도 그 작업부터 실행함 → html 렌더링이 늦음
    //  1-2. 실행 시간이 오래 걸리는 코드를 useEffect 내부에 작성하면 좋음
    //      예) 어려운 연산, 서버에서 데이터를 가져오는 작업, 타이머 장착

    // 컴포넌트 update를 위한 state 생성
    let [count, setCount] = useState(0);

    let {id} = useParams();

    return (
        <div className="container">
            <div className="alert alert-warning">
                2초 이내 구매 시 할인
            </div>
            {/* 컴포넌트 update를 위한 버튼 */}
            { count }
            <button onClick={ () => { setCount(count+1) } }>버튼</button>
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