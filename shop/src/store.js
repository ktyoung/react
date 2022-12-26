import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name : 'user',
    initialState : 'kim',
    // Redux에서 state 변경하는 방법
    // 1. reducers : {}에 state 변경 함수 작성
    reducers : {
        rename(state) {
            return 'ty ' + state;
        }
    }
})

let cart = createSlice({
    name : 'cart',
    initialState : [
        {id: 0, name: 'White and Black', count: 2},
        {id: 2, name: 'Grey Yordan', count: 1}
    ]
})

// 2. state 변경 함수 export
export let { rename } = user.actions

export default configureStore({
    reducer: {
        user : user.reducer,
        cart : cart.reducer
    }
}) 