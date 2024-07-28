import {Button, Form} from "react-bootstrap";
import {FC} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useNavigate} from "react-router-dom";

import {ErrorTextBox} from "../../ErrorTextBox";
import {SignInRequest} from "../../../interfaces";
import {signInValidator} from "../../../validators";
import {useAppDispatch} from "../../../hooks";
import {authActions} from "../../../redux";

interface IProp {
    handleToggle: () => void
}

const SignInForm: FC<IProp> = ({handleToggle}) => {
    const {reset, register, handleSubmit, formState: {errors, isValid}} = useForm<SignInRequest>({
        mode: 'onTouched',
        resolver: joiResolver(signInValidator)
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const signIn = (user: SignInRequest) => {
        dispatch(authActions.signIn({user}))
            .unwrap()
            .then(() => {
                reset();
                navigate('/')
            })
            .catch(() => {
                reset();
            })
    }

    return (
        <form onSubmit={handleSubmit(signIn)}>
            <h1 className="m-3 text-center">SignIn</h1>
            <Form.Group className="my-2">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="enter username"
                    {...register('username')}
                />
                {errors.username && <ErrorTextBox error={errors.username.message}/>}
            </Form.Group>
            <Form.Group className="my-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="enter password"
                    {...register('password')}
                />
                {errors.password && <ErrorTextBox error={errors.password.message}/>}
            </Form.Group>
            <div className="mt-3 text-center">
                <Button type="submit" className="btn btn-block" disabled={!isValid}>
                    SignIn
                </Button>
                <p className="mt-3">
                    Don't have an account? {" "}
                    <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={handleToggle}
                    >
                        SignUp
                    </Button>
                </p>
            </div>
        </form>
    );
};

export {
    SignInForm
}