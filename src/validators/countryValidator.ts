import Joi from "joi";

import {ICountry} from "../interfaces";

const countryValidator = Joi.object<ICountry>({
    name: Joi.string().min(2).max(20).required().messages({
        'string.empty': 'country name cannot be empty',
        'string.min': 'country name should have minimum length of {#limit}',
        'string.max': 'country name should have maximum length of {#limit}',
        'any.required': 'country name is required field'
    })
})

export {
    countryValidator
}