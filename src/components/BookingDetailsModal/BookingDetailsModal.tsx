import {CardLink, Modal} from "react-bootstrap";
import {Dispatch, FC, SetStateAction, useEffect, useState} from "react";

import {IBooking, ICity, ICountry, IHotel, IRoom, IUser} from "../../interfaces";
import {cityService, countryService, hotelService, roomService, userService} from "../../services";
import {useAppSelector} from "../../hooks";
import {ERole} from "../../enums";
import {useNavigate} from "react-router-dom";

interface IProp {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>,
    booking: IBooking
}

const BookingDetailsModal: FC<IProp> = ({show, setShow, booking}) => {
    const {user: {roles}} = useAppSelector(state => state.auth);
    const [country, setCountry] = useState<ICountry>(null)
    const [city, setCity] = useState<ICity>(null)
    const [hotel, setHotel] = useState<IHotel>(null)
    const [room, setRoom] = useState<IRoom>(null)
    const [user, setUser] = useState<IUser>(null)
    const navigate = useNavigate();

    useEffect(() => {
        if (show) {
            roomService.getById(booking.roomId).then(({data}) => setRoom(data))
            if (roles.includes(ERole.ROLE_MANAGER)) {
                userService.getById(booking.userId).then(({data}) => setUser(data))
            }
        }
    }, [show, booking, roles]);

    useEffect(() => {
        if (room) {
            hotelService.getById(room.hotelId).then(({data}) => setHotel(data))
        }
    }, [room]);

    useEffect(() => {
        if (hotel) {
            cityService.getById(hotel.cityId).then(({data}) => setCity(data))
            countryService.getById(hotel.countryId).then(({data}) => setCountry(data))
        }
    }, [hotel]);

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Details of booking</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {country && city && hotel && room &&
                    <>
                        <p>ID: {booking.id}</p>
                        <p>State: {booking.state}</p>
                        <p>Country:{' '}
                            <CardLink onClick={() => navigate(`/hotels?countryId=${country.id}`)}
                                      style={{cursor: 'pointer'}}>{country.name}</CardLink>
                        </p>
                        <p>City:{' '}
                            <CardLink onClick={() => navigate(`/hotels?cityId=${city.id}`)}
                                      style={{cursor: 'pointer'}}>{city.name}</CardLink>
                        </p>
                        <p>Hotel:{' '}
                            <CardLink onClick={() => navigate(`/hotels/${hotel.id}`)}
                                      style={{cursor: 'pointer'}}>{hotel.name}</CardLink>
                        </p>
                        <p>Room: {room.roomNumber}</p>
                        {user && roles.includes(ERole.ROLE_MANAGER) && <p>User: {user.username}</p>}
                        <p>Booked Since: {booking.bookedSince.toString()}</p>
                        <p>Booked To: {booking.bookedTo.toString()}</p>
                        <p>Price: {booking.price}&#8372;</p>
                    </>
                }
            </Modal.Body>
        </Modal>
    );
};

export {
    BookingDetailsModal
}