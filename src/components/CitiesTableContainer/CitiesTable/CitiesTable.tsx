import {Table} from "react-bootstrap";
import {FC} from "react";

import {ICity} from "../../../interfaces";
import {CityRow} from "../CityRow";

interface IProp {
    cities: ICity[]
}

const CitiesTable: FC<IProp> = ({cities}) => {
    return (
        <div style={{maxHeight: "340px", overflowY: "auto", overflowX: "auto"}}>
            <Table striped bordered hover>
                <thead style={{ position: "sticky", top: "0"}}>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Enabled</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {cities && cities.map(city => <CityRow key={city.id} city={city}/>)}
                </tbody>
            </Table>
        </div>
    );
};

export {
    CitiesTable
}