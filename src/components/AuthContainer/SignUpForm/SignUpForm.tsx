import {Button, Form} from "react-bootstrap";
import {FC} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {ErrorTextBox} from "../../ErrorTextBox";
import {SignUpRequest} from "../../../interfaces";
import {signUpValidator} from "../../../validators";
import {authActions} from "../../../redux";
import {useAppDispatch} from "../../../hooks";

interface IProp {
    handleToggle: () => void,
}

const SignUpForm: FC<IProp> = ({handleToggle}) => {
    const {reset, register, handleSubmit, formState: {errors, isValid}} = useForm<SignUpRequest>({
        mode: 'onTouched',
        resolver: joiResolver(signUpValidator)
    });
    const dispatch = useAppDispatch();

    const signUp = (user: SignUpRequest) => {
        dispatch(authActions.signUp({user}))
            .unwrap()
            .then(() => {
                reset();
                handleToggle();
            })
            .catch(() => {
                reset();
            })
    }

    return (
        <form onSubmit={handleSubmit(signUp)}>
            <h1 className="m-3 text-center">SignUp</h1>
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
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="enter email"
                    {...register('email')}
                />
                {errors.email && <ErrorTextBox error={errors.email.message}/>}
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
            <Form.Group className="my-2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="enter password again"
                    {...register('re_password')}
                />
                {errors.re_password && <ErrorTextBox error={errors.re_password.message}/>}
            </Form.Group>
            <div className="mt-3 text-center">
                <Button type="submit" className="btn btn-block" disabled={!isValid}>
                    SignUp
                </Button>
                <p className="mt-3">
                    Already have an account? {" "}
                    <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={handleToggle}
                    >
                        SignIn
                    </Button>
                </p>
            </div>
        </form>
    );
};

export {
    SignUpForm
}