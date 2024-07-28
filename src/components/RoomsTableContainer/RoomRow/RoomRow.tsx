import {Button} from "react-bootstrap";
import {FC, useEffect, useState} from "react";
import {Minus, Plus} from "@rsuite/icons";

import {IBooking, IRoom} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {roomActions} from "../../../redux";
import {RoomForm} from "../../RoomForm";
import {DeleteModal} from "../../DeleteModal";
import {bookingService} from "../../../services";
import {TableModal} from "../../TableModal";
import {BookingsTable} from "../../BookingsTableContainer";
import {ERole} from "../../../enums";
import {StateModal} from "../../StateModal";

interface IProp {
    room: IRoom
}

const RoomRow: FC<IProp> = ({room}) => {
    const {hotels: {hotelsForManagement}, bookings: {trigger}, auth: {user: {roles}}} = useAppSelector(state => state);
    const [hotelName, setHotelName] = useState<string>(null)
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(null)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(null)
    const [showBookingsModal, setShowBookingsModal] = useState<boolean>(null)
    const [showStateModal, setShowStateModal] = useState<boolean>(null)
    const [bookings, setBookings] = useState<IBooking[]>([])
    const dispatch = useAppDispatch();

    const handleShowUpdateForm = () => setShowUpdateForm(true)
    const handleShowDeleteModal = () => setShowDeleteModal(true)
    const handleShowBookingsModal = () => setShowBookingsModal(true)
    const handleShowStateModal = () => setShowStateModal(true)

    const update = (updatedRoom: IRoom) => {
        dispatch(roomActions.update({roomId: room.id, room: updatedRoom}))
    }

    const deleteRoom = () => {
        dispatch(roomActions.deleteRoom({roomId: room.id}))
    }

    const changeState = (state: string) => {
        if (state === "true") {
            dispatch(roomActions.enableRoom({roomId: room.id}))
        } else {
            dispatch(roomActions.disableRoom({roomId: room.id}))
        }
    }

    useEffect(() => {
        if (hotelsForManagement.length) {
            const hotel = hotelsForManagement.find(hotel => hotel.id === room.hotelId);
            if (hotel) {
                setHotelName(hotel.name)
            }
        }
    }, [hotelsForManagement, room.hotelId]);

    useEffect(() => {
        if (showBookingsModal) {
            bookingService.getByRoomId(room.id).then(({data}) => setBookings(data))
        }
    }, [showBookingsModal, trigger, room.id]);

    return (
        <>
            <tr>
                <th>{room.id}</th>
                <th>{hotelName ? hotelName : 'Hotel not found'}</th>
                <th>{room.roomNumber}</th>
                <th>{room.capacity}</th>
                <th>{room.price}&#8372;</th>
                <th>{room.enabled ? <Plus/> : <Minus/>}</th>
                <th>
                    <Button variant="primary" className="me-1" onClick={handleShowBookingsModal}>View Bookings</Button>
                    <Button variant="success" className="me-1" onClick={handleShowUpdateForm}>Update</Button>
                    <Button variant="warning" className="me-1" onClick={handleShowStateModal}>Change State</Button>
                    {roles.includes(ERole.ROLE_ADMIN) &&
                        <Button variant="danger" className="me-1" onClick={handleShowDeleteModal}>Delete</Button>
                    }
                </th>
            </tr>
            <RoomForm show={showUpdateForm} setShow={setShowUpdateForm} submit={update} room={room}/>
            {roles.includes(ERole.ROLE_ADMIN) &&
                <DeleteModal show={showDeleteModal} setShow={setShowDeleteModal} objName={room.roomNumber.toString()}
                             deleteAction={deleteRoom}/>
            }
            <StateModal show={showStateModal} setShow={setShowStateModal} objName={room.roomNumber.toString()}
                        objState={room.enabled} changeStateAction={changeState}/>
            <TableModal show={showBookingsModal} setShow={setShowBookingsModal}
                        title={`Bookings for ${room.roomNumber}`}>
                <BookingsTable bookings={bookings} manager/>
            </TableModal>
        </>
    );
};

export {
    RoomRow
}