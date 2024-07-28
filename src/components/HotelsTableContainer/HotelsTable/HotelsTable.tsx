import {Table} from "react-bootstrap";
import {FC} from "react";

import {HotelRow} from "../HotelRow";
import {IHotel} from "../../../interfaces";

interface IProp {
    hotels: IHotel[]
}

const HotelsTable: FC<IProp> = ({hotels}) => {
    return (
        <div style={{maxHeight: "340px", overflowY: "auto", overflowX: "auto"}}>
            <Table striped bordered hover>
                <thead style={{ position: "sticky", top: "0"}}>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Enabled</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {hotels && hotels.map(hotel => <HotelRow key={hotel.id} hotel={hotel}/>)}
                </tbody>
            </Table>
        </div>
    );
};

export {
    HotelsTable
}