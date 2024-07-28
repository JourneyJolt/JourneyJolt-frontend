import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IMessage, IRoom} from "../../interfaces";
import {roomService} from "../../services";
import {alertActions} from "./alertSlice";
import {bookingActions} from "./bookingSlice";

interface IState {
    rooms: IRoom[],
    roomsForManagement: IRoom[],
    trigger: boolean,
    isLoading: boolean
}

const initialState: IState = {
    rooms: [],
    roomsForManagement: [],
    trigger: null,
    isLoading: null
}

const getAll = createAsyncThunk<IRoom[], void, { rejectValue: IMessage }>(
    'roomSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await roomService.getAll()
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage);
        }
    }
)

const getAllEnabled = createAsyncThunk<IRoom[], void, { rejectValue: IMessage }>(
    'roomSlice/getAllEnabled',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await roomService.getAllEnabled()
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage);
        }
    }
)

const getByHotelId = createAsyncThunk<IRoom[], { hotelId: string },
    { rejectValue: IMessage }>(
    'roomSlice/getByHotelId',
    async ({hotelId}, {rejectWithValue}) => {
        try {
            const {data} = await roomService.getByHotelId(hotelId)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage);
        }
    }
)

const getEnabledByHotelId = createAsyncThunk<IRoom[], { hotelId: string },
    { rejectValue: IMessage }>(
    'roomSlice/getEnabledByHotelId',
    async ({hotelId}, {rejectWithValue}) => {
        try {
            const {data} = await roomService.getEnabledByHotelId(hotelId)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage);
        }
    }
)

const getAllAvailableForPeriod = createAsyncThunk<IRoom[], {
    hotelId: string,
    bookedSince: string,
    bookedTo: string,
    capacity: string
}, { rejectValue: IMessage }>(
    'roomSlice/getAllAvailableForPeriod',
    async ({hotelId, bookedSince, bookedTo, capacity}, {rejectWithValue}) => {
        try {
            const {data} = await roomService.getAllAvailableForPeriod(
                hotelId,
                bookedSince,
                bookedTo,
                capacity)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage)
        }
    }
)

const create = createAsyncThunk<void, { room: IRoom }, { rejectValue: IMessage }>(
    'roomSlice/create',
    async ({room}, {rejectWithValue, dispatch}) => {
        try {
            await roomService.create(room)
            dispatch(alertActions.setMessage('Room successfully created!'))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const update = createAsyncThunk<void, { roomId: string, room: IRoom },
    { rejectValue: IMessage }>(
    'roomSlice/update',
    async ({roomId, room}, {rejectWithValue, dispatch}) => {
        try {
            await roomService.update(roomId, room)
            dispatch(alertActions.setMessage('Room successfully updated!'))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const disableRoom = createAsyncThunk<void, { roomId: string },
    { rejectValue: IMessage }>(
    'roomSlice/disableRoom',
    async ({roomId}, {rejectWithValue, dispatch}) => {
        try {
            await roomService.disableRoom(roomId)
            dispatch(bookingActions.changeTrigger())
            dispatch(alertActions.setMessage('Room successfully disabled!'))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const enableRoom = createAsyncThunk<void, { roomId: string },
    { rejectValue: IMessage }>(
    'roomSlice/enableRoom',
    async ({roomId}, {rejectWithValue, dispatch}) => {
        try {
            await roomService.enableRoom(roomId)
            dispatch(alertActions.setMessage('Room successfully enabled!'))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const deleteRoom = createAsyncThunk<void, { roomId: string },
    { rejectValue: IMessage }>(
    'roomSlice/deleteRoom',
    async ({roomId}, {rejectWithValue, dispatch}) => {
        try {
            await roomService.deleteRoom(roomId)
            dispatch(bookingActions.changeTrigger())
            dispatch(alertActions.setMessage('Room successfully deleted!'))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const roomSlice = createSlice({
    name: 'roomSlice',
    initialState,
    reducers: {
        changeTrigger: state => {
            state.trigger = !state.trigger
        }
    },
    extraReducers: builder => {
        builder
            .addMatcher(isFulfilled(getAll, getByHotelId), (state, action) => {
                state.roomsForManagement = action.payload
            })

            .addMatcher(isFulfilled(getAllEnabled, getEnabledByHotelId, getAllAvailableForPeriod), (state, action) => {
                state.rooms = action.payload;
            })

            .addMatcher(isFulfilled(getAll, getAllEnabled, getByHotelId, getEnabledByHotelId, getAllAvailableForPeriod), state => {
                state.isLoading = false
            })

            .addMatcher(isFulfilled(create, update, disableRoom, enableRoom, deleteRoom), state => {
                state.trigger = !state.trigger
            })

            .addMatcher(isRejected(getAll, getAllEnabled, getByHotelId, getEnabledByHotelId, getAllAvailableForPeriod), state => {
                state.isLoading = false
            })

            .addMatcher(isPending(getAll, getAllEnabled, getByHotelId, getEnabledByHotelId, getAllAvailableForPeriod), state => {
                state.isLoading = true
            })
    }
})

const {reducer: roomReducer, actions} = roomSlice;

const roomActions = {
    ...actions,
    getAll,
    getAllEnabled,
    getByHotelId,
    getEnabledByHotelId,
    getAllAvailableForPeriod,
    create,
    update,
    disableRoom,
    enableRoom,
    deleteRoom
}

export {
    roomActions,
    roomReducer
}