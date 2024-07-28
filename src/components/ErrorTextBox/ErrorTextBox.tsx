import {FC} from "react";

interface IProp {
    error: string
}

const ErrorTextBox: FC<IProp> = ({error}) => {
    return (
        <div className="text-danger">
            {error}
        </div>
    );
};

export {
    ErrorTextBox
}