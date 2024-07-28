import {Alert} from "react-bootstrap";
import {useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {alertActions} from "../../../redux";

const ErrorAlert = () => {
    const {error} = useAppSelector(state => state.alerts);
    const [show, setShow] = useState<boolean>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (error) {
            setShow(true)
            setTimeout(() => {
                setShow(false)
                setTimeout(() => {
                    dispatch(alertActions.setError(null))
                }, 500)
            }, 5000)
        }
    }, [dispatch, error]);

    return (
        <Alert className="position-fixed bottom-0 end-0 m-3" variant="danger" show={show}
               onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Error!</Alert.Heading>
            <p>
                {error}
            </p>
        </Alert>
    );
};

export {
    ErrorAlert
}