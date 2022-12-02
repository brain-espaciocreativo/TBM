import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        user: null,
        works: null,
        news: null,
        progresses: null
    },
    reducers: {
        user:(state, action) =>{
            return {
                ...state,
                user: action.payload[0],
                works: action.payload[1]
        }
        },
        cleanUser:(state,action) =>{
            state.user = ''
        },
        getOneData:(state, action) =>{
        //     return {
        //         ...state,
        //         progresses: action.payload[0],
        //         news: action.payload[1]
        // }
        }
    }
});

export const {user, cleanUser, getOneData } = userSlice.actions;

export default userSlice.reducer;

export const getOneUser = (payload) => {
    return async (dispatch) => {
        await axios.post( config.URL + '/auth/login', payload)
        .then(res => {
            dispatch(user(res.data.data))
        })
        .catch((error) => console.log(error));
    }
}
export const cleanOneUser = () =>{
    return  (dispatch) =>{
        dispatch(cleanUser());
    }
}

export const getWorkData = (payload) =>{
    return async (dispatch)=>{
        await axios.get( config.URL + '/work/', payload)
        .then( res =>{
            dispatch(getOneData(res.data))
        })
    }
}