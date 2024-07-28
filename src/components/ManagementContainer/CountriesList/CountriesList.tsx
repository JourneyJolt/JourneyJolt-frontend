import {Button, Collapse} from "react-bootstrap";
import {useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {countryActions} from "../../../redux";
import {CountriesTable} from "../../CountriesTableContainer";
import {ICountry} from "../../../interfaces";
import {CountryForm} from "../../CountryForm";

const CountriesList = () => {
    const {countriesForManagement, trigger} = useAppSelector(state => state.countries);
    const [open, setOpen] = useState<boolean>(null)
    const [showCreateForm, setShowCreateForm] = useState<boolean>(null)
    const dispatch = useAppDispatch();

    const handleShowCreateForm = () => setShowCreateForm(true)

    const create = (country: ICountry) => {
        dispatch(countryActions.create({country}))
    }

    useEffect(() => {
        dispatch(countryActions.getAll())
    }, [dispatch, trigger]);

    return (
        <div className="d-grid gap-2 mb-2">
            <Button variant="secondary" size="lg" onClick={() => setOpen(!open)}>Countries</Button>
            <Collapse in={open}>
                <div style={{overflowX: 'auto'}}>
                    <CountriesTable countries={countriesForManagement}/>
                    <Button variant="success" onClick={handleShowCreateForm}>Add country</Button>
                    <CountryForm show={showCreateForm} setShow={setShowCreateForm} submit={create}/>
                </div>
            </Collapse>
        </div>
    );
};

export {
    CountriesList
}