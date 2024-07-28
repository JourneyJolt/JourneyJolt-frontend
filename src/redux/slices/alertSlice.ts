import {createSlice} from "@reduxjs/toolkit";

interface IState {
    error: string,
    message: string
}

const initialState: IState = {
    error: null,
    message: null
}

const alertSlice = createSlice({
    name: 'alertSlice',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload
        },
        setMessage: (state, action) => {
            state.message = action.payload
        }
    }
})

const {reducer: alertReducer, actions} = alertSlice

const alertActions = {
    ...actions
}

export {
    alertActions,
    alertReducer
}