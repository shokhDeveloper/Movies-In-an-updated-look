import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    posts: []
}
export const slice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts(state, action){
            state.posts = action.payload
        },
        setDelete(state,action){
            console.log(state, action)
            state.posts = state.posts.filter((item) => item.id !== action.payload)
        }
    }
})
export const Reducer = slice.reducer
export const Action = slice.actions