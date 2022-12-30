import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'

let cart = createSlice({
    name : 'cart',
    initialState : [
        {id: 0, name: 'White and Black', count: 2},
        {id: 2, name: 'Grey Yordan', count: 1}
    ],
    reducers : {
        addCount(state, action) {
            let index = state.findIndex( (a) => { return a.id === action.payload } )
            state[index].count++;
        },
        addCart(state, action) {
            state.push(action.payload)
        }
    }
})

export let { addCount, addCart } = cart.actions

export default configureStore({
    reducer: {
        user : user.reducer,
        cart : cart.reducer
    }
}) 