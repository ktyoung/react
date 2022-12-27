import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { increase } from './../store/userSlice.js';
import { addCount } from './../store.js';

function Cart() {

    let state = useSelector( (state) => { return state } );
    let dispatch = useDispatch();

    return (
        <div>
            <h6>{ state.user.name }({state.user.age})의 장바구니</h6>
            <Button variant="primary" onClick={ () => { dispatch(increase(10)) } }>버튼</Button>
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
                                    <td>
                                        <Button variant="primary" onClick={ () => { 
                                            dispatch(addCount(state.cart[i].id)) 
                                        } }>+</Button>
                                    </td>
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