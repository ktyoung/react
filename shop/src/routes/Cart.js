import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Cart() {

    // Redux store의 state 사용하기
    // 1. useSelector( (state) => { return state } ) // → Redux store를 가져옴
    let state = useSelector( (state) => { return state } ); // 변수 a에 Redux store에 있던 state가 저장됨

    // (참고 1) useSelector 편하게 사용하려면?
    // 1. useSelector 함수에서 사용하고 싶은 state만 불러와서 사용할 수 있다
    //  예) let state = useSelector( (state) => { return state.user } );
    // 2. {중괄호}와 return은 생략 가능
    // 예) let state = useSelector( (state) => state.stock );


    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{ state.itemId[0] }</td>
                        <td>{ state.itemName[0] }</td>
                        <td>{ state.itemCount[0] }</td>
                        <td>변경</td>
                    </tr>
                    <tr>
                        <td>{ state.itemId[1] }</td>
                        <td>{ state.itemName[1] }</td>
                        <td>{ state.itemCount[1] }</td>
                        <td>변경</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default Cart