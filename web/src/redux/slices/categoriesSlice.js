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
            // return state.categories.push(action.payload);
            console.log(action.payload);
            return {
                ...state,
                categories: state.categories.concat(action.payload),
              };
        },
        deleteCategory:(state, action) =>{
            state.categories
        }
    }
})

export const { setCategoriesList , createCategory, deleteCategory} = categoriesSlide.actions;

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
            dispatch(createCategory(res.data.data))
        })
        .catch(error => console.log(error));
    }
}
export const deleteOneCategory = (payload) =>{
    console.log(payload , 'soy el pauload');
    return async (dispatch) => {
        await axios.delete('http://localhost:3000/categories/'+ payload)
       .then((res) => {
           dispatch(deleteCategory(res.data.data))
       })
       .catch(error => console.log(error));
   }
}