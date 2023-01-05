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
        },
        deleteNews: (state, action)=>{
            state.newList
        }
    }
})

export const { setNewList, createNews, deleteNews } = newSlide.actions;

export default newSlide.reducer;

export const getAllNews = () => {
    return async (dispatch) => {
        await axios(import.meta.env.VITE_URL+'/news')
        .then((res) => {
            dispatch(setNewList(res.data.result));
        })
        .catch((error) => console.log(error))
    }
}

export const createOneNews = (payload) => {
    console.log(payload);
    return async (dispatch) => {
        await axios.post(import.meta.env.VITE_URL+'/news', payload)
        .then((res) => {
            dispatch(createNews(payload))
        })
        .catch(error => console.log(error));
    }
}

export const deleteOneNews = (payload) => {
    return async (dispatch) => {
        await axios.delete(import.meta.env.VITE_URL+'/news/'+payload)
        .then((res) => {
            dispatch(deleteNews(payload))
        })
        .catch(error => console.log(error));
    }
}