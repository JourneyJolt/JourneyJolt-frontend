import {Button, Collapse, Form} from "react-bootstrap";
import {useEffect, useState} from "react";

import {BookingsTable} from "../../BookingsTableContainer";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {bookingActions} from "../../../redux";

const BookingsList = () => {
    const {
        bookings: {bookingsForManagement, trigger},
        hotels: {hotelsForManagement},
        users: {users}
    } = useAppSelector(state => state);
    const [open, setOpen] = useState<boolean>(null)
    const [selectedHotelId, setSelectedHotelId] = useState<string>('')
    const [selectedUserId, setSelectedUserId] = useState<string>('')
    const dispatch = useAppDispatch();

    const resetSelects = () => {
        setSelectedHotelId('')
        setSelectedUserId('')
    }

    useEffect(() => {
        if (selectedUserId !== '' && selectedHotelId !== '') {
            dispatch(bookingActions.getByUserAndHotel({userId: selectedUserId, hotelId: selectedHotelId}))
        } else if (selectedUserId !== '') {
            dispatch(bookingActions.getByUserAndHotel({userId: selectedUserId}))
        } else if (selectedHotelId !== '') {
            dispatch(bookingActions.getByUserAndHotel({hotelId: selectedHotelId}))
        } else {
            dispatch(bookingActions.getAll())
        }
    }, [dispatch, trigger, selectedHotelId, selectedUserId]);

    return (
        <div className="d-grid gap-2 mb-2">
            <Button variant="secondary" size="lg" onClick={() => setOpen(!open)}>Bookings</Button>
            <Collapse in={open}>
                <div style={{overflowX: 'auto'}}>
                    <Form.Group className="my-2">
                        <Form.Label>By hotel</Form.Label>
                        <Form.Select value={selectedHotelId} onChange={e => setSelectedHotelId(e.target.value)}>
                            <option value="">All</option>
                            {hotelsForManagement && hotelsForManagement.map(hotel =>
                                <option value={hotel.id}>{hotel.name}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="my-2">
                        <Form.Label>By user</Form.Label>
                        <Form.Select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)}>
                            <option value="">All</option>
                            {users && users.map(user =>
                                <option value={user.id}>{user.username}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                    <Button className="my-2" size="sm" variant="outline-primary" onClick={resetSelects}>
                        Reset
                    </Button>
                    <BookingsTable bookings={bookingsForManagement} manager/>
                </div>
            </Collapse>
        </div>
    );
};

export {
    BookingsList
}