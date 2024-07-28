import {Button, Modal} from "react-bootstrap";
import {FC, useEffect, useState} from "react";

import {IBooking} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {bookingActions} from "../../../redux";
import {BookingForm} from "../../BookingForm";
import {DeleteModal} from "../../DeleteModal";
import {BookingDetailsModal} from "../../BookingDetailsModal";
import {EBookingState, ERole} from "../../../enums";
import {BookingStateForm} from "../../BookingStateForm";

interface IProp {
    booking: IBooking,
    manager?: boolean
}

const BookingRow: FC<IProp> = ({booking, manager}) => {
    const {
        hotels: {hotelsForManagement},
        rooms: {roomsForManagement},
        users: {users},
        auth: {user: {roles}}
    } = useAppSelector(state => state);
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(null)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(null)
    const [showCancelModal, setShowCancelModal] = useState<boolean>(null)
    const [showBookingDetailsModal, setShowBookingDetailsModal] = useState<boolean>(null)
    const [showBookingStateForm, setShowBookingStateForm] = useState<boolean>(null)
    const [hotelName, setHotelName] = useState<string>(null)
    const [username, setUsername] = useState<string>(null)
    const [price, setPrice] = useState<number>(null)
    const dispatch = useAppDispatch();

    const handleShowUpdateForm = () => setShowUpdateForm(true)
    const handleShowDeleteModal = () => setShowDeleteModal(true)
    const handleShowCancelModal = () => setShowCancelModal(true)
    const handleShowBookingDetailsModal = () => setShowBookingDetailsModal(true)
    const handleShowBookingStateForm = () => setShowBookingStateForm(true)

    const update = (updatedBooking: IBooking) => {
        updatedBooking.roomId = booking.roomId
        updatedBooking.userId = booking.userId
        dispatch(bookingActions.update({bookingId: booking.id, booking: updatedBooking}))
    }

    const deleteBooking = () => {
        dispatch(bookingActions.deleteBooking({bookingId: booking.id}))
    }

    const cancelBooking = () => {
        dispatch(bookingActions.cancelBooking({bookingId: booking.id}))
        setShowCancelModal(false)
    }

    const changeState = (updatedBooking: IBooking) => {
        dispatch(bookingActions.updateState({bookingId: booking.id, booking: updatedBooking}))
    }

    useEffect(() => {
        if (roomsForManagement.length) {
            const room = roomsForManagement.find(({id}) => id === booking.roomId)
            if (room) {
                setPrice(room.price)
                if (hotelsForManagement.length) {
                    const hotel = hotelsForManagement.find(({id}) => id === room?.hotelId)
                    if (hotel) {
                        setHotelName(hotel.name)
                    }
                }
            }
        }
    }, [roomsForManagement, booking.roomId, hotelsForManagement]);

    useEffect(() => {
        if (users.length) {
            const user = users.find(({id}) => id === booking.userId)
            if (user) {
                setUsername(user.username)
            }
        }
    }, [users, booking.userId]);

    return (
        <>
            <tr>
                <th>{booking.id}</th>
                <th>{booking.bookedSince.toString()}</th>
                <th>{booking.bookedTo.toString()}</th>
                <th>{hotelName}</th>
                {manager && <th>{username}</th>}
                <th>{booking.price}&#8372;</th>
                <th>{booking.state}</th>
                <th>
                    <Button variant="primary" className="me-1" onClick={handleShowBookingDetailsModal}>View
                        Details</Button>
                    {manager ?
                        <>
                            <Button variant="success" className="me-1" onClick={handleShowUpdateForm}>Update</Button>
                            <Button variant="warning" className="me-1" onClick={handleShowBookingStateForm}>Change
                                State</Button>
                            {roles.includes(ERole.ROLE_ADMIN) &&
                            <Button variant="danger" className="me-1" onClick={handleShowDeleteModal}
                                    disabled={!manager && booking.state === EBookingState.CANCELED}>Delete</Button>
                            }
                        </>
                        :
                        <Button variant="danger" className="me-1" onClick={handleShowCancelModal}
                                disabled={!manager && booking.state === EBookingState.CANCELED}>Cancel</Button>
                    }
                </th>
            </tr>
            <BookingDetailsModal show={showBookingDetailsModal} setShow={setShowBookingDetailsModal} booking={booking}/>
            {manager ?
                <>
                    <BookingForm show={showUpdateForm} setShow={setShowUpdateForm} price={price} booking={booking}
                                 submit={update}/>
                    {roles.includes(ERole.ROLE_ADMIN) &&
                    <DeleteModal show={showDeleteModal} setShow={setShowDeleteModal} objName="booking"
                                 deleteAction={deleteBooking}/>
                    }
                    <BookingStateForm show={showBookingStateForm} setShow={setShowBookingStateForm} booking={booking}
                                      submit={changeState}/>
                </>
                :
                <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cancel booking for room </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure want to cancel booking?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={cancelBooking}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            }
        </>
    );
};

export {
    BookingRow
}