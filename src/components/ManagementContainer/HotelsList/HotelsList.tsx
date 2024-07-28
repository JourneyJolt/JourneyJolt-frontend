import {Button, Collapse, Form} from "react-bootstrap";
import {useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {hotelActions} from "../../../redux";
import {HotelsTable} from "../../HotelsTableContainer";
import {ICity, IHotel} from "../../../interfaces";
import {HotelForm} from "../../HotelForm";

const HotelsList = () => {
    const {
        hotels: {hotelsForManagement, trigger},
        countries: {countriesForManagement},
        cities: {citiesForManagement}
    } = useAppSelector(state => state);
    const [open, setOpen] = useState<boolean>(null)
    const [showCreateForm, setShowCreateForm] = useState<boolean>(null)
    const [selectedCountryId, setSelectedCountryId] = useState<string>('')
    const [selectedCityId, setSelectedCityId] = useState<string>('')
    const [cities, setCities] = useState<ICity[]>([])
    const dispatch = useAppDispatch();

    const handleShowCreateForm = () => setShowCreateForm(true)

    const create = (hotel: IHotel) => {
        dispatch(hotelActions.create({hotel}))
    }

    const setCitiesForSelect = (countryId: string) => {
        if (countryId !== '') {
            setCities(citiesForManagement.filter(city => city.countryId === countryId))
        } else {
            setCities(citiesForManagement)
        }
        setSelectedCityId('')
    }

    const setSelectedCountry = (countryId: string) => {
        setSelectedCountryId(countryId)
        setCitiesForSelect(countryId)
    }

    const resetSelects = () => {
        setSelectedCountry('')
    }

    useEffect(() => {
        setCities(citiesForManagement)
    }, [citiesForManagement]);

    useEffect(() => {
        if (selectedCityId !== '') {
            dispatch(hotelActions.getByCityId({cityId: selectedCityId}))
        } else if (selectedCountryId !== '') {
            dispatch(hotelActions.getByCountryId({countryId: selectedCountryId}))
        } else {
            dispatch(hotelActions.getAll())
        }
    }, [dispatch, trigger, selectedCityId, selectedCountryId]);

    return (
        <div className="d-grid gap-2 mb-2">
            <Button variant="secondary" size="lg" onClick={() => setOpen(!open)}>Hotels</Button>
            <Collapse in={open}>
                <div style={{overflowX: 'auto'}}>
                    <Form.Group className="my-2">
                        <Form.Label>By country</Form.Label>
                        <Form.Select value={selectedCountryId} onChange={e => setSelectedCountry(e.target.value)}>
                            <option value="">All</option>
                            {countriesForManagement && countriesForManagement.map(country =>
                                <option value={country.id}>{country.name}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="my-2">
                        <Form.Label>By city</Form.Label>
                        <Form.Select value={selectedCityId} onChange={e => setSelectedCityId(e.target.value)}>
                            <option value="">All</option>
                            {cities && cities.map(city =>
                                <option value={city.id}>{city.name}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                    <Button className="my-2" size="sm" variant="outline-primary" onClick={resetSelects}>
                        Reset
                    </Button>
                    <HotelsTable hotels={hotelsForManagement}/>
                    <Button variant="success" onClick={handleShowCreateForm}>Add hotel</Button>
                    <HotelForm show={showCreateForm} setShow={setShowCreateForm} submit={create}/>
                </div>
            </Collapse>
        </div>
    );
};

export {
    HotelsList
}