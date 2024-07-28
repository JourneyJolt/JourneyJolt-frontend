import {useParams} from "react-router-dom";

import {HotelInfo} from "../../components";

const HotelPage = () => {
    const {hotelId} = useParams<{ hotelId: string }>();

    return (
        <HotelInfo hotelId={hotelId}/>
    );
};

export {
    HotelPage
}