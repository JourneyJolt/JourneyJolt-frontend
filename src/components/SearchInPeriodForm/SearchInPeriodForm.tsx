import {Button, Collapse, Form} from "react-bootstrap";
import {FC, useState} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useSearchParams} from "react-router-dom";

import {ErrorTextBox} from "../ErrorTextBox";
import {IBooking} from "../../interfaces";
import {bookingValidator} from "../../validators";

interface IProp {
    viewObjects: (booking: IBooking) => void,
    resetObjects: () => void
}

const SearchInPeriodForm: FC<IProp> = ({viewObjects, resetObjects}) => {
    const {register, handleSubmit, setValue, formState: {errors, isValid}} = useForm<IBooking>({
        mode: 'onTouched',
        resolver: joiResolver(bookingValidator)
    });
    const [showFilter, setShowFilter] = useState<boolean>(null)
    const [query] = useSearchParams();

    const bookedSince = query.get('bookedSince');
    const bookedTo = query.get('bookedTo');
    const capacity = query.get('capacity');

    const handleForm = (booking: IBooking) => {
        viewObjects(booking)
    }

    const resetForm = () => {
        resetObjects()
        setValue('bookedSince', null)
        setValue('bookedTo', null)
        setValue('capacity', null)
    }

    return (
        <div className="d-grid gap-2 mt-2">
            <Button variant="secondary" size="sm" onClick={() => setShowFilter(!showFilter)}>Filter</Button>
            <Collapse in={showFilter}>
                <form onSubmit={handleSubmit(handleForm)}>
                    <Form.Group className="my-2">
                        <Form.Label>Since</Form.Label>
                        <Form.Control
                            type="date"
                            defaultValue={bookedSince ? bookedSince.substring(0, 10) : null}
                            {...register('bookedSince')}
                        />
                        {errors.bookedSince && <ErrorTextBox error={errors.bookedSince.message}/>}
                    </Form.Group>
                    <Form.Group className="my-2">
                        <Form.Label>To</Form.Label>
                        <Form.Control
                            type="date"
                            defaultValue={bookedTo ? bookedTo.substring(0, 10) : null}
                            {...register('bookedTo')}
                        />
                        {errors.bookedTo && <ErrorTextBox error={errors.bookedTo.message}/>}
                    </Form.Group>
                    <Form.Group className="my-2">
                        <Form.Label>Capacity</Form.Label>
                        <Form.Control
                            type="number"
                            defaultValue={capacity}
                            {...register('capacity')}
                        />
                        {errors.capacity && <ErrorTextBox error={errors.capacity.message}/>}
                    </Form.Group>
                    <Button type="submit" size="sm" variant="primary"
                            disabled={!isValid}>
                        Search
                    </Button>
                    <Button size="sm" variant="outline-primary" onClick={resetForm}>
                        Reset
                    </Button>
                </form>
            </Collapse>
        </div>
    );
};

export {
    SearchInPeriodForm
}