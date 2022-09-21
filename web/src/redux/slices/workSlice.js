import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const workSlide = createSlice({
    name:'works',
    initialState:{
        workList:[],
        work: null,
    },
    reducers:{
        setWorkList: (state, action) => {
            state.workList = action.payload;
        },
        createWork:(state, action) =>{
            state.workList = action.payload
        },
        updateWork:(state,action) =>{
            state
        },
        deleteWork:(state,action) =>{
            state
        },
        getWorkOne:(state, action) =>{
            state.work = action.payload
        }
    }
})

export const { setWorkList, createWork,updateWork,deleteWork, getWorkOne } = workSlide.actions;

export default workSlide.reducer;

export const getAllWorks = () => {
    return async (dispatch) => {
        await axios('http://localhost:3000/work')
        .then((res) => {
            dispatch(setWorkList(res.data.data));
        })
        .catch((error) => console.log(error))
    }
}

export const getOneWork = (payload) =>{
    return async (dispatch) => {
        await axios('http://localhost:3000/work/'+ payload)
        .then((res) => {
            dispatch(getWorkOne(res.data.data))
        })
        .catch(error => console.log(error));
    }
}

export const createOneWork = (payload) => {
    return async (dispatch) => {
        await axios.post('http://localhost:3000/work', payload)
        .then((res) => {
            dispatch(createWork(payload))
        })
        .catch(error => console.log(error));
    }
}

export const updateOneWork = (payload) => {
    return async (dispatch) => {
        await axios.put('http://localhost:3000/work/'+payload.id, payload)
        .then(res => {
            dispatch(updateWork());
        })
        .catch((error) => console.log(error))
    }
}

export const deleteOneWork = (payload) => {
    
    return async (dispatch) => {
        await axios.delete('http://localhost:3000/work/'+payload)
        .then(res => {
            dispatch(deleteWork());
        })
        .catch((error) => console.log(error))
    }
}