import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        list: null,
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
            state.user = action.payload[0]
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
        axios(import.meta.env.VITE_URL+'/user')
        .then((res) => {
            dispatch(setUserList(res.data.data));
        })
        .catch((error) => console.log(error))
    }
}

export const createOneUser = (payload) => {
    return async (dispatch) => {
        await axios.post(import.meta.env.VITE_URL+'/user', payload)
        .then((res) => {
            dispatch(createUser(payload))
        })
        .catch(error => console.log(error));
    }
}

export const updateOneUser = (payload) => {
    
    return async (dispatch) => {
        await axios.put(import.meta.env.VITE_URL+'/user/'+payload.id, payload)
        .then(res => {
            dispatch(updateUser());
        })
        .catch((error) => console.log(error))
    }
}

export const deleteOneUser = (payload) => {
    
    return async (dispatch) => {
        await axios.delete(import.meta.env.VITE_URL+'/user/'+payload)
        .then(res => {
            dispatch(deleteUser());
        })
        .catch((error) => console.log(error))
    }
}
export const getOneUser = (payload) => {

    return async (dispatch) => {
        console.log(import.meta.env.VITE_URL)
        await axios.post(import.meta.env.VITE_URL+'/auth/login', payload)
        .then(res => {
            dispatch(user(res.data.data));
        })
        .catch((error) => console.log(error));
    }
}

export const getData = async (payload) => {
    try {
        const response = await axios.post(import.meta.env.VITE_URL+'/user/data/get', payload);
        return response.data;
    } catch (error) {
        // Handle any errors that occurred during the request
        console.error(error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

export const cleanOneUser = () =>{
    return  (dispatch) =>{
        dispatch(cleanUser());
    }
}