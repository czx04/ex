import { registerValidator } from "./middleware/user.middleware"
import { Request,Response } from "express"
const express = require('express')
const { query, validationResult, matchedData } = require('express-validator')
const app = express()

app.use(express.json())

app.post('/users/register',registerValidator,(req: Request,res: Response) => {
    res.status(200).send({ message: 'Registration successful'})
})

app.listen(3000,() => {
    console.log('app listening on port 3000')
})
