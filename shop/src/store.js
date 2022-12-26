import { configureStore, createSlice } from '@reduxjs/toolkit'

// (참고 2) 컴포넌트 간 state 공유가 필요없다면 Redux store에 작성할 필요가 없음 → useState() 사용하는 것이 좋음

// Redux store에 state 보관하는 방법
// 1. createSlice({}) → useState() 역할, state 하나를 slice라 함
// 2. name : 'state 이름', initialState : 'state 값'
let user = createSlice({
    name : 'user',
    initialState : 'kim'
})

let stock = createSlice({
    name : 'stock',
    initialState : [10, 11, 12]
})

let itemId = createSlice({
    name : 'itemId',
    initialState : [0, 2]
})

let itemName = createSlice({
    name : 'itemName',
    initialState : ['White and Black', 'Grey Yordan']
})

let itemCount = createSlice({
    name : 'itemCount',
    initialState : [2, 1]
})

export default configureStore({
    reducer: {
        // ※※※ 위에서 생성한 state를 이곳에 등록해야 사용가능!! ※※※ //
        // state 등록 방법
        // 1. 작명 : 위에서 만든 state.reducer
        user : user.reducer,
        stock : stock.reducer,
        itemId : itemId.reducer,
        itemName : itemName.reducer,
        itemCount : itemCount.reducer
    }
}) 