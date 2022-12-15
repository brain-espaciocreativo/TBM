import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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
        await axios.post('http://10.0.2.2:3000/auth/login', payload)
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
        await axios.get('http://ec2-18-228-222-33.sa-east-1.compute.amazonaws.com:3000/work/', payload)
        .then( res =>{
            dispatch(getOneData(res.data))
        })
    }
}