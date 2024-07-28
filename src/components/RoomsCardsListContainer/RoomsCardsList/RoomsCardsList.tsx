import {FC} from "react";

import {IRoom} from "../../../interfaces";
import {RoomCard} from "../RoomCard";

interface IProp {
    rooms: IRoom[]
}

const RoomsCardsList: FC<IProp> = ({rooms}) => {
    return (
        <>
            <h6 className="my-1">Rooms:</h6>
            <div className="d-flex flex-wrap justify-content-around">
                {rooms && rooms.map(room => <RoomCard key={room.id} room={room}/>)}
            </div>
        </>
    );
};

export {
    RoomsCardsList
}