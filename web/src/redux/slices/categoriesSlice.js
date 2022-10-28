import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const categoriesSlide = createSlice({
    name:'categories',
    initialState:{
        categories:[]
    },
    reducers:{
        setCategoriesList: (state, action) => {
            state.categories = action.payload;
        },
        createCategory:(state, action) =>{
            state.categories = action.payload.concat(action.payload)
        }
    }
})

export const { setCategoriesList , createCategory} = categoriesSlide.actions;

export default categoriesSlide.reducer;

export const getAllCategories = () => {
    return async (dispatch) => {
        await axios('http://localhost:3000/categories')
        .then((res) => {
            dispatch(setCategoriesList(res.data.data));
        })
        .catch((error) => console.log(error))
    }
}

export const createOneCategory = (payload) => {
    console.log(payload);
    return async (dispatch) => {
         await axios.post('http://localhost:3000/categories', payload)
        .then((res) => {
            console.log(res.data.data),
            dispatch(createCategory(payload))
        })
        .catch(error => console.log(error));
    }
}