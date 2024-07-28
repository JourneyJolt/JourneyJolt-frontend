import {IRes} from "../types";
import {ICity} from "../interfaces";
import {axiosService} from "./axiosService";
import {urls} from "../constants";

const cityService = {
    getAll: (): IRes<ICity[]> => axiosService.get(urls.cities.allCities),
    getAllEnabled: (): IRes<ICity[]> => axiosService.get(urls.cities.allEnabledCities),
    getByCountryId: (countryId: string): IRes<ICity[]> => axiosService.get(urls.cities.citiesByCountryId(countryId)),
    getEnabledByCountryId: (countryId: string): IRes<ICity[]> =>
        axiosService.get(urls.cities.enabledCitiesByCountryId(countryId)),
    getById: (cityId: string): IRes<ICity> => axiosService.get(urls.cities.byId(cityId)),
    create: (city: ICity): IRes<ICity> => axiosService.post(urls.cities.create, city),
    update: (cityId: string, city: ICity): IRes<ICity> => axiosService.patch(urls.cities.update(cityId), city),
    disableCity: (cityId: string): IRes<void> => axiosService.patch(urls.cities.disableCity(cityId)),
    enableCity: (cityId: string): IRes<void> => axiosService.patch(urls.cities.enableCity(cityId)),
    deleteCity: (cityId: string): IRes<void> => axiosService.delete(urls.cities.deleteCity(cityId)),
}

export {
    cityService
}