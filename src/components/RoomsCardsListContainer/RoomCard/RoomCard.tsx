import {FC, useState} from "react";
import {Button, Card} from "react-bootstrap";

import {IBooking, IRoom} from "../../../interfaces";
import css from "./RoomCard.module.css"
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {BookingForm} from "../../BookingForm";
import {bookingActions} from "../../../redux";

interface IProp {
    room: IRoom
}

const RoomCard: FC<IProp> = ({room}) => {
    const {id, roomNumber, capacity, price} = room;
    const {isAuth, user} = useAppSelector(state => state.auth);
    const [showBookingForm, setShowBookingForm] = useState<boolean>(null)
    const dispatch = useAppDispatch();

    const handleShowBookingForm = () => setShowBookingForm(true)

    const book = (booking: IBooking) => {
        booking.roomId = id
        booking.userId = user.id
        dispatch(bookingActions.create({booking}))
    }

    return (
        <>
            <Card border="primary" className={css.RoomCard}>
                <Card.Header>
                    <Card.Title>{roomNumber}</Card.Title>
                    <Card.Text style={{fontSize: 'smaller'}}>id: {id}</Card.Text>
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-2">capacity: {capacity}</Card.Subtitle>
                    <Card.Subtitle className="mb-2">{price}&#8372; - per night</Card.Subtitle>
                    <Button variant="primary" disabled={!isAuth || !user.enabled}
                            onClick={handleShowBookingForm}>Book</Button>
                </Card.Body>
            </Card>
            {(isAuth && user.enabled) &&
                <BookingForm show={showBookingForm} setShow={setShowBookingForm} roomNumber={roomNumber} price={price}
                             submit={book}/>
            }
        </>
    );
};

export {
    RoomCard
}