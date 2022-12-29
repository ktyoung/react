import { useState, useTransition, useDeferredValue } from "react";

// 0이 10,000개 채워진 array 생성
let a = new Array(10000).fill(0);

function Test() {
    let [name, setName] = useState('');

    // useTransition() 사용 방법
    // 1. startTransition 함수(늦게 처리할 함수)로 문제의 state 변경 함수 감싸기
    //  (참고 1) startTransition의 동작 원리?
    //  1-1. 브라우저가 할 일은? 
    //      1-1-1. 타이핑한 글자를 <input>에 보여주기
    //      1-1-2. <div> 10,000개 생성하기
    //      1-1-3. → 동시에 처리하려 하니 성능 저하가 발생
    //  1-2. startTransition()는 안에 있는 코드를 조금 늦게 실행함
    //      1-2-1. 먼저, 타이핑한 글자를 <input>에 보여주기
    //      1-2-2. 위 작업을 마치면 <div> 10,000개 생성하기
    //      1-2-3. → 중요한 작업이 끝나면 다음 작업을 수행하므로 성능 개선에 도움을 줌

    // 2. isPending은 startTransition이 처리 중일 때 true로 변함
    let [isPending, startTransition] = useTransition();

    // 3. useDeferredValue를 사용해도 느린 컴포넌트 성능 향상 가능
    let state = useDeferredValue(name); // → state에 변동사항이 생기면 늦게 처리해줌 → 변동된 값을 다시 state 변수에 저장

    return (
        <div>
            {/* 유저가 입력한 값을 name state에 저장 */}
            <input onChange={ (e) => { 
                startTransition( () => {
                    setName(e.target.value)
                } )
            } }/>

            {/* 의도적으로 성능 저하 일으키기 
                → 타이핑하면 name이 변경됨 → 10,000번 반복문도 렌더링해야 함 */}

            {/* 
            성능 저하 해결 방법?
                1. html 10,000개 생성하는 코드 삭제
                2. 굳이 10,000개를 보여줘야 한다면 useTransition() 사용
            */}
            {
                // isPending을 활용한 HTML 출력 → startTransition이 처리 중이면 '로딩 중' 텍스트 출력
                isPending ? '로딩 중입니다.' : 
                a.map( () => {
                    return <div>{name}</div>
                } )
            }
        </div>
    )
}

export default Test