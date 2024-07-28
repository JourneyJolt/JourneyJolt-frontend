import {Button} from "react-bootstrap";
import {FC, useEffect, useState} from "react";
import {Minus, Plus} from "@rsuite/icons";

import {ICity, IHotel} from "../../../interfaces";
import {CityForm} from "../../CityForm";
import {DeleteModal} from "../../DeleteModal";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {cityActions} from "../../../redux";
import {hotelService} from "../../../services";
import {HotelsTable} from "../../HotelsTableContainer";
import {TableModal} from "../../TableModal";
import {ERole} from "../../../enums";
import {StateModal} from "../../StateModal";

interface IProp {
    city: ICity
}

const CityRow: FC<IProp> = ({city}) => {
    const {
        countries: {countriesForManagement},
        hotels: {trigger},
        auth: {user: {roles}}
    } = useAppSelector(state => state);
    const [countryName, setCountryName] = useState<string>(null)
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(null)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(null)
    const [showHotelsModal, setShowHotelsModal] = useState<boolean>(null)
    const [showStateModal, setShowStateModal] = useState<boolean>(null)
    const [hotels, setHotels] = useState<IHotel[]>([])
    const dispatch = useAppDispatch();

    const handleShowUpdateForm = () => setShowUpdateForm(true)
    const handleShowDeleteModal = () => setShowDeleteModal(true)
    const handleShowHotelsModal = () => setShowHotelsModal(true)
    const handleShowStateModal = () => setShowStateModal(true)

    const update = (updatedCity: ICity) => {
        dispatch(cityActions.update({cityId: city.id, city: updatedCity}))
    }

    const deleteCity = () => {
        dispatch(cityActions.deleteCity({cityId: city.id}))
    }

    const changeState = (state: string) => {
        if (state === "true") {
            dispatch(cityActions.enableCity({cityId: city.id}))
        } else {
            dispatch(cityActions.disableCity({cityId: city.id}))
        }
    }

    useEffect(() => {
        if (countriesForManagement.length) {
            const country = countriesForManagement.find(country => country.id === city.countryId);
            if (country) {
                setCountryName(country.name)
            }
        }
    }, [countriesForManagement, city.countryId]);

    useEffect(() => {
        if (showHotelsModal) {
            hotelService.getByCityId(city.id).then(({data}) => setHotels(data))
        }
    }, [showHotelsModal, trigger, city.id]);

    return (
        <>
            <tr>
                <th>{city.id}</th>
                <th>{city.name}</th>
                <th>{countryName ? countryName : 'Country not found'}</th>
                <th>{city.enabled ? <Plus/> : <Minus/>}</th>
                <th>
                    <Button variant="primary" className="me-1" onClick={handleShowHotelsModal}>View Hotels</Button>
                    <Button variant="success" className="me-1" onClick={handleShowUpdateForm}>Update</Button>
                    <Button variant="warning" className="me-1" onClick={handleShowStateModal}>Change State</Button>
                    {roles.includes(ERole.ROLE_ADMIN) &&
                        <Button variant="danger" className="me-1" onClick={handleShowDeleteModal}>Delete</Button>
                    }
                </th>
            </tr>
            <CityForm show={showUpdateForm} setShow={setShowUpdateForm} submit={update} city={city}/>
            {roles.includes(ERole.ROLE_ADMIN) &&
                <DeleteModal show={showDeleteModal} setShow={setShowDeleteModal} objName={city.name}
                         deleteAction={deleteCity}/>
            }
            <StateModal show={showStateModal} setShow={setShowStateModal} objName={city.name}
                        objState={city.enabled} changeStateAction={changeState}/>
            <TableModal show={showHotelsModal} setShow={setShowHotelsModal} title={`Hotels in ${city.name}`}>
                <HotelsTable hotels={hotels}/>
            </TableModal>
        </>
    );
};

export {
    CityRow
}