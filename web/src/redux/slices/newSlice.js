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
        },
        createNews: (state, action) =>{
            state.newList = action.payload
        }
    }
})

export const { setNewList, createNews } = newSlide.actions;

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

export const createOneNews = (payload) => {
    console.log(payload);
    return async (dispatch) => {
        await axios.post('http://localhost:3000/news', payload)
        .then((res) => {
            dispatch(createNews(payload))
        })
        .catch(error => console.log(error));
    }
}