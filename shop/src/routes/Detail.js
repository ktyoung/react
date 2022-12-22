import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail(props) {
    let {id} = useParams();
    let input = document.getElementsByClassName('getText');

    let [count, setCount] = useState(0);
    let [notice, setNotice] = useState(true);
    let [inputText, setInputText]  = useState('');

    useEffect( () => {
        let timer = setTimeout( () => { setNotice(false)  }, 2000 )

        if (isNaN(inputText)) {
            setInputText(inputText = '');
            input.value = inputText;
            alert("숫자만 입력하세요.");
            console.log(input.value);
        }
        return () => {
            clearTimeout(timer);
        }
    }, [inputText])

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
                    <input className="getText" type="text" value={ inputText } onChange={ (e) => { setInputText(e.target.value) } } />
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