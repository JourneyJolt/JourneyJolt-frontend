import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IHotel, IMessage} from "../../interfaces";
import {hotelService} from "../../services";
import {alertActions} from "./alertSlice";
import {roomActions} from "./roomSlice";
import {bookingActions} from "./bookingSlice";

interface IState {
    hotel: IHotel,
    hotels: IHotel[],
    hotelsForManagement: IHotel[],
    trigger: boolean,
    isLoading: boolean
}

const initialState: IState = {
    hotel: null,
    hotels: [],
    hotelsForManagement: [],
    trigger: null,
    isLoading: null
}

const getAll = createAsyncThunk<IHotel[], void, { rejectValue: IMessage }>(
    'hotelSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await hotelService.getAll()
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage);
        }
    }
)

const getAllEnabled = createAsyncThunk<IHotel[], void, { rejectValue: IMessage }>(
    'hotelSlice/getAllEnabled',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await hotelService.getAllEnabled()
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage);
        }
    }
)

const getByCountryId = createAsyncThunk<IHotel[], { countryId: string },
    { rejectValue: IMessage }>(
    'hotelSlice/getByCountryId',
    async ({countryId}, {rejectWithValue}) => {
        try {
            const {data} = await hotelService.getByCountryId(countryId)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage);
        }
    }
)

const getEnabledByCountryId = createAsyncThunk<IHotel[], { countryId: string },
    { rejectValue: IMessage }>(
    'hotelSlice/getEnabledByCountryId',
    async ({countryId}, {rejectWithValue}) => {
        try {
            const {data} = await hotelService.getEnabledByCountryId(countryId)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage);
        }
    }
)

const getByCityId = createAsyncThunk<IHotel[], { cityId: string },
    { rejectValue: IMessage }>(
    'hotelSlice/getByCityId',
    async ({cityId}, {rejectWithValue}) => {
        try {
            const {data} = await hotelService.getByCityId(cityId)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage);
        }
    }
)

const getEnabledByCityId = createAsyncThunk<IHotel[], { cityId: string },
    { rejectValue: IMessage }>(
    'hotelSlice/getEnabledByCityId',
    async ({cityId}, {rejectWithValue}) => {
        try {
            const {data} = await hotelService.getEnabledByCityId(cityId)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage);
        }
    }
)

const getById = createAsyncThunk<IHotel, { hotelId: string }, { rejectValue: IMessage }>(
    'hotelSlice/getById',
    async ({hotelId}, {rejectWithValue}) => {
        try {
            const {data} = await hotelService.getById(hotelId)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage);
        }
    }
)

