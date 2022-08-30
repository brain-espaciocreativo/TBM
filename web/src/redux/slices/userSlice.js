import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        list: [],
        user: {},
        logged: null
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
        },
        login: (state, action) =>{
            console.log(action.payload);
            state.logged = action.payload;
        },
        logout: ( state ) =>{
            state.logged = null;
        }
    }
});

export const { setUserList , createUser , login , logout} = userSlice.actions;



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
    return async(dispatch) =>{
        await axios.post('http://localhost:3000/user/' , payload )
        .then((res) =>{
            dispatch(createUser(res.data));
        })
        .catch((err) => console.log(err));
    }
}

   export const loggedUser = (payload) =>{
       return async(dispatch) => {
           await axios.post('http://localhost:3000/auth/login', payload)
           .then( (res) =>{
               dispatch(login(res.data))
           })
           .catch( (err) => console.log(err));
       }
   }