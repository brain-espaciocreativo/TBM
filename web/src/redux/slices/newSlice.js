import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const newSlide = createSlice({
    name: 'news',
    initialState: {
        newList: [],
    },
    reducers: {
        setNewList: (state, action) => {
            state.newList = action.payload
        },
        createNews: (state, action) => {
            state.newList = action.payload
        },
        deleteNews: (state, action) => {
            state.newList = action.payload
        },
    },
})

export const { setNewList, createNews, deleteNews } = newSlide.actions

export default newSlide.reducer

export const getAllNews = () => {
    return async (dispatch) => {
        await axios(import.meta.env.VITE_URL + '/news')
            .then((res) => {
                dispatch(setNewList(res.data.data))
            })
            .catch((error) => console.log(error))
    }
}

export const get = async (id) => {
    try {
        const response = await axios.get(import.meta.env.VITE_URL+'/news/'+id);
        return response.data.data;
    } catch (error) {
        // Handle any errors that occurred during the request
        console.error(error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

export const createOneNews = (payload) => {
    return async (dispatch) => {
        await axios
            .post(import.meta.env.VITE_URL + '/news', payload)
            .then((res) => {
                dispatch(createNews(payload))
            })
            .catch((error) => console.log(error))
    }
}

export const deleteOneNews = (payload) => {
    return async (dispatch) => {
        await axios
            .delete(import.meta.env.VITE_URL + '/news/' + payload)
            .then((res) => {
                dispatch(deleteNews(res.data.data))
            })
            .catch((error) => console.log(error))
    }
}
