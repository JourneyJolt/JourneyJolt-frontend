import {FC, useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Card} from "react-bootstrap";

import {IHotel} from "../../../interfaces";
import css from './HotelCard.module.css'
import {useAppSelector} from "../../../hooks";
import {baseURL, urls} from "../../../constants";

interface IProp {
    hotel: IHotel
}

const HotelCard: FC<IProp> = ({hotel}) => {
    const {countries: {countries}, cities: {cities}} = useAppSelector(state => state);
    const [location, setLocation] = useState<string>(null)
    const navigate = useNavigate();
    const [query] = useSearchParams();

    const bookedSince = query.get('bookedSince');
    const bookedTo = query.get('bookedTo');
    const capacity = query.get('capacity');

    const {id, name, countryId, cityId, photosIds} = hotel;

    const navigateToHotelInfo = () => {
        let url = `${id}`;

        if (bookedSince && bookedTo) {
            if (capacity) {
                url += `?bookedSince=${bookedSince}&bookedTo=${bookedTo}&capacity=${capacity}`
            } else {
                url += `?bookedSince=${bookedSince}&bookedTo=${bookedTo}`
            }
        }

        navigate(url)
    }

    useEffect(() => {
        if (countries.length && cities.length) {
            const country = countries.find(country => country.id === countryId)
            const city = cities.find(city => city.id === cityId);
            if (country && city) {
                setLocation(`${city.name}, ${country.name}`)
            }
        }
    }, [countries, cities, countryId, cityId]);

    return (
        <Card border="primary" className={css.HotelCard} onClick={navigateToHotelInfo}>
            <div className="d-flex justify-content-center align-items-center bg-dark rounded-top"
                 style={{height: '50%'}}>
                <img
                    src={photosIds.length ? `${baseURL}${urls.photos.byId(photosIds[0])}` : 'https://placehold.co/550x250?text=Image+Not+Found'}
                    style={{maxHeight: '100%', maxWidth: '100%', display: 'block'}} alt={hotel.name}/>
            </div>
            <Card.Header>
                <Card.Title>{name}</Card.Title>
                <Card.Text style={{fontSize: 'smaller'}}>id: {id}</Card.Text>
            </Card.Header>
            <Card.Body>
                <Card.Subtitle>{location ? location : 'Not found'}</Card.Subtitle>
            </Card.Body>
        </Card>
    );
};

export {
    HotelCard
}