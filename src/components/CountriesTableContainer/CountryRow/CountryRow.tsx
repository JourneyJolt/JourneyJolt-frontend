import {Button} from "react-bootstrap";
import {FC, useEffect, useState} from "react";
import {Minus, Plus} from "@rsuite/icons";

import {ICity, ICountry, IHotel} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {countryActions} from "../../../redux";
import {CountryForm} from "../../CountryForm";
import {DeleteModal} from "../../DeleteModal";
import {cityService, hotelService} from "../../../services";
import {TableModal} from "../../TableModal";
import {HotelsTable} from "../../HotelsTableContainer";
import {CitiesTable} from "../../CitiesTableContainer";
import {ERole} from "../../../enums";
import {StateModal} from "../../StateModal";

interface IProp {
    country: ICountry
}

const CountryRow: FC<IProp> = ({country}) => {
    const {
        cities: {trigger: citiesTrigger},
        hotels: {trigger: hotelsTrigger},
        auth: {user: {roles}}
    } = useAppSelector(state => state);
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(null)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(null)
    const [showCitiesModal, setShowCitiesModal] = useState<boolean>(null)
    const [showHotelsModal, setShowHotelsModal] = useState<boolean>(null)
    const [showStateModal, setShowStateModal] = useState<boolean>(null)
    const [cities, setCities] = useState<ICity[]>([])
    const [hotels, setHotels] = useState<IHotel[]>([])
    const dispatch = useAppDispatch();

    const handleShowUpdateForm = () => setShowUpdateForm(true)
    const handleShowDeleteModal = () => setShowDeleteModal(true)
    const handleShowCitiesModal = () => setShowCitiesModal(true)
    const handleShowHotelsModal = () => setShowHotelsModal(true)
    const handleShowStateModal = () => setShowStateModal(true)

    const update = (updatedCountry: ICountry) => {
        dispatch(countryActions.update({countryId: country.id, country: updatedCountry}))
    }

    const deleteCountry = () => {
        dispatch(countryActions.deleteCountry({countryId: country.id}))
    }

    const changeState = (state: string) => {
        if (state === "true") {
            dispatch(countryActions.enableCountry({countryId: country.id}))
        } else {
            dispatch(countryActions.disableCountry({countryId: country.id}))
        }
    }

    useEffect(() => {
        if (showCitiesModal) {
            cityService.getByCountryId(country.id).then(({data}) => setCities(data))
        }
    }, [showCitiesModal, citiesTrigger, country.id]);

    useEffect(() => {
        if (showHotelsModal) {
            hotelService.getByCountryId(country.id).then(({data}) => setHotels(data))
        }
    }, [showHotelsModal, hotelsTrigger, country.id]);

    return (
        <>
            <tr>
                <th>{country.id}</th>
                <th>{country.name}</th>
                <th>{country.enabled ? <Plus/> : <Minus/>}</th>
                <th>
                    <Button variant="primary" className="me-1" onClick={handleShowCitiesModal}>View Cities</Button>
                    <Button variant="primary" className="me-1" onClick={handleShowHotelsModal}>View Hotels</Button>
                    <Button variant="success" className="me-1" onClick={handleShowUpdateForm}>Update</Button>
                    <Button variant="warning" className="me-1" onClick={handleShowStateModal}>Change State</Button>
                    {roles.includes(ERole.ROLE_ADMIN) &&
                        <Button variant="danger" className="me-1" onClick={handleShowDeleteModal}>Delete</Button>
                    }
                </th>
            </tr>
            <CountryForm show={showUpdateForm} setShow={setShowUpdateForm} submit={update} country={country}/>
            {roles.includes(ERole.ROLE_ADMIN) &&
                <DeleteModal show={showDeleteModal} setShow={setShowDeleteModal} objName={country.name}
                             deleteAction={deleteCountry}/>
            }
            <StateModal show={showStateModal} setShow={setShowStateModal} objName={country.name}
                        objState={country.enabled} changeStateAction={changeState}/>
            <TableModal show={showCitiesModal} setShow={setShowCitiesModal} title={`Cities in ${country.name}`}>
                <CitiesTable cities={cities}/>
            </TableModal>
            <TableModal show={showHotelsModal} setShow={setShowHotelsModal} title={`Hotels in ${country.name}`}>
                <HotelsTable hotels={hotels}/>
            </TableModal>
        </>
    );
};

export {
    CountryRow
}