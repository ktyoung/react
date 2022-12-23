import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Nav} from 'react-bootstrap';

function Detail(props) {
    let {id} = useParams();
    let input = document.getElementsByClassName('getText');

    let [count, setCount] = useState(0);
    let [notice, setNotice] = useState(true);
    let [tabs, setTabs] = useState(0);
    // let [inputText, setInputText]  = useState('');

    useEffect( () => {
        let timer = setTimeout( () => { setNotice(false)  }, 2000 )

        // if (isNaN(inputText)) {
        //     setInputText(inputText = '');
        //     input.value = inputText;
        //     alert("숫자만 입력하세요.");
        //     console.log(input.value);
        // }
        return () => {
            clearTimeout(timer);
        }
    }, [count])

    return (
        <div className="container">
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
                    {/* <input className="getText" type="text" value={ inputText } onChange={ (e) => { setInputText(e.target.value) } } /> */}
                    <h4 className="pt-5">{ props.shoes.find(shoes => shoes.id === parseInt(id)).title }</h4>
                    <p>{ props.shoes.find(shoes => shoes.id === parseInt(id)).content }</p>
                    <p>{ props.shoes.find(shoes => shoes.id === parseInt(id)).price }원</p>
                    <button className="btn btn-danger">주문하기</button> 
                </div>
            </div>

            {/* eventKey 속성은 버튼마다 마음대로 작명하면 됨
            defaultActiveKey 속성은 페이지 로드 시 어떤 버튼을 클릭한 효과를 줄 지 결정하는 부분 */}
            <Nav variant="tabs" defaultActiveKey="link-0">
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

            {/* 컴포넌트화 한 조건문을 사용 */}
            <TabContents tabs={tabs}/>
            
        </div> 
    );
}

// 조건문 사용하기 → 컴포넌트화 하여 사용
function TabContents(props) {
    if (props.tabs == 0) {
        return <div>내용0</div>
    } else if (props.tabs == 1) {
        return <div>내용1</div>
    } else {
        return <div>내용2</div>
    }
}

// (참고 1) props 등록 및 사용이 번거로우면?
// props 대신 {변수명}을 파라미터로 사용
// function TabContents({tabs}) {
//     if (tabs == 0) {
//         return <div>내용0</div>
//     } else if (tabs == 1) {
//         return <div>내용1</div>
//     } else {
//         return <div>내용2</div>
//     }
// }

// (참고 2) if문 대신 사용할 수 있는 방법?
// html을 배열로 설정하여 인덱싱[tabs]하는 방법
// function TabContents({tabs}) {
//    return [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tabs]
// }

export default Detail;