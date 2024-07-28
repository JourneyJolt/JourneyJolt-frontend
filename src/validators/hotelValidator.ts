import Joi from "joi";

import {IHotel} from "../interfaces";

const hotelValidator = Joi.object<IHotel>({
    name: Joi.string().min(3).max(35).required().messages({
        'string.empty': 'hotel name cannot be empty',
        'string.min': 'hotel name should have minimum length of {#limit}',
        'string.max': 'hotel name should have maximum length of {#limit}',
        'any.required': 'hotel name is required field'
    }),
    countryId: Joi.string().hex().length(24).required().messages({
        'string.hex': 'country must be in hex format',
        'string.length': 'country must be 24 characters long',
        'any.required': 'country is required field'
    }),
    cityId: Joi.string().hex().length(24).required().messages({
        'string.hex': 'city must be in hex format',
        'string.length': 'city must be 24 characters long',
        'any.required': 'city is required field'
    })
});

export {
    hotelValidator
}