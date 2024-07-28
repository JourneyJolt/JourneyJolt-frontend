import {Button} from "react-bootstrap";
import {FC, useEffect, useState} from "react";
import {Minus, Plus} from "@rsuite/icons";

import {IBooking, IUser} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {userActions} from "../../../redux";
import {UserRoleForm} from "../../UserRoleForm";
import {bookingService} from "../../../services";
import {TableModal} from "../../TableModal";
import {BookingsTable} from "../../BookingsTableContainer";
import {ERole} from "../../../enums";
import {StateModal} from "../../StateModal";

interface IProp {
    user: IUser
}

const UserRow: FC<IProp> = ({user}) => {
    const {bookings: {trigger}, auth: {user: {roles}}} = useAppSelector(state => state);
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(null)
    const [showBookingsModal, setShowBookingsModal] = useState<boolean>(null)
    const [showStateModal, setShowStateModal] = useState<boolean>(null)
    const [bookings, setBookings] = useState<IBooking[]>([])
    const dispatch = useAppDispatch();

    const handleShowUpdateForm = () => setShowUpdateForm(true)
    const handleShowBookingsModal = () => setShowBookingsModal(true)
    const handleShowStateModal = () => setShowStateModal(true)

    const update = (updatedUser: IUser) => {
        dispatch(userActions.updateRoles({userId: user.id, user: updatedUser}))
    }

    const changeState = (state: string) => {
        if (state === "true") {
            dispatch(userActions.enableUser({userId: user.id}))
        } else {
            dispatch(userActions.disableUser({userId: user.id}))
        }
    }

    useEffect(() => {
        if (showBookingsModal) {
            bookingService.getByUserId(user.id).then(({data}) => setBookings(data))
        }
    }, [showBookingsModal, trigger, user.id]);

    return (
        <>
            <tr>
                <th>{user.id}</th>
                <th>{user.username}</th>
                <th>{user.email}</th>
                <th>{user.roles.toString()}</th>
                <th>{user.enabled ? <Plus/> : <Minus/>}</th>
                <th>
                    <Button variant="primary" className="me-1" onClick={handleShowBookingsModal}>View Bookings</Button>
                    {roles.includes(ERole.ROLE_ADMIN) &&
                        <>
                            <Button variant="success" className="me-1" onClick={handleShowUpdateForm}>Update
                                Roles</Button>
                            <Button variant="warning" className="me-1" onClick={handleShowStateModal}>Change
                                State</Button>
                        </>
                    }
                </th>
            </tr>
            <TableModal show={showBookingsModal} setShow={setShowBookingsModal} title={`Bookings of ${user.username}`}>
                <BookingsTable bookings={bookings} manager/>
            </TableModal>
            {
                roles.includes(ERole.ROLE_ADMIN) &&
                <>
                    <UserRoleForm show={showUpdateForm} setShow={setShowUpdateForm} user={user} submit={update}/>
                    <StateModal show={showStateModal} setShow={setShowStateModal} objName={user.username}
                                objState={user.enabled} changeStateAction={changeState}/>
                </>
            }
        </>
    )
        ;
};

export {
    UserRow
}