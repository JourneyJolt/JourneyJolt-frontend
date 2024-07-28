import {IRes} from "../types";
import {IRoom} from "../interfaces";
import {axiosService} from "./axiosService";
import {urls} from "../constants";

const roomService = {
    getAll: (): IRes<IRoom[]> => axiosService.get(urls.rooms.allRooms),
    getAllEnabled: (): IRes<IRoom[]> => axiosService.get(urls.rooms.allEnabledRooms),
    getByHotelId: (hotelId: string): IRes<IRoom[]> => axiosService.get(urls.rooms.roomsByHotelId(hotelId)),
    getEnabledByHotelId: (hotelId: string): IRes<IRoom[]> => axiosService.get(urls.rooms.enabledRoomsByHotelId(hotelId)),
    getById: (roomId: string): IRes<IRoom> => axiosService.get(urls.rooms.byId(roomId)),
    getAllAvailableForPeriod:
        (hotelId: string, bookedSince: string, bookedTo: string, capacity: string): IRes<IRoom[]> =>
            axiosService.get(urls.rooms.allAvailableForPeriod(hotelId), {
                params: {
                    bookedSince,
                    bookedTo,
                    capacity
                }
            }),
    create: (room: IRoom): IRes<IRoom> => axiosService.post(urls.rooms.create, room),
    update: (roomId: string, room: IRoom): IRes<IRoom> => axiosService.patch(urls.rooms.update(roomId), room),
    disableRoom: (roomId: string): IRes<void> => axiosService.patch(urls.rooms.disableRoom(roomId)),
    enableRoom: (roomId: string): IRes<void> => axiosService.patch(urls.rooms.enableRoom(roomId)),
    deleteRoom: (roomId: string): IRes<void> => axiosService.delete(urls.rooms.deleteRoom(roomId))
}

export {
    roomService
}