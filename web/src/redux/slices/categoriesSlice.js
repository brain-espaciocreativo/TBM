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
        await axios(import.meta.env.VITE_URL+'/categories')
        .then((res) => {
            dispatch(setCategoriesList(res.data.data));
        })
        .catch((error) => console.log(error))
    }
}

export const getCategories = (id) => {
    return async (dispatch) => {
        await axios(import.meta.env.VITE_URL+'/work/category/'+id)
        .then((res) => {
            dispatch(setCategoriesList(res.data.data));
        })
        .catch((error) => console.log(error))
    }
}

export const createOneCategory = (payload) => {
    return async (dispatch) => {
         await axios.post(import.meta.env.VITE_URL+'/categories', {name: payload})

        .then((res) => {
            dispatch(createCategory(res.data.data))
        })
        .catch(error => console.log(error));
    }
}
export const deleteOneCategory = (payload) =>{
    console.log(payload , 'soy el pauload');
    return async (dispatch) => {
        await axios.delete(import.meta.env.VITE_URL+'/categories/'+ payload)
       .then((res) => {
           dispatch(deleteCategory(res.data.data))
       })
       .catch(error => console.log(error));
   }
}