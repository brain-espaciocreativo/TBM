import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const newSlide = createSlice({
    name:'news',
    initialState:{
        newList:[]
    },
    reducers:{
        setNewList: (state, action) => {
            state.newList = action.payload;
        }
    }
})

export const { setNewList } = newSlide.actions;

export default newSlide.reducer;

export const getAllNews = () => {
    return async (dispatch) => {
        await axios('http://localhost:3000/news')
        .then((res) => {
            dispatch(setNewList(res.data.data));
        })
        .catch((error) => console.log(error))
    }
}