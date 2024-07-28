import {Button, Form, Modal} from "react-bootstrap";
import {Dispatch, FC, SetStateAction, useEffect} from "react"
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {IRoom} from "../../interfaces";
import {useAppSelector} from "../../hooks";
import {roomValidator} from "../../validators";
import {ErrorTextBox} from "../ErrorTextBox";

interface IProp {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>,
    room?: IRoom,

    submit: (room: IRoom) => void
}

const RoomForm: FC<IProp> = ({show, setShow, submit, room}) => {
    const {hotelsForManagement} = useAppSelector(state => state.hotels);
    const {reset, register, handleSubmit, setValue, formState: {errors, isValid}} = useForm<IRoom>({
        mode: 'onTouched',
        resolver: joiResolver(roomValidator)
    });

    const handleClose = () => {
        setShow(false)
        reset()
    }

    const handleForm = (room: IRoom) => {
        submit(room)
        handleClose()
    }

    useEffect(() => {
        if (room) {
            setValue('roomNumber', room.roomNumber)
            setValue('capacity', room.capacity)
            setValue('price', room.price)
            if (hotelsForManagement.length) {
                setValue('hotelId', room.hotelId ? room.hotelId : hotelsForManagement[0].id)
            }
        }
    }, [setValue, room, hotelsForManagement]);

    return (
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={handleSubmit(handleForm)}>
                <Modal.Header closeButton>
                    <Modal.Title>{room ? `Update ${room.roomNumber}` : 'Add room'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="my-2">
                        <Form.Label>Room number</Form.Label>
                        <Form.Control
                            type="number"
                            defaultValue={room ? room.roomNumber : 1}
                            {...register('roomNumber')}
                        />
                        {errors.roomNumber && <ErrorTextBox error={errors.roomNumber.message}/>}
                    </Form.Group>
                    <Form.Group className="my-2">
                        <Form.Label>Capacity</Form.Label>
                        <Form.Control
                            type="number"
                            defaultValue={room ? room.capacity : 1}
                            {...register('capacity')}
                        />
                        {errors.capacity && <ErrorTextBox error={errors.capacity.message}/>}
                    </Form.Group>
                    <Form.Group className="my-2">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            defaultValue={room ? room.price : 100}
                            {...register('price')}
                        />
                        {errors.price && <ErrorTextBox error={errors.price.message}/>}
                    </Form.Group>
                    <Form.Group className="my-2">
                        <Form.Label>Hotel</Form.Label>
                        <Form.Select
                            defaultValue={room ? room.hotelId : 0}
                            {...register('hotelId')}
                        >
                            {hotelsForManagement && hotelsForManagement.map(hotel =>
                                <option value={hotel.id}>{hotel.name}</option>
                            )}
                        </Form.Select>
                        {errors.hotelId && <ErrorTextBox error={errors.hotelId.message}/>}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="success" disabled={!isValid}>
                        {room ? 'Update' : 'Add'}
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export {
    RoomForm
}