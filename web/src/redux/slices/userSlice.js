import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        list: [],
        user: {}
    },
    reducers: {
        setUserList: (state, action) => {
            state.list = action.payload;
        },
        getOneUser: (state, action) => {
            state.user = action.payload;
        },
        createUser:(state, action) =>{
            state.user += action.payload;
        }
    }
});

export const { setUserList , createUser} = userSlice.actions;

export default userSlice.reducer;

export const getAllUsers = () => {
    return (dispatch) => {
        axios('http://localhost:3000/user')
        .then((res) => {
            dispatch(setUserList(res.data));
        })
        .catch((error) => console.log(error))
    }
}

export const createOneUser = (payload) =>{
    console.log('esto es un payload' + payload.name);
    return async(dispatch) =>{
        await axios.post('http://localhost:3000/user/' , payload )
        .then((res) =>{
            dispatch(createUser(res.data));
        })
        .catch((err) => console.log(err));
    }
}