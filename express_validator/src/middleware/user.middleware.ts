import { checkSchema } from "express-validator";
import { validate } from "../utils/validate";

export const registerValidator = validate(checkSchema({
    email: {
        errorMessage: "invalid email address",
        isEmail: true,
    },
    password: {
        isStrongPassword: {
            options: {
                minLength: 6,
            }
        },
        isString: true,
        notEmpty: true
    },
    confirm_password: {
        isStrongPassword: {
            options: {
                minLength: 6,
            }
        },
        isString: true,
        notEmpty: true,
        custom: {
            options: (value, {req}) => {
                if(value !== req.body.password) {
                    throw new Error(`pw and cf pw not match`)
                }
                return true
            }
        }
    }
}))