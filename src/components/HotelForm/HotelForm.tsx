import {Button, Form, Modal} from "react-bootstrap";
import {Dispatch, FC, SetStateAction, useCallback, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {ICity, IHotel} from "../../interfaces";
import {hotelValidator} from "../../validators";
import {ErrorTextBox} from "../ErrorTextBox";
import {useAppSelector} from "../../hooks";

interface IProp {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>,
    hotel?: IHotel,

    submit: (hotel: IHotel) => void
}

const HotelForm: FC<IProp> = ({show, setShow, submit, hotel}) => {
    const {countries: {countriesForManagement}, cities: {citiesForManagement}} = useAppSelector(state => state);
    const [selectedCityId, setSelectedCityId] = useState<string>(null)
    const [cities, setCities] = useState<ICity[]>([])
    const {reset, register, handleSubmit, setValue, formState: {errors, isValid}} = useForm<IHotel>({
        mode: 'onTouched',
        resolver: joiResolver(hotelValidator)
    });

    const handleClose = () => {
        setShow(false)
        reset()
    }

    const handleForm = (hotel: IHotel) => {
        submit(hotel)
        handleClose()
    }

    const setCitiesForSelect = useCallback((countryId: string, cityId?: string) => {
        const filter = citiesForManagement.filter(city => city.countryId === countryId);
        setCities(filter)
        const city = cityId ? cityId : filter[0].id
        setValue('cityId', city)
        setSelectedCityId(city)
    }, [citiesForManagement, setValue]);

    useEffect(() => {
        if (show) {
            if (hotel) {
                setValue('name', hotel.name)
                setValue('countryId', hotel.countryId)
                if (citiesForManagement.length) {
                    setCitiesForSelect(hotel.countryId, hotel.cityId)
                }
            } else if (countriesForManagement.length) {
                setValue('countryId', countriesForManagement[0].id)
                if (citiesForManagement.length) {
                    setCitiesForSelect(countriesForManagement[0].id)
                }
            }
        }
    }, [show, hotel, setValue, countriesForManagement, citiesForManagement, setCitiesForSelect]);

    return (
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={handleSubmit(handleForm)}>
                <Modal.Header closeButton>
                    <Modal.Title>{hotel ? `Update ${hotel.name}` : 'Add hotel'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="my-2">
                        <Form.Label>Hotel name</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={hotel ? hotel.name : null}
                            {...register('name')}
                        />
                        {errors.name && <ErrorTextBox error={errors.name.message}/>}
                    </Form.Group>
                    <Form.Group className="my-2">
                        <Form.Label>Country</Form.Label>
                        <Form.Select
                            defaultValue={hotel ? hotel.countryId : 0}
                            {...register('countryId', {onChange: e => setCitiesForSelect(e.target.value)})}
                        >
                            {countriesForManagement && countriesForManagement.map(country =>
                                <option value={country.id}>{country.name}</option>
                            )}
                        </Form.Select>
                        {errors.countryId && <ErrorTextBox error={errors.countryId.message}/>}
                    </Form.Group>
                    <Form.Group className="my-2">
                        <Form.Label>City</Form.Label>
                        <Form.Select
                            value={selectedCityId}
                            {...register('cityId', {onChange: e => setSelectedCityId(e.target.value)})}
                        >
                            {cities && cities.map(city =>
                                <option value={city.id}>{city.name}</option>
                            )}
                        </Form.Select>
                        {errors.cityId && <ErrorTextBox error={errors.cityId.message}/>}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="success" disabled={!isValid}>
                        {hotel ? 'Update' : 'Add'}
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export {
    HotelForm
}