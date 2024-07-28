import Joi from "joi";

import {SignInRequest} from "../interfaces";

const signInValidator = Joi.object<SignInRequest>({
    username: Joi.string().required().messages({
        'string.empty': 'username cannot be empty',
        'any.required': 'username is required field'
    }),
    password: Joi.string().required().messages({
        'string.empty': 'password cannot be empty',
        'any.required': 'password is required field'
    })
})

export {
    signInValidator
}