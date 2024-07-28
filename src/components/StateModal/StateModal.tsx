import {Button, Form, Modal} from "react-bootstrap";
import {Dispatch, FC, SetStateAction, useEffect, useState} from "react";

interface IProp {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>,
    objName: string,
    objState: boolean,

    changeStateAction: (state: string) => void
}

const StateModal: FC<IProp> = ({show, setShow, objName, objState, changeStateAction}) => {
    const [state, setState] = useState<string>(null)

    const handleClose = () => setShow(false)

    const handleAction = () => {
        changeStateAction(state)
        handleClose()
    }

    useEffect(() => {
        if (show) {
            setState(objState.toString())
        }
    }, [show, objState]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Change state of {objName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="my-2">
                    <Form.Select value={state} onChange={e => setState(e.target.value)}>
                        <option value="true">Enable</option>
                        <option value="false">Disable</option>
                    </Form.Select>
                </Form.Group>
                <p>NOTE: if you disable {objName}, all child objects will also be disabled and bookings will be
                    canceled</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleAction}>Update</Button>
            </Modal.Footer>
        </Modal>
    );
};

export {
    StateModal
}