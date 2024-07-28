import {Button, Form, Modal, ModalBody} from "react-bootstrap";
import {Dispatch, FC, SetStateAction, useEffect} from "react";
import {FieldValues, useForm} from "react-hook-form";

import {IUser} from "../../interfaces";
import {ERole} from "../../enums";

interface IProp {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
    user: IUser,

    submit: (user: IUser) => void
}

const UserRoleForm: FC<IProp> = ({show, setShow, user, submit}) => {
    const {register, handleSubmit, setValue} = useForm();

    const handleClose = () => setShow(false)

    const handleForm = ({roleSwitch}: FieldValues) => {
        const updatedUser = {...user}

        if (roleSwitch) {
            updatedUser.roles = [ERole.ROLE_USER, ERole.ROLE_MANAGER]
        } else {
            updatedUser.roles = [ERole.ROLE_USER]
        }
        submit(updatedUser)
        handleClose()
    }

    useEffect(() => {
        if (user) {
            setValue('roleSwitch', !!user.roles.find(role => role === ERole.ROLE_MANAGER))
        }
    }, [setValue, user]);

    return (
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={handleSubmit(handleForm)}>
                <Modal.Header closeButton>
                    <Modal.Title>{user && `Update ${user.username} roles`}</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <Form.Group className="my-2 d-flex">
                        <Form.Label className="me-1">Manager</Form.Label>
                        <Form.Check
                            type="switch"
                            defaultChecked={!!user.roles.find(role => role === ERole.ROLE_MANAGER)}
                            {...register('roleSwitch')}
                        />
                    </Form.Group>
                </ModalBody>
                <Modal.Footer>
                    <Button type="submit" variant="success">
                        Update
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export {
    UserRoleForm
}