import {IRes} from "../types";
import {IHotel, IMessage} from "../interfaces";
import {axiosService} from "./axiosService";
import {urls} from "../constants";

const hotelService = {
    getAll: (): IRes<IHotel[]> => axiosService.get(urls.hotels.allHotels),
    getAllEnabled: (): IRes<IHotel[]> => axiosService.get(urls.hotels.allEnabledHotels),
    getByCountryId: (countryId: string): IRes<IHotel[]> => axiosService.get(urls.hotels.hotelsByCountryId(countryId)),
    getEnabledByCountryId: (countryId: string): IRes<IHotel[]> =>
        axiosService.get(urls.hotels.enabledHotelsByCountryId(countryId)),
    getByCityId: (cityId: string): IRes<IHotel[]> => axiosService.get(urls.hotels.hotelsByCityId(cityId)),
    getEnabledByCityId: (cityId: string): IRes<IHotel[]> => axiosService.get(urls.hotels.enabledHotelsByCityId(cityId)),
    getById: (hotelId: string): IRes<IHotel> => axiosService.get(urls.hotels.byId(hotelId)),
    create: (hotel: IHotel): IRes<IHotel> => axiosService.post(urls.hotels.create, hotel),
    update: (hotelId: string, hotel: IHotel): IRes<IHotel> => axiosService.patch(urls.hotels.update(hotelId), hotel),
    disableHotel: (hotelId: string): IRes<void> => axiosService.patch(urls.hotels.disableHotel(hotelId)),
    enableHotel: (hotelId: string): IRes<void> => axiosService.patch(urls.hotels.enableHotel(hotelId)),
    deleteHotel: (hotelId: string): IRes<void> => axiosService.delete(urls.hotels.deleteHotel(hotelId)),
    addPhotos: (hotelId: string, photos: FormData): IRes<IMessage> => axiosService.post(
        urls.hotels.addPhotos(hotelId), photos, {headers: {'Content-Type': 'multipart/form-data'}}),
    deletePhoto: (hotelId: string, photoId: string): IRes<void> => axiosService.delete(
        urls.hotels.deletePhoto(hotelId), {params: {photoId}}),
    getHotelsWithAvailableRooms:
        (countryId: string, cityId: string, bookedSince: string, bookedTo: string, capacity: string): IRes<IHotel[]> =>
            axiosService.get(urls.search.hotelsWithAvailableRooms, {
                params: {
                    countryId,
                    cityId,
                    bookedSince,
                    bookedTo,
                    capacity
                }
            })
}

export {
    hotelService
}