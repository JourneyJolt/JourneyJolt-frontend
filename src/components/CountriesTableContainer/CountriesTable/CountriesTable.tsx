import {Table} from "react-bootstrap";
import {FC} from "react";

import {CountryRow} from "../CountryRow";
import {ICountry} from "../../../interfaces";

interface IProp {
    countries: ICountry[]
}

const CountriesTable: FC<IProp> = ({countries}) => {
    return (
        <div style={{maxHeight: "340px", overflowY: "auto", overflowX: "auto"}}>
            <Table striped bordered hover>
                <thead style={{ position: "sticky", top: "0"}}>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Enabled</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {countries && countries.map(country => <CountryRow key={country.id} country={country}/>)}
                </tbody>
            </Table>
        </div>
    );
};

export {
    CountriesTable
}