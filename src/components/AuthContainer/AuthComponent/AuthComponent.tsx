import {Card, Col} from "react-bootstrap";
import {useState} from "react";

import {SignInForm} from "../SignInForm";
import {SignUpForm} from "../SignUpForm";

const AuthComponent = () => {
    const [isLogin, setIsLogin] = useState(true)

    const handleToggle = () => {
        setIsLogin((prevState) => !prevState)
    };

    return (
        <div className="d-flex justify-content-center">
            <Col xs={10} md={4}>
                <Card className="my-5 px-5 py-3">
                    {
                        isLogin ?
                            <SignInForm handleToggle={handleToggle}/>
                            :
                            <SignUpForm handleToggle={handleToggle}/>
                    }
                </Card>
            </Col>
        </div>
    );
};

export {
    AuthComponent
}