import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { increase } from './../store/userSlice.js';
import { addCount } from './../store.js';
import { memo, useEffect, useMemo, useState } from 'react';

// 자식 컴포넌트의 재런더링 방지하기 → memo() : 필요할 때만 재렌더링하게 설정
// 따라서, 렌더링 시간이 오래 걸리는 컴포넌트를 memo()로 감싸면 성능 개선에 좋음!

// (참고 1) memo의 원리? 
// 1. props가 변할 때만 재렌더링함
//  1-1. 기존props == 신규props 계속 비교
//  1-2. props가 길고 복잡하면 memo()의 무조건적인 사용이 손해일수도?
let Child = memo( function Child() {
    console.log("재렌더링 됨");
    return <div>자식 컴포넌트</div>
})

// 연산 시간이 매우 오래 걸리는 연산 함수임을 가정
function calcFunction() {
    // return 연산 결과
}

// Cart() 컴포넌트가 재렌더링 되면 자식 컴포넌트(<Child>)도 전부 재렌더링 됨! → 성능 저하를 일으킬 수 있음
function Cart() {
    // 연산 시간이 오래 걸리는 함수도 Cart() 컴포넌트가 재렌더링될 때마다 실행됨 → useMemo 사용
    let result = calcFunction();
    // useMemo()에 함수를 작성하면, 컴포넌트 렌더링 시 1회만 함수를 실행해줌 → 컴포넌트 재렌더링 시 실행되지 않음
    // dependency 사용 가능
    // (참고 2) useEffect와 비슷한 기능 아닌가?
    // 1. useEffect는 HTML 렌더링이 끝나면 실행됨
    // 2. useMemo는 렌더링이 시작될 때 실행됨
    // 3. 즉, 실행 시점에서 차이가 있다고 볼 수 있음!
    useMemo( () => { return calcFunction() }, [state] )

    let state = useSelector( (state) => { return state } );
    let dispatch = useDispatch();
    let [count, setCount] = useState(0);

    return (
        <div>
            {/* Child 컴포넌트가 렌더링 시간이 오래 걸리는 컴포넌트라면?
                → 필요할 때만 재렌더링되게 코드 작성 */}
            <Child count={count}></Child>
            {/* state 변경하여 재렌더링되게 하는 버튼 */}
            <button onClick={ () => { setCount(count+1) } }>재렌더링 버튼</button>

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