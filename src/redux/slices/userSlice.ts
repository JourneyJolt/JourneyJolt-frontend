import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IMessage, IUser} from "../../interfaces";
import {userService} from "../../services";
import {alertActions} from "./alertSlice";
import {bookingActions} from "./bookingSlice";

interface IState {
    users: IUser[],
    trigger: boolean,
    isLoading: boolean
}

const initialState: IState = {
    users: [],
    trigger: null,
    isLoading: null
}

const getAll = createAsyncThunk<IUser[], void, { rejectValue: IMessage }>(
    'userSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await userService.getAll();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage)
        }
    }
);

const updateRoles = createAsyncThunk<void, { userId: string, user: IUser },
    { rejectValue: IMessage }>(
    'userSlice/updateRoles',
    async ({userId, user}, {rejectWithValue, dispatch}) => {
        try {
            await userService.updateRoles(userId, user);
            dispatch(alertActions.setMessage('Roles successfully updated!'))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const disableUser = createAsyncThunk<void, { userId: string }, { rejectValue: IMessage }>(
    'userSlice/disableUser',
    async ({userId}, {rejectWithValue, dispatch}) => {
        try {
            await userService.disableUser(userId);
            dispatch(bookingActions.changeTrigger())
            dispatch(alertActions.setMessage('User successfully disabled!'))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const enableUser = createAsyncThunk<void, { userId: string }, { rejectValue: IMessage }>(
    'userSlice/enableUser',
    async ({userId}, {rejectWithValue, dispatch}) => {
        try {
            await userService.enableUser(userId);
            dispatch(alertActions.setMessage('User successfully enabled!'))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.users = action.payload
                state.isLoading = false
            })

            .addCase(getAll.rejected, state => {
                state.isLoading = false
            })

            .addCase(getAll.pending, state => {
                state.isLoading = true
            })

            .addMatcher(isFulfilled(updateRoles, disableUser, enableUser), state => {
                state.trigger = !state.trigger
            })
    }
});

const {reducer: userReducer, actions} = userSlice;

const userActions = {
    ...actions,
    getAll,
    updateRoles,
    disableUser,
    enableUser
}

export {
    userActions,
    userReducer
}