//Validation
const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
                .min(2)
                .required(),
        email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required(),
        password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .required()
                .min(6),
    });

    return schema.validate(data);
}

//Register Validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required(),
        password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .required()
                .min(6),
    });

    return schema.validate(data);
}


module.exports = {
    registerValidation,
    loginValidation
}