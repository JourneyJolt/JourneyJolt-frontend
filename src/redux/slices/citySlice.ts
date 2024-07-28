import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {ICity, IMessage} from "../../interfaces";
import {cityService} from "../../services";
import {alertActions} from "./alertSlice";
import {hotelActions} from "./hotelSlice";
import {roomActions} from "./roomSlice";
import {bookingActions} from "./bookingSlice";

interface IState {
    city: ICity,
    cities: ICity[],
    citiesForManagement: ICity[],
    trigger: boolean,
    isLoading: boolean
}

const initialState: IState = {
    city: null,
    cities: [],
    citiesForManagement: [],
    trigger: null,
    isLoading: null
}

const getAll = createAsyncThunk<ICity[], void, { rejectValue: IMessage }>(
    'citySlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await cityService.getAll()
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage);
        }
    }
)

const getAllEnabled = createAsyncThunk<ICity[], void, { rejectValue: IMessage }>(
    'citySlice/getAllEnabled',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await cityService.getAllEnabled()
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage);
        }
    }
)

const getByCountryId = createAsyncThunk<ICity[], { countryId: string },
    { rejectValue: IMessage }>(
    'citySlice/getByCountryId',
    async ({countryId}, {rejectWithValue}) => {
        try {
            const {data} = await cityService.getByCountryId(countryId)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage);
        }
    }
)

const getEnabledByCountryId = createAsyncThunk<ICity[], { countryId: string },
    { rejectValue: IMessage }>(
    'citySlice/getEnabledByCountryId',
    async ({countryId}, {rejectWithValue}) => {
        try {
            const {data} = await cityService.getEnabledByCountryId(countryId)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage);
        }
    }
)

const getById = createAsyncThunk<ICity, { cityId: string }, { rejectValue: IMessage }>(
    'citySlice/getById',
    async ({cityId}, {rejectWithValue}) => {
        try {
            const {data} = await cityService.getById(cityId)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data as IMessage);
        }
    }
)

const create = createAsyncThunk<void, { city: ICity }, { rejectValue: IMessage }>(
    'citySlice/create',
    async ({city}, {rejectWithValue, dispatch}) => {
        try {
            await cityService.create(city)
            dispatch(alertActions.setMessage('City successfully created!'))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const update = createAsyncThunk<void, { cityId: string, city: ICity },
    { rejectValue: IMessage }>(
    'citySlice/update',
    async ({cityId, city}, {rejectWithValue, dispatch}) => {
        try {
            await cityService.update(cityId, city)
            dispatch(alertActions.setMessage('City successfully updated!'))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const disableCity = createAsyncThunk<void, { cityId: string },
    { rejectValue: IMessage }>(
    'citySlice/disableCity',
    async ({cityId}, {rejectWithValue, dispatch}) => {
        try {
            await cityService.disableCity(cityId)
            dispatch(hotelActions.changeTrigger())
            dispatch(roomActions.changeTrigger())
            dispatch(bookingActions.changeTrigger())
            dispatch(alertActions.setMessage('City successfully disabled!'))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const enableCity = createAsyncThunk<void, { cityId: string },
    { rejectValue: IMessage }>(
    'citySlice/enableCity',
    async ({cityId}, {rejectWithValue, dispatch}) => {
        try {
            await cityService.enableCity(cityId)
            dispatch(alertActions.setMessage('City successfully enabled!'))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const deleteCity = createAsyncThunk<void, { cityId: string },
    { rejectValue: IMessage }>(
    'citySlice/deleteCity',
    async ({cityId}, {rejectWithValue, dispatch}) => {
        try {
            await cityService.deleteCity(cityId)
            dispatch(hotelActions.changeTrigger())
            dispatch(roomActions.changeTrigger())
            dispatch(bookingActions.changeTrigger())
            dispatch(alertActions.setMessage('City successfully deleted!'))
        } catch (e) {
            const err = e as AxiosError;
            const data = err.response.data as IMessage;
            dispatch(alertActions.setError(data.message))
            return rejectWithValue(data)
        }
    }
);

const citySlice = createSlice({
    name: 'citySlice',
    initialState,
    reducers: {
        changeTrigger: state => {
            state.trigger = !state.trigger
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getById.fulfilled, (state, action) => {
                state.city = action.payload
            })

            .addMatcher(isFulfilled(getAllEnabled, getEnabledByCountryId), (state, action) => {
                state.cities = action.payload;
            })

            .addMatcher(isFulfilled(getAll, getByCountryId), (state, action) => {
                state.citiesForManagement = action.payload
            })

            .addMatcher(isFulfilled(getAll, getAllEnabled, getByCountryId, getEnabledByCountryId, getById), state => {
                state.isLoading = false
            })

            .addMatcher(isFulfilled(create, update, disableCity, enableCity, deleteCity), state => {
                state.trigger = !state.trigger
            })

            .addMatcher(isRejected(getAll, getAllEnabled, getByCountryId, getEnabledByCountryId, getById), state => {
                state.isLoading = false
            })

            .addMatcher(isPending(getAll, getAllEnabled, getByCountryId, getEnabledByCountryId, getById), state => {
                state.isLoading = true
            })
    }
})

const {reducer: cityReducer, actions} = citySlice;

const cityActions = {
    ...actions,
    getAll,
    getAllEnabled,
    getByCountryId,
    getById,
    create,
    update,
    disableCity,
    enableCity,
    deleteCity
}

export {
    cityActions,
    cityReducer
}