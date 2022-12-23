import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Nav} from 'react-bootstrap';

// 애니메이션 효과 주는 방법
// 1. 애니메이션 동작 전 스타일을 담을 className 만들기 
// 2. 애니메이션 동작 후 스타일을 담을 className 만들기 
// 3. transition 속성 추가
// 4. 원할 때 CSS 탈부착

function Detail(props) {
    let {id} = useParams();

    let [count, setCount] = useState(0);
    let [notice, setNotice] = useState(true);
    let [tabs, setTabs] = useState(0);
    let [fadeDetail, setFadeDetail] = useState('');

    useEffect( () => {
        let timer = setTimeout( () => { setNotice(false)  }, 2000 )
        let fadeAnimateDetail = setTimeout( () => {setFadeDetail('end');}, 100 );
        return () => {
            clearTimeout(timer);
            clearTimeout(fadeAnimateDetail);
        }
    }, [])

    return (
        <div className={"container start " + fadeDetail}>
            {
                notice == true 
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

            <Nav className="tab-ui" variant="tabs" defaultActiveKey="link-0">
                <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={ () => { setTabs(0) } }>버튼 0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={ () => { setTabs(1) } }>버튼 1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={ () => { setTabs(2) } }>버튼 2</Nav.Link>
                </Nav.Item>
            </Nav>

            <TabContents tabs={tabs}/>
            
        </div> 
    );
}

function TabContents({tabs}) {

    let [fade, setFade] = useState('');

    // tabs state가 변할 때마다 'end' 클래스를 부착 → useEffect() 사용
    useEffect( () => {
        // (참고 1) setTimeout으로 클래스명 부착에 지연시간을 줘야 애니메이션이 동작하는 이유?
        // 1. 리액트의 automatic batching 기능 때문에 마지막 state 변경 함수만 동작함
        //  1-1. setFade('') → setFade('end') 순서로 실행되는 것이 아니라 setFade('end')만 동작함
        // 2. 따라서, 클래스명 부착을 나중에 하게되면 정상적으로 동작함
        let fadeAnimate = setTimeout( () => {setFade('end');}, 100 );

        // clean up function(useEffect 실행 전에 동작하는 함수)
        return () => {
            clearTimeout(fadeAnimate);
            setFade('');
        }
    }, [tabs])

    return (
        // 4. 애니메이션 CSS 탈부착
        // `문자 ${변수}`로 html 사이에 문자 삽입 가능
        <div className={"start " + fade}> 
            { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tabs] }
        </div>
    );
}

export default Detail;