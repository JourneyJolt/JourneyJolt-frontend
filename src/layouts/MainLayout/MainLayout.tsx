import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import {Container, Spinner} from "react-bootstrap";
import LoadingOverlayWrapper from "react-loading-overlay-ts";

import {ErrorAlert, Header, SuccessAlert} from "../../components";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {authService} from "../../services";
import {authActions} from "../../redux";

const MainLayout = () => {
    const dispatch = useAppDispatch();
    const {
        auth: {isLoading: authLoading},
        bookings: {isLoading: bookingsLoading},
        countries: {isLoading: countriesLoading},
        hotels: {isLoading: hotelsLoading},
        rooms: {isLoading: roomsLoading},
        users: {isLoading: usersLoading}
    } = useAppSelector(state => state);

    const isLoading = authLoading || bookingsLoading || countriesLoading || hotelsLoading || roomsLoading ||
        usersLoading;

    useEffect(() => {
        if (authService.getToken()) {
            dispatch(authActions.checkTokenAndFetchUser());
        }
    }, [dispatch]);

    return (
        <LoadingOverlayWrapper
            active={isLoading}
            spinner={<Spinner animation="grow"/>}
            styles={{
                overlay: base => ({
                    ...base,
                    background: 'rgba(66,66,66,0.5)',
                    position: 'fixed'
                }),
                wrapper: {
                    height: '100%'
                }
            }}
        >
            <Header/>
            <Container className="justify-content-center bg-light min-vh-100" style={{paddingTop: '4em'}}>
                <Outlet/>
            </Container>
            <ErrorAlert/>
            <SuccessAlert/>
        </LoadingOverlayWrapper>
    );
};

export {
    MainLayout
}