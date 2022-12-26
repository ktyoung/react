import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// 3. state 변경 함수, useDispath import
import { rename } from './../store.js';

function Cart() {

    let state = useSelector( (state) => { return state } );
    let dispatch = useDispatch(); // → store.js로 요청 보내주는 함수

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
                    {
                        state.cart.map(function(a, i) {
                            return (
                                <tr key={i}>
                                    <td>{ state.cart[i].id }</td>
                                    <td>{ state.cart[i].name }</td>
                                    <td>{ state.cart[i].count }</td>
                                    <td><Button variant="primary" onClick={ () => {
                                        // 4. dispatch(state변경함수()) 문법으로 사용
                                        dispatch(rename())
                                    } }>+</Button></td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default Cart