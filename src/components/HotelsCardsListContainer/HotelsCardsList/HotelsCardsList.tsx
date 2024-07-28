import {FC} from "react";

import {HotelCard} from "../HotelCard";
import {IHotel} from "../../../interfaces";

interface IProp {
    hotels: IHotel[]
}

const HotelsCardsList: FC<IProp> = ({hotels}) => {
    return (
        <div className="d-flex flex-wrap justify-content-around">
            {hotels && hotels.map(hotel => <HotelCard key={hotel.id} hotel={hotel}/>)}
        </div>
    );
};

export {
    HotelsCardsList
}