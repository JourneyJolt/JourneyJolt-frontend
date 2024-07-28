import {configureStore} from "@reduxjs/toolkit";

import {
    alertReducer,
    authReducer,
    bookingReducer,
    cityReducer,
    countryReducer,
    hotelReducer,
    roomReducer,
    userReducer
} from "./slices";

const store = configureStore({
    reducer: {
        alerts: alertReducer,
        auth: authReducer,
        bookings: bookingReducer,
        cities: cityReducer,
        countries: countryReducer,
        hotels: hotelReducer,
        rooms: roomReducer,
        users: userReducer
    }
})

export {
    store
}