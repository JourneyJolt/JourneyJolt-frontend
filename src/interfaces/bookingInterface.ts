import {EBookingState} from "../enums";

export interface IBooking {
    id: string,
    bookedSince: Date,
    bookedTo: Date,
    price: number,
    roomId: string,
    userId: string,
    state: EBookingState

    capacity?: string
}