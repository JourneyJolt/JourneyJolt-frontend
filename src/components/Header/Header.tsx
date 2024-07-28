import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useNavigate, useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../redux";
import {ERole} from "../../enums";
import {useEffect, useState} from "react";

const Header = () => {
    const image = require('../../assets/logo.png');

    const {auth: {isAuth, user}, cities: {cities}, countries: {countries}} = useAppSelector(state => state);
    const [info, setInfo] = useState<string>(null)
    const dispatch = useAppDispatch();
    const [query] = useSearchParams();
    const navigate = useNavigate();

    const countryId = query.get('countryId');
    const cityId = query.get('cityId');

    const navigateToHome = () => {
        navigate('/')
    }

    const navigateToAuthorization = () => {
        navigate('/auth')
    }

    const navigateToBookings = () => {
        navigate('/bookings')
    }

    const navigateToManagement = () => {
        navigate('/management')
    }

    const logOut = () => {
        dispatch(authActions.logOut())
        navigate('/')
    }

    const navigateToApiDoc = () => {
        window.location.href = `/api/v2/swagger-ui/index.html`
    }

    useEffect(() => {
        if (cityId && cities.length) {
            setInfo(cities.find(city => city.id === cityId)?.name)
        } else if (countryId && countries.length) {
            setInfo(countries.find(country => country.id === countryId)?.name)
        } else {
            setInfo(null)
        }
    }, [cityId, countryId, cities, countries]);

    return (
        <Navbar expand="lg" className="bg-secondary bg-gradient justify-content-center position-fixed w-100 z-2">
            <Container>
                <Navbar.Brand onClick={navigateToHome} style={{cursor: 'pointer'}}>
                    <img
                        alt="JourneyJolt"
                        src={image}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    JourneyJolt
                </Navbar.Brand>
                {info && <Navbar.Text>{info}</Navbar.Text>}
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link onClick={navigateToHome}>Home</Nav.Link>
                        <Nav.Link onClick={navigateToApiDoc}>API</Nav.Link>
                        {
                            isAuth ?
                                <div className="navbar-nav">
                                    <NavDropdown title={"User: " + user.username} id="dropdown">
                                        <NavDropdown.Item onClick={navigateToBookings}>Bookings</NavDropdown.Item>
                                        {user.roles.includes(ERole.ROLE_MANAGER) && <NavDropdown.Item
                                            onClick={navigateToManagement}>Management</NavDropdown.Item>}
                                        <NavDropdown.Item onClick={logOut}>LogOut</NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                                :
                                <Nav.Link onClick={navigateToAuthorization}>SignIn/SignUp</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export {
    Header
}