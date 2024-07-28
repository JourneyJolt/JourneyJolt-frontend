import Joi from "joi";

import {SignUpRequest} from "../interfaces";

const signUpValidator = Joi.object<SignUpRequest>({
    username: Joi.string().min(3).max(20).required().messages({
        'string.empty': 'username cannot be empty',
        'string.min': 'username should have minimum length of {#limit}',
        'string.max': 'username should have maximum length of {#limit}',
        'any.required': 'username is required field'
    }),
    email: Joi.string().min(1).max(50).required().email({tlds: {allow: false}}).messages({
        'string.empty': 'email cannot be empty',
        'string.min': 'email should have minimum length of {#limit}',
        'string.max': 'email should have maximum length of {#limit}',
        'any.required': 'email is required field',
        'string.email': 'not valid email'
    }),
    password: Joi.string().min(6).max(20).required().messages({
        'string.empty': 'password cannot be empty',
        'string.min': 'password should have minimum length of {#limit}',
        'string.max': 'password should have maximum length of {#limit}',
        'any.required': 'password is required field'
    }),
    re_password: Joi.any().equal(Joi.ref('password')).required().messages({
        'any.only': 'password doesn\'t match'
    })
})

export {
    signUpValidator
}