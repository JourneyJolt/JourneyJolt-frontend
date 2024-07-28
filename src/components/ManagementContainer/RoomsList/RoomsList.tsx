import {Button, Collapse, Form} from "react-bootstrap";
import {useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {roomActions} from "../../../redux";
import {RoomsTable} from "../../RoomsTableContainer";
import {IRoom} from "../../../interfaces";
import {RoomForm} from "../../RoomForm";

const RoomsList = () => {
    const {
        rooms: {roomsForManagement, trigger},
        hotels: {hotelsForManagement}
    } = useAppSelector(state => state);
    const [open, setOpen] = useState<boolean>(null)
    const [showCreateForm, setShowCreateForm] = useState<boolean>(null)
    const [selectedHotelId, setSelectedHotelId] = useState<string>('')
    const dispatch = useAppDispatch();

    const handleShowCreateForm = () => setShowCreateForm(true)

    const create = (room: IRoom) => {
        dispatch(roomActions.create({room}))
    }

    const resetSelect = () => setSelectedHotelId('')

    useEffect(() => {
        if (selectedHotelId !== '') {
            dispatch(roomActions.getByHotelId({hotelId: selectedHotelId}))
        } else {
            dispatch(roomActions.getAll())
        }
    }, [dispatch, trigger, selectedHotelId]);

    return (
        <div className="d-grid gap-2 mb-2">
            <Button variant="secondary" size="lg" onClick={() => setOpen(!open)}>Rooms</Button>
            <Collapse in={open}>
                <div style={{overflowX: 'auto'}}>
                    <Form.Group className="my-2">
                        <Form.Label>By hotel</Form.Label>
                        <Form.Select onChange={e => setSelectedHotelId(e.target.value)}>
                            <option value="" selected>All</option>
                            {hotelsForManagement && hotelsForManagement.map(hotel =>
                                <option value={hotel.id}>{hotel.name}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                    <Button className="my-2" size="sm" variant="outline-primary" onClick={resetSelect}>
                        Reset
                    </Button>
                    <RoomsTable rooms={roomsForManagement}/>
                    <Button variant="success" onClick={handleShowCreateForm}>Add room</Button>
                    <RoomForm show={showCreateForm} setShow={setShowCreateForm} submit={create}/>
                </div>
            </Collapse>
        </div>
    );
};

export {
    RoomsList
}