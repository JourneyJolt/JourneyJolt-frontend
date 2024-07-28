import {Carousel} from "react-bootstrap";
import {FC, useEffect} from "react";
import {useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {cityActions, countryActions, hotelActions, roomActions} from "../../redux";
import {CountryBadge} from "../CountriesBadgesListContainer";
import {RoomsCardsList} from "../RoomsCardsListContainer";
import {IBooking} from "../../interfaces";
import {SearchInPeriodForm} from "../SearchInPeriodForm";
import {baseURL, urls} from "../../constants";
import {CityBadge} from "../CityBadge";

interface IProp {
    hotelId: string
}

const HotelInfo: FC<IProp> = ({hotelId}) => {
    const {hotels: {hotel}, rooms: {rooms}, countries: {country}, cities: {city}} =
        useAppSelector(state => state);
    const [query, setQuery] = useSearchParams();
    const dispatch = useAppDispatch();

    const bookedSince = query.get('bookedSince');
    const bookedTo = query.get('bookedTo');
    const capacity = query.get('capacity');

    const viewRoomsInPeriod = (booking: IBooking) => {
        setQuery(prev => {
            prev.set('bookedSince', booking.bookedSince.toISOString())
            prev.set('bookedTo', booking.bookedTo.toISOString())
            prev.delete('capacity')
            return prev;
        })

        if (booking.capacity !== "") {
            setQuery(prev => {
                prev.set('capacity', booking.capacity)
                return prev;
            })
        }
    }

    const resetRooms = () => {
        setQuery(prev => {
            prev.delete('bookedSince')
            prev.delete('bookedTo')
            prev.delete('capacity')
            return prev;
        })
    }

    useEffect(() => {
        dispatch(hotelActions.getById({hotelId}));
    }, [dispatch, hotelId]);

    useEffect(() => {
        if (hotel) {
            dispatch(countryActions.getById({countryId: hotel.countryId}))
            dispatch(cityActions.getById({cityId: hotel.cityId}))
        }
    }, [dispatch, hotel]);

    useEffect(() => {
        if (bookedSince && bookedTo) {
            dispatch(roomActions.getAllAvailableForPeriod({hotelId, bookedSince, bookedTo, capacity}));
        } else {
            dispatch(roomActions.getEnabledByHotelId({hotelId}));
        }
    }, [dispatch, hotelId, bookedSince, bookedTo, capacity]);

    return (
        <>
            {hotel &&
                <div>
                    <div className="d-flex justify-content-between flex-wrap-reverse">
                        <div>
                            <h4>{hotel.name}</h4>
                            <h6>id: {hotel.id}</h6>
                            {country && <CountryBadge id={country.id} name={country.name}/>}
                            {city && <CityBadge id={city.id} name={city.name}/>}
                        </div>
                        {hotel.photosIds.length > 0 &&
                            <Carousel className="col-12 col-md-7 my-2 my-md-0 bg-dark z-0">
                                {hotel.photosIds.map(photoId =>
                                    <Carousel.Item interval={10000}>
                                        <div className="d-flex justify-content-center" style={{height: '20rem'}}>
                                            <img src={`${baseURL}${urls.photos.byId(photoId)}`} alt={hotel.name}
                                                 style={{maxWidth: '100%', maxHeight: '100%', display: 'block'}}/>
                                        </div>
                                    </Carousel.Item>
                                )}
                            </Carousel>
                        }
                    </div>
                    <SearchInPeriodForm viewObjects={viewRoomsInPeriod} resetObjects={resetRooms}/>
                    {rooms.length > 0 && <RoomsCardsList rooms={rooms}/>}
                </div>
            }
        </>
    );
};

export {
    HotelInfo
}