import {IRes} from "../types";
import {ICountry} from "../interfaces";
import {axiosService} from "./axiosService";
import {urls} from "../constants";

const countryService = {
    getAll: (): IRes<ICountry[]> => axiosService.get(urls.countries.allCountries),
    getAllEnabled: (): IRes<ICountry[]> => axiosService.get(urls.countries.allEnabledCountries),
    getById: (countryId: string): IRes<ICountry> => axiosService.get(urls.countries.byId(countryId)),
    create: (country: ICountry): IRes<ICountry> => axiosService.post(urls.countries.create, country),
    update: (countryId: string, country: ICountry): IRes<ICountry> =>
        axiosService.patch(urls.countries.update(countryId), country),
    disableCountry: (countryId: string): IRes<void> => axiosService.patch(urls.countries.disableCountry(countryId)),
    enableCountry: (countryId: string): IRes<void> => axiosService.patch(urls.countries.enableCountry(countryId)),
    deleteCountry: (countryId: string): IRes<void> => axiosService.delete(urls.countries.deleteCountry(countryId))
}

export {
    countryService
}