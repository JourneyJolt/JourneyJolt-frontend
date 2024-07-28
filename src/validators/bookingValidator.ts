import Joi from "joi";

import {IBooking} from "../interfaces";

const JoiDate = Joi.extend(require('@joi/date'));
const bookingValidator = Joi.object<IBooking>({
    bookedSince: JoiDate.date().greater(Date.now() - 24 * 60 * 60 * 1000).utc().required()
        .messages({
            'date.format': 'booked since date must be in YYYY-MM-DD format',
            'date.greater': 'booked since date must be equal to or greater than today date',
            'any.required': 'booked since date is a required field'
        }),
    bookedTo: JoiDate.date().greater(Joi.ref('bookedSince')).utc().required()
        .messages({
            'date.format': 'booked to date must be in YYYY-MM-DD format',
            'date.greater': 'booked to date must be greater than booked since date',
            'any.required': 'booked to date is a required field'
        }),

    capacity: Joi.number().allow( null, "").optional().integer().min(1).max(10).messages({
        'number.integer': 'capacity must be integer',
        'number.min': 'capacity must be equal to or greater than {#limit}',
        'number.max': 'capacity must be less than or equal to {#limit}'
    })
})

export {
    bookingValidator
}