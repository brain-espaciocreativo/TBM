import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        list: [],
        user: {},
    },
    reducers: {
        setUserList: (state, action) => {
            state.list = action.payload;
        },
        getOneUser: (state, action) => {
            state.user = action.payload;
        },
        createUser: (state, action) => {
            state.list = action.payload;
            // return {...state, list: [...state.list ,action.payload]}
        },
        updateUser: (state, action) => {
            state
        },
        deleteUser : (state, action) => {
            state
        },
        user:(state, action) =>{
            state.user = action.payload
        },
        cleanUser:(state,action) =>{
            state.user = ''
        }
    }
});

export const { setUserList, createUser, updateUser, deleteUser, user, cleanUser } = userSlice.actions;

export default userSlice.reducer;

export const getAllUsers = () => {
    return (dispatch) => {
        axios('http://localhost:3000/user')
        .then((res) => {
            dispatch(setUserList(res.data.data));
        })
        .catch((error) => console.log(error))
    }
}

export const createOneUser = (payload) => {
    return async (dispatch) => {
        await axios.post('http://localhost:3000/user', payload)
        .then((res) => {
            dispatch(createUser(payload))
        })
        .catch(error => console.log(error));
    }
}

export const updateOneUser = (payload) => {
    
    return async (dispatch) => {
        await axios.put('http://localhost:3000/user/'+payload.id, payload)
        .then(res => {
            dispatch(updateUser());
        })
        .catch((error) => console.log(error))
    }
}

export const deleteOneUser = (payload) => {
    
    return async (dispatch) => {
        await axios.delete('http://localhost:3000/user/'+payload)
        .then(res => {
            dispatch(deleteUser());
        })
        .catch((error) => console.log(error))
    }
}
export const getOneUser = (payload) => {

    return async (dispatch) => {
        await axios.post('http://10.0.2.2:3000/auth/login', payload)
        .then(res => {
            dispatch(user(res.data.user));
        })
        .catch((error) => console.log(error));
    }
}
export const cleanOneUser = () =>{
    return  (dispatch) =>{
        dispatch(cleanUser());
    }
}