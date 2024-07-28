import {FC, useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Button, SplitButton} from "react-bootstrap";
import {ICity} from "../../../interfaces";
import {CityBadge} from "../../CityBadge";

interface IProp {
    id?: string,
    name: string,

    partOfList?: boolean
    cities?: ICity[]
}

const CountryBadge: FC<IProp> = ({id, name, partOfList, cities}) => {
    const [active, setActive] = useState<boolean>(null)
    const [query, setQuery] = useSearchParams();
    const navigate = useNavigate();

    const countryId = query.get('countryId');
    const cityId = query.get('cityId');

    const navigateToHotelsByCountry = () => {
        if (partOfList) {
            if (id) {
                setQuery(prev => {
                    prev.delete('cityId')
                    prev.set('countryId', id)
                    return prev
                })
            } else {
                setQuery(prev => {
                    prev.delete('cityId')
                    prev.delete('countryId')
                    return prev
                })
            }
        } else {
            navigate(`/hotels?countryId=${id}`)
        }
    }

    const navigateToHotelsByCity = (cityId: string) => {
        setQuery(prev => {
            prev.delete('countryId')
            prev.set('cityId', cityId)
            return prev
        })
    }

    useEffect(() => {
        if ((countryId === null && id === undefined && cityId === null) || countryId === id) {
            setActive(true)
        } else {
            setActive(false)
        }
    }, [countryId, id, cityId]);

    return (
        <>
            {partOfList && cities?.length ?
                <SplitButton variant={active ? 'primary' : 'secondary'} title={name} onClick={navigateToHotelsByCountry}
                             drop="down-centered"
                             className="mx-1 z-1">
                    {cities.map(city =>
                        <CityBadge key={city.id} id={city.id} name={city.name}
                                   navigateToHotelsByCity={navigateToHotelsByCity} partOfList/>
                    )}
                </SplitButton>
                :
                <Button variant={active ? 'primary' : 'secondary'} onClick={navigateToHotelsByCountry}
                        className="mx-1">{name}</Button>
            }
        </>
    );
};

export {
    CountryBadge
}