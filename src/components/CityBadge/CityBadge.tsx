import {FC, useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Button, Dropdown} from "react-bootstrap";

interface IProp {
    id?: string,
    name: string,

    partOfList?: boolean,
    navigateToHotelsByCity?: (cityId: string) => void
}

const CityBadge: FC<IProp> = ({id, name, partOfList, navigateToHotelsByCity}) => {
    const [active, setActive] = useState<boolean>(null)
    const [query] = useSearchParams();
    const navigate = useNavigate();

    const cityId = query.get('cityId');

    const navigateToHotels = () => {
        navigate(`/hotels?cityId=${id}`)
    }

    useEffect(() => {
        if (cityId === id) {
            setActive(true)
        } else {
            setActive(false)
        }
    }, [cityId, id]);

    return (
        <>
            {partOfList ?
                <Dropdown.Item onClick={() => navigateToHotelsByCity(id)} active={active}>{name}</Dropdown.Item>
                :
                <Button variant="secondary" onClick={navigateToHotels} className="mx-1">{name}</Button>
            }
        </>
    );
};

export {
    CityBadge
}