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
        }
    }
})

export const { setCategoriesList } = categoriesSlide.actions;

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