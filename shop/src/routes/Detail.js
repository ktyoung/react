import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail(props) {
    let {id} = useParams();
    let [count, setCount] = useState(0);
    let [alert, setAlert] = useState(true);

    useEffect( () => {
        let timer = setTimeout( () => { setAlert(false)  }, 2000 )
        // useEffect 동작 전에 코드를 실행하고 싶으면 return () => { 실행할 코드 } 
        // clean up function이라 함
        // (참고 2) clean up function은 unmount 시 실행됨 → mount 시 실행 안 됨
        return () => {
            // useEffect 동작 전에 실행할 코드
            // 기존 코드를 제거하는 코드를 주로 작성함
            clearTimeout(timer); // 기 생성된 타이머 제거하는 코드
        }
    }, [count]) // == mount 할 때, count가 변할 때만 useEffect가 실행됨
    // (참고 1) ↑ useEffect 실행 조건을 넣을 수 있는 곳은 []에 작성함 (dependency)
    // 1. dependency가 없으면 컴포넌트가 mount, update될 때만 실행함
    // 2. dependency가 없다면 [] → mount할 때만 실행됨... 컴포넌트 mount 시 1회만 실행하고 싶을 때 사용

    // (참고 3) useEffect 요약
    // 1. 재렌더링 할 때마다 코드를 실행하려면
    // useEffect( () => { 실행할 코드 } )
    // 2. mount 시 1회만 코드를 실행하려면
    // useEffect ( () => {실행할 코드} [] )
    // 3. unmount 시 1회만 코드를 실행하려면
    // useEffect( () => {
    //     return () => {
    //         실행할 코드
    //     }
    // }, [] )
    // 4. clean up function은 useEffect 실행 전에 무언가를 실행할 때 사용
    // return () => {}
    // 5. dependency는 특정 조건에만 useEffect를 실행할 때 사용
    // useEffect ( () => {실행할 코드} [변경될 state] )

    return (
        <div className="container">
            {
                alert == true 
                ?   <div className="alert alert-warning">
                        2초 이내 구매 시 할인
                    </div>
                : null
            }
            
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