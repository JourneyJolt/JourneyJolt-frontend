import {Button, Collapse, Form} from "react-bootstrap";
import {useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {cityActions} from "../../../redux";
import {ICity} from "../../../interfaces";
import {CitiesTable} from "../../CitiesTableContainer";
import {CityForm} from "../../CityForm";

const CitiesList = () => {
    const {
        cities: {citiesForManagement, trigger},
        countries: {countriesForManagement}
    } = useAppSelector(state => state);
    const [open, setOpen] = useState<boolean>(null)
    const [showCreateForm, setShowCreateForm] = useState<boolean>(null)
    const [selectedCountryId, setSelectedCountryId] = useState<string>('')
    const dispatch = useAppDispatch();

    const handleShowCreateForm = () => setShowCreateForm(true)

    const create = (city: ICity) => {
        dispatch(cityActions.create({city}))
    }

    const resetSelect = () => setSelectedCountryId('')

    useEffect(() => {
        if (selectedCountryId !== '') {
            dispatch(cityActions.getByCountryId({countryId: selectedCountryId}))
        } else {
            dispatch(cityActions.getAll())
        }

    }, [dispatch, trigger, selectedCountryId]);

    return (
        <div className="d-grid gap-2 mb-2">
            <Button variant="secondary" size="lg" onClick={() => setOpen(!open)}>Cities</Button>
            <Collapse in={open}>
                <div style={{overflowX: 'auto'}}>
                    <Form.Group className="my-2">
                        <Form.Label>By country</Form.Label>
                        <Form.Select value={selectedCountryId} onChange={e => setSelectedCountryId(e.target.value)}>
                            <option value="">All</option>
                            {countriesForManagement && countriesForManagement.map(country =>
                                <option value={country.id}>{country.name}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                    <Button className="my-2" size="sm" variant="outline-primary" onClick={resetSelect}>
                        Reset
                    </Button>
                    <CitiesTable cities={citiesForManagement}/>
                    <Button variant="success" onClick={handleShowCreateForm}>Add city</Button>
                    <CityForm show={showCreateForm} setShow={setShowCreateForm} submit={create}/>
                </div>
            </Collapse>
        </div>
    );
};

export {
    CitiesList
}