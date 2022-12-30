import { useState, useTransition, useDeferredValue } from "react";

let a = new Array(10000).fill(0);

function Test() {
    let [name, setName] = useState('');
    let [isPending, startTransition] = useTransition();

    let state = useDeferredValue(name);

    return (
        <div>
            <input onChange={ (e) => { 
                startTransition( () => {
                    setName(e.target.value)
                } )
            } }/>
            
            {
                isPending ? '로딩 중입니다.' : 
                a.map( () => {
                    return <div>{name}</div>
                } )
            }
        </div>
    )
}

export default Test