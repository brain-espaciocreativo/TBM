import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const workSlide = createSlice({
    name: 'works',
    initialState: {
        workList: null,
        work: null,
    },
    reducers: {
        setWorkList: (state, action) => {
            state.workList = action.payload
        },
        createWork: (state, action) => {
            state.workList = action.payload
        },
        updateWork: (state, action) => {
            state
        },
        deleteWork: (state, action) => {
            state
        },
        getWorkOne: (state, action) => {
            state.work = action.payload
        },
    },
})

export const { setWorkList, createWork, updateWork, deleteWork, getWorkOne } =
    workSlide.actions

export default workSlide.reducer

export const getAllWorks = () => {
    return async (dispatch) => {
        await axios(import.meta.env.VITE_URL + '/work')
            .then((res) => {
                dispatch(setWorkList(res.data.data))
            })
            .catch((error) => console.log(error))
    }
}

export const getOneWork = (payload) => {
    return async (dispatch) => {
        await axios(import.meta.env.VITE_URL + '/work/' + payload)
            .then((res) => {
                dispatch(getWorkOne(res.data.data))
            })
            .catch((error) => console.log(error))
    }
}

export const getOneWorkAllProgress = (payload) => {
    return async (dispatch) => {
        await axios(import.meta.env.VITE_URL + '/work/all/' + payload)
            .then((res) => {
                dispatch(getWorkOne(res.data.data))
            })
            .catch((error) => console.log(error))
    }
}

export const createOneWork = (payload) => {
    const params = {
        work: payload.work,
        progresses: payload.ships,
        usersIds: payload.shipUsers.map((u) => u.id),
    }

    return async (dispatch) => {
        await axios
            .post(import.meta.env.VITE_URL + '/work', params)
            .then((res) => {
                dispatch(createWork(res.data.data))
            })
            .catch((error) => console.log(error))
    }
}

export const updateOneWork = (payload) => {
    const params = {
        ...payload.work,
        usersIds: payload.users.map((u) => u.id),
    }

    return async (dispatch) => {
        await axios
            .put(import.meta.env.VITE_URL + '/work/' + payload.work.id, params)
            .then((res) => {
                dispatch(updateWork())
            })
            .catch((error) => console.log(error))
    }
}

export const deleteOneWork = (payload) => {
    return async (dispatch) => {
        await axios
            .delete(import.meta.env.VITE_URL + '/work/' + payload)
            .then((res) => {
                dispatch(deleteWork())
            })
            .catch((error) => console.log(error))
    }
}
