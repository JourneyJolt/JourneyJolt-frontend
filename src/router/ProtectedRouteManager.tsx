import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {decodeJwt} from "jose";

import {authService} from "../services";
import {ERole} from "../enums";
import {useAppSelector} from "../hooks";

const ProtectedRouteManager = () => {
    const {user} = useAppSelector(state => state.auth);
    const navigate = useNavigate();

    const token = authService.getToken();

    useEffect(() => {
        if (token) {
            if (user) {
                if (!user.roles.includes(ERole.ROLE_MANAGER)) {
                    navigate('/')
                }
            }
        }
    }, [navigate, token, user]);

    if (!token || Date.now() > decodeJwt(token).exp * 1000) {
        return <Navigate to="/auth"/>
    }
    return <Outlet/>;
};

export {
    ProtectedRouteManager
}