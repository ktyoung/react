import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Nav} from 'react-bootstrap';
import { Context1 } from './../App.js';

function Detail(props) {
    let {stock} = useContext(Context1);

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
    let {stock} = useContext(Context1);
    let [fade, setFade] = useState('');

    useEffect( () => {
        let fadeAnimate = setTimeout( () => {setFade('end');}, 100 );

        return () => {
            clearTimeout(fadeAnimate);
            setFade('');
        }
    }, [tabs])

    return (
        <div className={"start " + fade}> 
            { 
                [
                <div>내용 0 <br/> 재고 : {stock[0]}</div>, 
                <div>내용 1 <br/> 재고 : {stock[1]}</div>, 
                <div>내용 2 <br/> 재고 : {stock[2]}</div>
                ][tabs]
            }
        </div>
    );
}

export default Detail;