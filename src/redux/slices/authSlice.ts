import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IMessage, IUser, JwtResponse, SignInRequest, SignUpRequest} from "../../interfaces";
import {authService} from "../../services";
import {alertActions} from "./alertSlice";

interface IState {
    isAuth: boolean,
    user: IUser,
    isLoading: boolean
}

const initialState: IState = {
    isAuth: null,
    user: null,
    isLoading: null
}

const signIn = createAsyncThunk<JwtResponse, { user: SignInRequest },
    { rejectValue: IMessage }>(
    'authSlice/signIn',
    async ({user}, {rejectWithValue, dispatch}) => {
        try {
            const {data} = await authService.signIn(user)
            dispatch(alertActions.setMessage('Successfully logged in!'))
            return data
        } catch (e) {
            const err = e as AxiosError
            const data = err.response.data as IMessage
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
)

const signUp = createAsyncThunk<void, { user: SignUpRequest },
    { rejectValue: IMessage }>(
    'authSlice/signUp',
    async ({user}, {rejectWithValue, dispatch}) => {
        try {
            await authService.signUp(user)
            dispatch(alertActions.setMessage('Successfully registered!'))
        } catch (e) {
            const err = e as AxiosError
            const data = err.response.data as IMessage
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
)

const checkTokenAndFetchUser = createAsyncThunk<IUser, void, { rejectValue: IMessage }>(
    'authSlice/checkTokenAndFetchUser',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await authService.getMe();
            return data;
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage)
        }
    }
)

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        logOut: (state) => {
            authService.deleteToken()
            Object.assign(state, initialState);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(signIn.fulfilled, (_, action) => {
                authService.setToken(action.payload.token)
            })

            .addCase(checkTokenAndFetchUser.fulfilled, state => {
                state.isLoading = false
            })

            .addCase(checkTokenAndFetchUser.rejected, state => {
                state.isLoading = false
                authService.deleteToken()
            })

            .addCase(checkTokenAndFetchUser.pending, state => {
                state.isLoading = true
            })

            .addMatcher(isFulfilled(signIn, checkTokenAndFetchUser), (state, action) => {
                state.isAuth = true
                state.user = action.payload
            })
    }
})

const {reducer: authReducer, actions} = authSlice

const authActions = {
    ...actions,
    signIn,
    signUp,
    checkTokenAndFetchUser
}

export {
    authActions,
    authReducer
}