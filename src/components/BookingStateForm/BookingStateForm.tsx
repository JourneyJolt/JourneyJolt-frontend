import {Dispatch, FC, SetStateAction, useEffect} from "react";

import {IBooking} from "../../interfaces";
import {Button, Form, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {EBookingState} from "../../enums";

interface IProp {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
    booking: IBooking,

    submit: (booking: IBooking) => void
}

const BookingStateForm: FC<IProp> = ({show, setShow, booking, submit}) => {
    const {reset, register, handleSubmit, setValue, formState: {isValid}} = useForm<IBooking>();

    const handleForm = (booking: IBooking) => {
        submit(booking)
        handleClose()
    }

    const handleClose = () => {
        setShow(false)
        reset()
    }

    useEffect(() => {
        if (booking) {
            setValue('state', booking.state)
        }
    }, [setValue, booking]);

    return (
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={handleSubmit(handleForm)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update state of booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="my-2">
                        <Form.Select defaultValue={booking ? booking.state : 0} {...register('state')}>
                            {(Object.keys(EBookingState) as Array<keyof typeof EBookingState>).map(key =>
                                <option value={key}>{key}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="success" disabled={!isValid}>Update</Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export {
    BookingStateForm
}