import {Modal} from "react-bootstrap";
import {Dispatch, FC, ReactNode, SetStateAction} from "react";

interface IProp {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>,
    title: string,
    children: ReactNode
}

const TableModal: FC<IProp> = ({show, setShow, title, children}) => {
    return (
        <Modal show={show} onHide={() => setShow(false)} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    );
};

export {
    TableModal
}