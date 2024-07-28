import {AuthComponent} from "../../components";
import {useAppSelector} from "../../hooks";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const AuthPage = () => {
    const {isAuth} = useAppSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate('/')
        }
    }, [navigate, isAuth]);

    return (
        <AuthComponent/>
    );
};

export {
    AuthPage
}