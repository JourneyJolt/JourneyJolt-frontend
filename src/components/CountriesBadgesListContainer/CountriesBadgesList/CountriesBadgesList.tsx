import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {cityActions, countryActions} from "../../../redux";
import {CountryBadge} from "../CountryBadge";

const CountriesBadgesList = () => {
    const {countries: {countries}, cities: {cities}} = useAppSelector(state => state);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(countryActions.getAllEnabled())
        dispatch(cityActions.getAllEnabled())
    }, [dispatch])

    return (
        <div className="d-flex flex-wrap justify-content-center">
            {countries.length > 0 && <CountryBadge name={'All'} partOfList/>}
            {countries && countries.map(country =>
                <CountryBadge key={country.id} id={country.id} name={country.name}
                              cities={cities.filter(city => city.countryId === country.id)} partOfList/>
            )}
        </div>
    );
};

export {
    CountriesBadgesList
}