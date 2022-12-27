import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
    name : 'user',
    initialState : { name : 'kim', age : 20 },
    // Redux에서 object/array state 변경하는 방법
    reducers : {
        rename(state) {
            // 기존 state 수정
            // return { name : 'park', age : 20 }

            // return 없이 직접 수정도 가능하다
            state.name = 'park';
        },
        // 파라미터 문법 (action.payload)
        // increase(10)을 호출하면 age += 10이 됨
        increase(state, action) {
            state.age += action.payload;
        }
    }
})

export let { rename, increase } = user.actions

export default user;