const create = createAsyncThunk<void, { hotel: IHotel }, { rejectValue: IMessage }>(
    'hotelSlice/create',
    async ({hotel}, {rejectWithValue, dispatch}) => {
        try {
            await hotelService.create(hotel)
            dispatch(alertActions.setMessage('Hotel successfully created!'))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const update = createAsyncThunk<void, { hotelId: string, hotel: IHotel },
    { rejectValue: IMessage }>(
    'hotelSlice/update',
    async ({hotelId, hotel}, {rejectWithValue, dispatch}) => {
        try {
            await hotelService.update(hotelId, hotel)
            dispatch(alertActions.setMessage('Hotel successfully updated!'))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const disableHotel = createAsyncThunk<void, { hotelId: string },
    { rejectValue: IMessage }>(
    'hotelSlice/disableHotel',
    async ({hotelId}, {rejectWithValue, dispatch}) => {
        try {
            await hotelService.disableHotel(hotelId)
            dispatch(roomActions.changeTrigger())
            dispatch(bookingActions.changeTrigger())
            dispatch(alertActions.setMessage('Hotel successfully disabled!'))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const enableHotel = createAsyncThunk<void, { hotelId: string },
    { rejectValue: IMessage }>(
    'hotelSlice/enableHotel',
    async ({hotelId}, {rejectWithValue, dispatch}) => {
        try {
            await hotelService.enableHotel(hotelId)
            dispatch(alertActions.setMessage('Hotel successfully enabled!'))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const deleteHotel = createAsyncThunk<void, { hotelId: string },
    { rejectValue: IMessage }>(
    'hotelSlice/deleteHotel',
    async ({hotelId}, {rejectWithValue, dispatch}) => {
        try {
            await hotelService.deleteHotel(hotelId)
            dispatch(roomActions.changeTrigger())
            dispatch(bookingActions.changeTrigger())
            dispatch(alertActions.setMessage('Hotel successfully deleted!'))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const addPhotos = createAsyncThunk<IMessage, { hotelId: string, photos: FormData },
    { rejectValue: IMessage }>(
    'hotelSlice/addPhotos',
    async ({hotelId, photos}, {rejectWithValue, dispatch}) => {
        try {
            const {data} = await hotelService.addPhotos(hotelId, photos)
            dispatch(alertActions.setMessage(data.message))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const deletePhoto = createAsyncThunk<void, { hotelId: string, photoId: string },
    { rejectValue: IMessage }>(
    'hotelSlice/deletePhoto',
    async ({hotelId, photoId}, {rejectWithValue, dispatch}) => {
        try {
            await hotelService.deletePhoto(hotelId, photoId)
            dispatch(alertActions.setMessage('Photo successfully deleted!'))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const getHotelsWithAvailableRooms = createAsyncThunk<IHotel[], {
    countryId: string,
    cityId: string,
    bookedSince: string,
    bookedTo: string,
    capacity: string
}, { rejectValue: IMessage }>(
    'hotelSlice/getHotelsWithAvailableRooms',
    async ({countryId, cityId, bookedSince, bookedTo, capacity}, {rejectWithValue}) => {
        try {
            const {data} = await hotelService.getHotelsWithAvailableRooms(
                countryId,
                cityId,
                bookedSince,
                bookedTo,
                capacity)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage);
        }
    }
)

const hotelSlice = createSlice({
    name: 'hotelSlice',
    initialState,
    reducers: {
        changeTrigger: state => {
            state.trigger = !state.trigger
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getById.fulfilled, (state, action) => {
                state.hotel = action.payload
            })

            .addMatcher(isFulfilled(getAllEnabled, getEnabledByCountryId, getEnabledByCityId, getHotelsWithAvailableRooms), (state, action) => {
                state.hotels = action.payload;
            })

            .addMatcher(isFulfilled(getAll, getByCountryId, getByCityId), (state, action) => {
                state.hotelsForManagement = action.payload
            })

            .addMatcher(isFulfilled(getAll, getAllEnabled, getByCountryId, getEnabledByCountryId, getByCityId, getEnabledByCityId, getById, getHotelsWithAvailableRooms), state => {
                state.isLoading = false
            })

            .addMatcher(isFulfilled(create, update, disableHotel, enableHotel, deleteHotel, addPhotos, deletePhoto), state => {
                state.trigger = !state.trigger
            })

            .addMatcher(isRejected(getAll, getAllEnabled, getByCountryId, getEnabledByCountryId, getByCityId, getEnabledByCityId, getById, getHotelsWithAvailableRooms), state => {
                state.isLoading = false
            })

            .addMatcher(isPending(getAll, getAllEnabled, getByCountryId, getEnabledByCountryId, getByCityId, getEnabledByCityId, getById, getHotelsWithAvailableRooms), state => {
                state.isLoading = true
            })
    }
})

const {reducer: hotelReducer, actions} = hotelSlice;

const hotelActions = {
    ...actions,
    getAll,
    getAllEnabled,
    getByCountryId,
    getEnabledByCountryId,
    getByCityId,
    getEnabledByCityId,
    getById,
    create,
    update,
    disableHotel,
    enableHotel,
    deleteHotel,
    addPhotos,
    deletePhoto,
    getHotelsWithAvailableRooms
}

export {
    hotelActions,
    hotelReducer
}