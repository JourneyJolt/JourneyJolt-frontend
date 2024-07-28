import {Button, Collapse} from "react-bootstrap";
import {useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {userActions} from "../../../redux";
import {UsersTable} from "../../UsersTableContainer";

const UsersList = () => {
    const {users, trigger} = useAppSelector(state => state.users);
    const [open, setOpen] = useState<boolean>(null)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(userActions.getAll())
    }, [dispatch, trigger]);

    return (
        <div className="d-grid gap-2 mb-2">
            <Button variant="secondary" size="lg" onClick={() => setOpen(!open)}>Users</Button>
            <Collapse in={open}>
                <div style={{overflowX: 'auto'}}>
                    <UsersTable users={users}/>
                </div>
            </Collapse>
        </div>
    );
};

export {
    UsersList
}