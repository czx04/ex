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
        }
    }
}))
