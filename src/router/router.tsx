import {createBrowserRouter, Navigate} from "react-router-dom";

import {MainLayout} from "../layouts";
import {AuthPage, BookingsPage, HotelPage, HotelsPage, ManagementPage} from "../pages";
import {ProtectedRouteUser} from "./ProtectedRouteUser";
import {ProtectedRouteManager} from "./ProtectedRouteManager";

const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, children: [
            {index: true, element: <Navigate to={'hotels'}/>},
            {path: 'hotels', element: <HotelsPage/>},
            {path: 'hotels/:hotelId', element: <HotelPage/>},
            {path: 'auth', element: <AuthPage/>},
            {
                path: '', element: <ProtectedRouteUser/>, children: [
                    {path: 'bookings', element: <BookingsPage/>}
                ]
            },
            {
                path: '', element: <ProtectedRouteManager/>, children: [
                    {path: 'management', element: <ManagementPage/>}
                ]
            }
        ]
    }
])

export {
    router
}