import {Navigate, Outlet} from "react-router-dom";
import {decodeJwt} from "jose";

import {authService} from "../services";

const ProtectedRouteUser = () => {
    const token = authService.getToken();

    if (!token || Date.now() > decodeJwt(token).exp * 1000) {
        return <Navigate to="/auth"/>
    }
    return <Outlet/>;
};

export {
    ProtectedRouteUser
}