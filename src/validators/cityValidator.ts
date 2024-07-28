import Joi from "joi";

import {ICity} from "../interfaces";

const cityValidator = Joi.object<ICity>({
    name: Joi.string().min(3).max(20).required().messages({
        'string.empty': 'city name cannot be empty',
        'string.min': 'city name should have minimum length of {#limit}',
        'string.max': 'city name should have maximum length of {#limit}',
        'any.required': 'city name is required field'
    }),
    countryId: Joi.string().hex().length(24).required().messages({
        'string.hex': 'country must be in hex format',
        'string.length': 'country must be 24 characters long',
        'any.required': 'country is required field'
    })
});

export {
    cityValidator
}