import {Button, Form, Modal} from "react-bootstrap";
import {Dispatch, FC, SetStateAction, useEffect} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {ICity} from "../../interfaces";
import {useAppSelector} from "../../hooks";
import {cityValidator} from "../../validators";
import {ErrorTextBox} from "../ErrorTextBox";

interface IProp {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>,
    city?: ICity,

    submit: (city: ICity) => void
}

const CityForm: FC<IProp> = ({show, setShow, submit, city}) => {
    const {countriesForManagement} = useAppSelector(state => state.countries);
    const {reset, register, handleSubmit, setValue, formState: {errors, isValid}} = useForm<ICity>({
        mode: 'onTouched',
        resolver: joiResolver(cityValidator)
    });

    const handleClose = () => {
        setShow(false)
        reset()
    }

    const handleForm = (city: ICity) => {
        submit(city)
        handleClose()
    }

    useEffect(() => {
        if (city) {
            setValue('name', city.name)
            if (countriesForManagement.length) {
                setValue('countryId', city.countryId ? city.countryId : countriesForManagement[0].id)
            }
        }
    }, [setValue, city, countriesForManagement]);

    return (
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={handleSubmit(handleForm)}>
                <Modal.Header closeButton>
                    <Modal.Title>{city ? `Update ${city.name}` : 'Add city'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="my-2">
                        <Form.Label>City name</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={city ? city.name : null}
                            {...register('name')}
                        />
                        {errors.name && <ErrorTextBox error={errors.name.message}/>}
                    </Form.Group>
                    <Form.Group className="my-2">
                        <Form.Label>Country</Form.Label>
                        <Form.Select
                            defaultValue={city ? city.countryId : 0}
                            {...register('countryId')}
                        >
                            {countriesForManagement && countriesForManagement.map(country =>
                                <option value={country.id}>{country.name}</option>
                            )}
                        </Form.Select>
                        {errors.countryId && <ErrorTextBox error={errors.countryId.message}/>}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="success" disabled={!isValid}>
                        {city ? 'Update' : 'Add'}
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export {
    CityForm
}